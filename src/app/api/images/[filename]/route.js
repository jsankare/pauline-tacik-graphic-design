import { NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import { join } from 'path';
import clientPromise from '@/lib/mongodb';

export async function DELETE(request, { params }) {
    try {
        const { filename } = params;
        
        if (!filename) {
            return NextResponse.json({ message: 'Nom de fichier requis' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db();
        
        const imageUrl = `/uploads/${filename}`;
        
        // Check if image is currently used
        const isUsedInProjects = await db.collection('projects').countDocuments({
            $or: [
                { thumbnail: imageUrl },
                { images: imageUrl }
            ]
        });
        
        const isUsedInWorkshops = await db.collection('workshops').countDocuments({
            $or: [
                { thumbnail: imageUrl },
                { images: imageUrl }
            ]
        });
        
        if (isUsedInProjects > 0 || isUsedInWorkshops > 0) {
            return NextResponse.json({ 
                message: 'Cette image est actuellement utilisée et ne peut pas être supprimée',
                isUsed: true,
                usageCount: isUsedInProjects + isUsedInWorkshops
            }, { status: 400 });
        }
        
        // Delete the file
        const filePath = join(process.cwd(), 'public', 'uploads', filename);
        
        try {
            await unlink(filePath);
            console.log(`Deleted unused image: ${filename}`);
            
            return NextResponse.json({ 
                message: 'Image supprimée avec succès',
                filename
            });
        } catch (error) {
            if (error.code === 'ENOENT') {
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