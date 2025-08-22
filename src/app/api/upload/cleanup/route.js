import { NextResponse } from 'next/server';
import { listImages, deleteImage, getPublicIdFromUrl } from '@/lib/cloudinary';
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
    try {
        const { imageUrls } = await request.json();
        
        if (!Array.isArray(imageUrls)) {
            return NextResponse.json({ message: 'Liste d\'URLs d\'images requise' }, { status: 400 });
        }

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
        
        // Get all images from Cloudinary
        const cloudinaryImages = await listImages();
        
        let deletedCount = 0;
        const errors = [];
        
        // Check each image from Cloudinary
        for (const image of cloudinaryImages) {
            // If image is not used anywhere, delete it
            if (!usedImages.has(image.url)) {
                try {
                    await deleteImage(image.public_id);
                    deletedCount++;
                } catch (error) {
                    console.error(`Error deleting ${image.filename}:`, error);
                    errors.push(`Failed to delete ${image.filename}: ${error.message}`);
                }
            }
        }
        
        return NextResponse.json({
            message: `Nettoyage terminé. ${deletedCount} image(s) supprimée(s).`,
            deletedCount,
            errors: errors.length > 0 ? errors : undefined
        });
        
    } catch (error) {
        console.error('Cleanup error:', error);
        return NextResponse.json({ 
            message: 'Erreur lors du nettoyage des images' 
        }, { status: 500 });
    }
} 