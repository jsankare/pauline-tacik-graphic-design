import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(request, context) {
    try {
        const { id } = await context.params;
        const { name, color } = await request.json();
        if (!name) return NextResponse.json({ message: 'Le nom est requis' }, { status: 400 });
        const client = await clientPromise;
        const db = client.db();
        const result = await db.collection('categories').updateOne(
            { _id: new ObjectId(id) },
            { $set: { name, color: color || null } }
        );
        if (result.matchedCount === 0) return NextResponse.json({ message: 'Catégorie non trouvée' }, { status: 404 });
        const updated = await db.collection('categories').findOne({ _id: new ObjectId(id) });
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ message: 'Erreur lors de la modification de la catégorie' }, { status: 500 });
    }
}

export async function DELETE(request, context) {
    try {
        const { id } = await context.params;
        const client = await clientPromise;
        const db = client.db();
        const result = await db.collection('categories').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) return NextResponse.json({ message: 'Catégorie non trouvée' }, { status: 404 });
        return NextResponse.json({ message: 'Catégorie supprimée' });
    } catch (error) {
        return NextResponse.json({ message: 'Erreur lors de la suppression de la catégorie' }, { status: 500 });
    }
}