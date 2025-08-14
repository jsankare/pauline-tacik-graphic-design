import { NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const uploadsDir = join(process.cwd(), 'public', 'uploads');
        
        // Get all files in uploads directory
        let files;
        try {
            files = await readdir(uploadsDir);
        } catch (error) {
            return NextResponse.json({ message: 'Dossier uploads non trouvé' }, { status: 404 });
        }

        // Filter out .gitkeep and get file stats
        const imageFiles = files.filter(file => file !== '.gitkeep');
        
        // Get database connection to check usage
        const client = await clientPromise;
        const db = client.db();
        
        // Get all images currently used in the database
        const usedImages = new Set();
        
        // Check projects
        const projects = await db.collection('projects').find({}).toArray();
        projects.forEach(project => {
            if (project.thumbnail) usedImages.add(project.thumbnail);
            if (Array.isArray(project.images)) {
                project.images.forEach(img => usedImages.add(img));
            }
        });
        
        // Check workshops
        const workshops = await db.collection('workshops').find({}).toArray();
        workshops.forEach(workshop => {
            if (workshop.thumbnail) usedImages.add(workshop.thumbnail);
            if (Array.isArray(workshop.images)) {
                workshop.images.forEach(img => usedImages.add(img));
            }
        });

        // Build image list with metadata
        const images = [];
        for (const file of imageFiles) {
            try {
                const filePath = join(uploadsDir, file);
                const fileStats = await stat(filePath);
                const fileUrl = `/uploads/${file}`;
                
                images.push({
                    filename: file,
                    url: fileUrl,
                    size: fileStats.size,
                    createdAt: fileStats.birthtime,
                    isUsed: usedImages.has(fileUrl),
                    usageCount: 0
                });
            } catch (error) {
                console.error(`Error processing file ${file}:`, error);
            }
        }

        // Count usage for each image
        for (const image of images) {
            let count = 0;
            
            // Count in projects
            const projectsWithImage = await db.collection('projects').countDocuments({
                $or: [
                    { thumbnail: image.url },
                    { images: image.url }
                ]
            });
            
            // Count in workshops
            const workshopsWithImage = await db.collection('workshops').countDocuments({
                $or: [
                    { thumbnail: image.url },
                    { images: image.url }
                ]
            });
            
            image.usageCount = projectsWithImage + workshopsWithImage;
        }

        // Sort by creation date (newest first)
        images.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return NextResponse.json(images);
        
    } catch (error) {
        console.error('GET images error:', error);
        return NextResponse.json({ 
            message: 'Erreur lors de la récupération des images' 
        }, { status: 500 });
    }
} 