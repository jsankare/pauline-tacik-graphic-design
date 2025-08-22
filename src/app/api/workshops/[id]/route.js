import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
    try {
        const { id } = params;
        const client = await clientPromise;
        const db = client.db();
        
        const workshop = await db.collection('workshops').findOne({ _id: new ObjectId(id) });
        if (!workshop) {
            return NextResponse.json({ message: 'Workshop non trouvé' }, { status: 404 });
        }
        
        return NextResponse.json(workshop);
    } catch (error) {
        console.error('GET workshop error:', error);
        return NextResponse.json({ message: 'Erreur lors de la récupération du workshop' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const updateData = await request.json();
        
        if (!updateData.name) {
            return NextResponse.json({ message: 'Le nom est requis' }, { status: 400 });
        }
        
        // Validate ObjectId
        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'ID de workshop invalide' }, { status: 400 });
        }
        
        const client = await clientPromise;
        const db = client.db();
        
        // Remove _id field from update data to prevent immutable field error
        const { _id, ...cleanUpdateData } = updateData;
        
        const updatedWorkshop = {
            ...cleanUpdateData,
            updatedAt: new Date()
        };
        
        const result = await db.collection('workshops').updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedWorkshop }
        );
        
        if (result.matchedCount === 0) {
            return NextResponse.json({ message: 'Workshop non trouvé' }, { status: 404 });
        }
        
        const updated = await db.collection('workshops').findOne({ _id: new ObjectId(id) });
        return NextResponse.json(updated);
    } catch (error) {
        console.error('PUT workshop error:', error);
        return NextResponse.json({ 
            message: 'Erreur lors de la mise à jour du workshop',
            error: error.message 
        }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        const client = await clientPromise;
        const db = client.db();
        
        const result = await db.collection('workshops').deleteOne({ _id: new ObjectId(id) });
        
        if (result.deletedCount === 0) {
            return NextResponse.json({ message: 'Workshop non trouvé' }, { status: 404 });
        }
        
        return NextResponse.json({ message: 'Workshop supprimé avec succès' });
    } catch (error) {
        console.error('DELETE workshop error:', error);
        return NextResponse.json({ message: 'Erreur lors de la suppression du workshop' }, { status: 500 });
    }
}