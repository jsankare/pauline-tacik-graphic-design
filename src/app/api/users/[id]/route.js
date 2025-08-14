import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

export async function GET(request, { params }) {
    try {
        const { id } = params;
        const client = await clientPromise;
        const db = client.db();
        
        const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
        if (!user) {
            return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 404 });
        }
        
        // Remove password from response
        const { password, ...safeUser } = user;
        return NextResponse.json(safeUser);
    } catch (error) {
        console.error('GET user error:', error);
        return NextResponse.json({ message: 'Erreur lors de la récupération de l\'utilisateur' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        console.log('Updating user with ID:', id);
        
        const updateData = await request.json();
        console.log('Update data:', updateData);
        
        if (!updateData.username || !updateData.role) {
            return NextResponse.json({ message: 'Le nom d\'utilisateur et le rôle sont requis' }, { status: 400 });
        }
        
        // Validate ObjectId
        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'ID d\'utilisateur invalide' }, { status: 400 });
        }
        
        const client = await clientPromise;
        const db = client.db();
        
        // Check if username already exists for another user
        const existingUser = await db.collection('users').findOne({ 
            username: updateData.username, 
            _id: { $ne: new ObjectId(id) } 
        });
        if (existingUser) {
            return NextResponse.json({ message: 'Un utilisateur avec ce nom existe déjà' }, { status: 400 });
        }
        
        // Remove _id field from update data to prevent immutable field error
        const { _id, ...cleanUpdateData } = updateData;
        
        const updatedUser = {
            ...cleanUpdateData,
            updatedAt: new Date()
        };
        
        // Hash password if provided
        if (updatedUser.password) {
            updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
        }
        
        console.log('Clean update data:', updatedUser);
        console.log('Attempting to update user...');
        
        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedUser }
        );
        
        console.log('Update result:', result);
        
        if (result.matchedCount === 0) {
            return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 404 });
        }
        
        const updated = await db.collection('users').findOne({ _id: new ObjectId(id) });
        const { password, ...safeUser } = updated;
        return NextResponse.json(safeUser);
    } catch (error) {
        console.error('PUT user error:', error);
        return NextResponse.json({ 
            message: 'Erreur lors de la mise à jour de l\'utilisateur',
            error: error.message 
        }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        const client = await clientPromise;
        const db = client.db();
        
        const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });
        
        if (result.deletedCount === 0) {
            return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 404 });
        }
        
        return NextResponse.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error('DELETE user error:', error);
        return NextResponse.json({ message: 'Erreur lors de la suppression de l\'utilisateur' }, { status: 500 });
    }
} 