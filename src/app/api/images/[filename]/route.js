import { NextResponse } from 'next/server';
import { deleteImage, getPublicIdFromUrl } from '@/lib/cloudinary';
import clientPromise from '@/lib/mongodb';

export async function DELETE(request, { params }) {
    try {
        const { filename } = params;
        
        if (!filename) {
            return NextResponse.json({ message: 'Nom de fichier requis' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db();
        
        // First, we need to find the image in our database to get its Cloudinary URL
        // We'll search for images that contain this filename in their URL
        const projects = await db.collection('projects').find({
            $or: [
                { thumbnail: { $regex: filename, $options: 'i' } },
                { images: { $regex: filename, $options: 'i' } }
            ]
        }).toArray();
        
        const workshops = await db.collection('workshops').find({
            $or: [
                { thumbnail: { $regex: filename, $options: 'i' } },
                { images: { $regex: filename, $options: 'i' } }
            ]
        }).toArray();
        
        // Check if image is currently used
        if (projects.length > 0 || workshops.length > 0) {
            return NextResponse.json({ 
                message: 'Cette image est actuellement utilisée et ne peut pas être supprimée',
                isUsed: true,
                usageCount: projects.length + workshops.length
            }, { status: 400 });
        }
        
        // For Cloudinary, we need to construct the public_id from the filename
        // Remove the extension and add the folder prefix
        const publicId = `pauline-tacik/${filename.replace(/\.[^/.]+$/, '')}`;
        
        try {
            await deleteImage(publicId);
            console.log(`Deleted unused image from Cloudinary: ${filename}`);
            
            return NextResponse.json({ 
                message: 'Image supprimée avec succès',
                filename
            });
        } catch (error) {
            if (error.message.includes('not found')) {
                return NextResponse.json({ 
                    message: 'Fichier non trouvé' 
                }, { status: 404 });
            }
            throw error;
        }
        
    } catch (error) {
        console.error('DELETE image error:', error);
        return NextResponse.json({ 
            message: 'Erreur lors de la suppression de l\'image' 
        }, { status: 500 });
    }
} 