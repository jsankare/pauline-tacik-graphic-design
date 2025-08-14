import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db();
        const workshops = await db.collection('workshops').find({}).toArray();
        if (!workshops || workshops.length === 0) {
            return NextResponse.json({ message: 'Aucun workshop trouvé' }, { status: 404 });
        }
        return NextResponse.json(workshops);
    } catch (error) {
        return NextResponse.json({ message: 'Erreur lors de la récupération des workshops' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const workshopData = await request.json();
        if (!workshopData.name) {
            return NextResponse.json({ message: 'Le nom est requis' }, { status: 400 });
        }
        
        const client = await clientPromise;
        const db = client.db();
        
        const newWorkshop = {
            ...workshopData,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        const result = await db.collection('workshops').insertOne(newWorkshop);
        const inserted = await db.collection('workshops').findOne({ _id: result.insertedId });
        return NextResponse.json(inserted);
    } catch (error) {
        return NextResponse.json({ message: 'Erreur lors de la création du workshop' }, { status: 500 });
    }
}