"use server";

import { MongoClient } from "mongodb";

export default async function handleAddBook(data): Promise<void> {
  console.log(data);

  let connectedToDatabase: boolean = false;

  if (!connectedToDatabase) {
    console.log("Connecting to Database...");
    const dbURL: string = process.env.DATABASE_URL;
    const client = new MongoClient(dbURL);
    connectedToDatabase = true;
    try {
      const database = client.db("reading-log-app");
      const books = database.collection("books");
      await books.insertOne(data);
    } finally {
      await client.close();
    }
  }
}
