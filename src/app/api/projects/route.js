import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db();
        const projects = await db.collection('projects').find({}).toArray();
        if (!projects || projects.length === 0) {
            return NextResponse.json({ message: 'Aucun projet trouvé' }, { status: 404 });
        }
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ message: 'Erreur lors de la récupération des projets' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const projectData = await request.json();
        if (!projectData.title) {
            return NextResponse.json({ message: 'Le titre est requis' }, { status: 400 });
        }
        
        const client = await clientPromise;
        const db = client.db();
        
        const newProject = {
            ...projectData,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        const result = await db.collection('projects').insertOne(newProject);
        const inserted = await db.collection('projects').findOne({ _id: result.insertedId });
        return NextResponse.json(inserted);
    } catch (error) {
        return NextResponse.json({ message: 'Erreur lors de la création du projet' }, { status: 500 });
    }
} 