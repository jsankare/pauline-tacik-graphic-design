import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

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
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json({ message: 'Le fichier est trop volumineux (max 5MB)' }, { status: 400 });
        }

        // Create uploads directory if it doesn't exist
        const uploadsDir = join(process.cwd(), 'public', 'uploads');
        try {
            await mkdir(uploadsDir, { recursive: true });
        } catch (error) {
            // Directory might already exist
        }

        // Generate unique filename
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const extension = file.name.split('.').pop();
        const filename = `${timestamp}-${randomString}.${extension}`;
        
        // Save file
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filepath = join(uploadsDir, filename);
        
        await writeFile(filepath, buffer);
        
        // Return the public URL
        const publicUrl = `/uploads/${filename}`;
        
        return NextResponse.json({ 
            message: 'Fichier uploadé avec succès',
            filename,
            url: publicUrl
        });
        
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ 
            message: 'Erreur lors de l\'upload du fichier' 
        }, { status: 500 });
    }
} 