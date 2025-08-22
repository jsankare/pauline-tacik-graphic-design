import { NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        
        if (!file) {
            return NextResponse.json({ message: 'Aucun fichier fourni' }, { status: 400 });
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ message: 'Seuls les fichiers image sont autorisés' }, { status: 400 });
        }

        // Validate file size (max 5MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            return NextResponse.json({ message: 'Le fichier est trop volumineux (max 10MB)' }, { status: 400 });
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Generate unique filename for Cloudinary
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const extension = file.name.split('.').pop();
        const filename = `${timestamp}-${randomString}.${extension}`;
        
        // Upload to Cloudinary
        const uploadResult = await uploadImage(buffer, {
            public_id: `pauline-tacik/${filename.replace(/\.[^/.]+$/, '')}` // Remove extension for public_id
        });
        
        // Return the same format as before for compatibility
        return NextResponse.json({ 
            message: 'Fichier uploadé avec succès',
            filename,
            url: uploadResult.url
        });
        
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ 
            message: 'Erreur lors de l\'upload du fichier' 
        }, { status: 500 });
    }
} 