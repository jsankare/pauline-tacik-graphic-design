import { NextResponse } from 'next/server';
import { listImages } from '@/lib/cloudinary';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        // Get all images from Cloudinary
        const cloudinaryImages = await listImages();
        
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

        // Build image list with metadata and usage tracking
        const images = cloudinaryImages.map(image => ({
            filename: image.filename,
            url: image.url,
            size: image.size,
            createdAt: new Date(image.createdAt),
            isUsed: usedImages.has(image.url),
            usageCount: 0,
            public_id: image.public_id,
            width: image.width,
            height: image.height,
            format: image.format
        }));

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