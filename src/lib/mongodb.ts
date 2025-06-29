import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("Missing env variable MONGODB_URI");
}

const client = new MongoClient(uri);
client.connect().then(() => console.log("MONGO CONNECTED")).catch((err) => console.error("MONGO ERR", err));

const db = client.db("god-tracker");

export default db;
