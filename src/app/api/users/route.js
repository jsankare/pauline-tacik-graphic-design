import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db();
        const users = await db.collection('users').find({}).toArray();
        if (!users || users.length === 0) {
            return NextResponse.json({ message: 'Aucun utilisateur trouvé' }, { status: 404 });
        }
        
        // Remove password from response for security
        const safeUsers = users.map(user => {
            const { password, ...safeUser } = user;
            return safeUser;
        });
        
        return NextResponse.json(safeUsers);
    } catch (error) {
        return NextResponse.json({ message: 'Erreur lors de la récupération des utilisateurs' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { username, password, role } = await request.json();
        
        if (!username || !password || !role) {
            return NextResponse.json({ message: 'Tous les champs sont requis' }, { status: 400 });
        }
        
        const client = await clientPromise;
        const db = client.db();
        
        // Check if user already exists
        const existingUser = await db.collection('users').findOne({ username });
        if (existingUser) {
            return NextResponse.json({ message: 'Un utilisateur avec ce nom existe déjà' }, { status: 400 });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = {
            username,
            password: hashedPassword,
            role,
            createdAt: new Date()
        };
        
        const result = await db.collection('users').insertOne(newUser);
        const inserted = await db.collection('users').findOne({ _id: result.insertedId });
        
        // Remove password from response
        const { password: _, ...safeUser } = inserted;
        return NextResponse.json(safeUser);
    } catch (error) {
        return NextResponse.json({ message: 'Erreur lors de la création de l\'utilisateur' }, { status: 500 });
    }
} 