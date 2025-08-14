import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
    try {
        const { id } = params;
        const client = await clientPromise;
        const db = client.db();
        
        const project = await db.collection('projects').findOne({ _id: new ObjectId(id) });
        if (!project) {
            return NextResponse.json({ message: 'Projet non trouvé' }, { status: 404 });
        }
        
        return NextResponse.json(project);
    } catch (error) {
        console.error('GET project error:', error);
        return NextResponse.json({ message: 'Erreur lors de la récupération du projet' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        console.log('Updating project with ID:', id);
        
        const updateData = await request.json();
        console.log('Update data:', updateData);
        
        if (!updateData.title) {
            return NextResponse.json({ message: 'Le titre est requis' }, { status: 400 });
        }
        
        // Validate ObjectId
        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'ID de projet invalide' }, { status: 400 });
        }
        
        const client = await clientPromise;
        const db = client.db();
        
        // Remove _id field from update data to prevent immutable field error
        const { _id, ...cleanUpdateData } = updateData;
        
        const updatedProject = {
            ...cleanUpdateData,
            updatedAt: new Date()
        };
        
        console.log('Clean update data:', updatedProject);
        console.log('Attempting to update project...');
        
        const result = await db.collection('projects').updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedProject }
        );
        
        console.log('Update result:', result);
        
        if (result.matchedCount === 0) {
            return NextResponse.json({ message: 'Projet non trouvé' }, { status: 404 });
        }
        
        const updated = await db.collection('projects').findOne({ _id: new ObjectId(id) });
        return NextResponse.json(updated);
    } catch (error) {
        console.error('PUT project error:', error);
        return NextResponse.json({ 
            message: 'Erreur lors de la mise à jour du projet',
            error: error.message 
        }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        const client = await clientPromise;
        const db = client.db();
        
        const result = await db.collection('projects').deleteOne({ _id: new ObjectId(id) });
        
        if (result.deletedCount === 0) {
            return NextResponse.json({ message: 'Projet non trouvé' }, { status: 404 });
        }
        
        return NextResponse.json({ message: 'Projet supprimé avec succès' });
    } catch (error) {
        console.error('DELETE project error:', error);
        return NextResponse.json({ message: 'Erreur lors de la suppression du projet' }, { status: 500 });
    }
} 