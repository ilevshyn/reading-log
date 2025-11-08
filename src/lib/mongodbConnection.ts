"use server";

import { MongoClient } from "mongodb";

const mongodbUri = process.env.DATABASE_URL;
if (!mongodbUri) {
  throw new Error("MongoDB URL doesn't exist");
}
if (!global._mongoClientPromise) {
  const mongoClient = new MongoClient(mongodbUri);
  global._mongoClientPromise = mongoClient.connect();
}
const mongoClientPromise = global._mongoClientPromise;

export async function getMongoClient() {
  return mongoClientPromise;
}
