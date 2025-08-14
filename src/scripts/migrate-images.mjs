import { config } from 'dotenv';
import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import { uploadImage, configureCloudinary } from '../lib/cloudinary.js';

// Load environment variables from .env file
config();

const migrateImages = async () => {
    try {
        console.log('Starting image migration to Cloudinary...');
        
        // Configure Cloudinary after environment variables are loaded
        configureCloudinary();
        
        // Import MongoDB after environment variables are loaded
        const clientPromise = (await import('../lib/mongodb.js')).default;
        const client = await clientPromise;
        const db = client.db();
        
        // Get all local images from uploads directory
        const uploadsDir = join(process.cwd(), 'public', 'uploads');
        let files;
        try {
            files = await readdir(uploadsDir);
        } catch (error) {
            console.log('No uploads directory found or no local images to migrate.');
            return;
        }
        
        const imageFiles = files.filter(file => file !== '.gitkeep' && file.match(/\.(jpg|jpeg|png|gif|webp)$/i));
        
        if (imageFiles.length === 0) {
            console.log('No image files found to migrate.');
            return;
        }
        
        console.log(`Found ${imageFiles.length} images to migrate.`);
        
        // Create a mapping of old URLs to new Cloudinary URLs
        const urlMapping = {};
        
        // Upload each image to Cloudinary
        for (const filename of imageFiles) {
            try {
                console.log(`Migrating ${filename}...`);
                
                const filePath = join(uploadsDir, filename);
                const fileBuffer = await readFile(filePath);
                
                // Upload to Cloudinary
                const uploadResult = await uploadImage(fileBuffer, {
                    public_id: `pauline-tacik/${filename.replace(/\.[^/.]+$/, '')}`
                });
                
                // Store the mapping
                const oldUrl = `/uploads/${filename}`;
                urlMapping[oldUrl] = uploadResult.url;
                
                console.log(`✓ Migrated ${filename} -> ${uploadResult.url}`);
                
            } catch (error) {
                console.error(`✗ Failed to migrate ${filename}:`, error.message);
            }
        }
        
        // Update database references
        console.log('\nUpdating database references...');
        
        // Update projects
        const projects = await db.collection('projects').find({}).toArray();
        let projectsUpdated = 0;
        
        for (const project of projects) {
            let needsUpdate = false;
            const updates = {};
            
            // Check thumbnail
            if (project.thumbnail && urlMapping[project.thumbnail]) {
                updates.thumbnail = urlMapping[project.thumbnail];
                needsUpdate = true;
            }
            
            // Check images array
            if (Array.isArray(project.images) && project.images.length > 0) {
                const updatedImages = project.images.map(img => urlMapping[img] || img);
                if (JSON.stringify(updatedImages) !== JSON.stringify(project.images)) {
                    updates.images = updatedImages;
                    needsUpdate = true;
                }
            }
            
            if (needsUpdate) {
                await db.collection('projects').updateOne(
                    { _id: project._id },
                    { $set: updates }
                );
                projectsUpdated++;
                console.log(`✓ Updated project: ${project.title || project._id}`);
            }
        }
        
        // Update workshops
        const workshops = await db.collection('workshops').find({}).toArray();
        let workshopsUpdated = 0;
        
        for (const workshop of workshops) {
            let needsUpdate = false;
            const updates = {};
            
            // Check thumbnail
            if (workshop.thumbnail && urlMapping[workshop.thumbnail]) {
                updates.thumbnail = urlMapping[workshop.thumbnail];
                needsUpdate = true;
            }
            
            // Check images array
            if (Array.isArray(workshop.images) && workshop.images.length > 0) {
                const updatedImages = workshop.images.map(img => urlMapping[img] || img);
                if (JSON.stringify(updatedImages) !== JSON.stringify(workshop.images)) {
                    updates.images = updatedImages;
                    needsUpdate = true;
                }
            }
            
            if (needsUpdate) {
                await db.collection('workshops').updateOne(
                    { _id: workshop._id },
                    { $set: updates }
                );
                workshopsUpdated++;
                console.log(`✓ Updated workshop: ${workshop.name || workshop._id}`);
            }
        }
        
        console.log(`\nMigration completed!`);
        
        // Save the mapping for reference
        const fs = await import('fs/promises');
        await fs.writeFile(
            join(process.cwd(), 'migration-mapping.json'),
            JSON.stringify(urlMapping, null, 2)
        );
        console.log('\nMigration mapping saved to migration-mapping.json');
        
    } catch (error) {
        console.error('Migration failed:', error);
    }
};

// Run migration if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    migrateImages();
}

export default migrateImages;