import { MongoClient } from 'mongodb';

if (!process.env.MONGO_CONNECTION) {
    throw new Error('Please define the MONGO_CONNECTION environment variable inside .env');
}

const uri = process.env.MONGO_CONNECTION;
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;