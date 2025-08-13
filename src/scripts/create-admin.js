const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MONGO_CONNECTION = process.env.MONGO_CONNECTION;

if (!MONGO_CONNECTION) {
    console.error('Please define MONGO_CONNECTION in your .env file');
    process.exit(1);
}

async function createAdminUser() {
    const client = new MongoClient(MONGO_CONNECTION);

    try {
        await client.connect();
        const db = client.db();
        const users = db.collection('users');

        // Check if admin already exists
        const existingAdmin = await users.findOne({ username: 'admin' });
        if (existingAdmin) {
            console.log('Admin user already exists');
            return;
        }

        // Create admin user with hashed password
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await users.insertOne({
            username: 'admin',
            password: hashedPassword,
            role: 'admin',
            createdAt: new Date()
        });

        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        await client.close();
    }
}

createAdminUser(); 