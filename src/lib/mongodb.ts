import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("Missing env variable MONGODB_URI");
}

const client = new MongoClient(uri);
client.connect();

export default client;
