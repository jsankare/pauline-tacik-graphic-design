import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db();
        const workshops = await db.collection('workshops').find({}).toArray();
        if (!workshops || workshops.length === 0) {
            return NextResponse.json({ message: 'Aucun projet trouvé' }, { status: 404 });
        }
        // workshops.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return NextResponse.json(workshops);
    } catch (error) {
        return NextResponse.json({ message: 'Erreur lors de la récupération des workshops' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { name, color } = await request.json();
        if (!name) return NextResponse.json({ message: 'Le nom est requis' }, { status: 400 });
        const client = await clientPromise;
        const db = client.db();
        const result = await db.collection('categories').insertOne({ name, color: color || null, createdAt: new Date() });
        const inserted = await db.collection('categories').findOne({ _id: result.insertedId });
        return NextResponse.json(inserted);
    } catch (error) {
        return NextResponse.json({ message: 'Erreur lors de la création de la catégorie' }, { status: 500 });
    }
}