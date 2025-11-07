"use server";
import { MongoClient } from "mongodb";

export default async function getBooks() {
  const dbURL = process.env.DATABASE_URL;
  const client = new MongoClient(dbURL);
  try {
    const database = client.db("reading-log-app");
    const books = database.collection("books");
    const result = await books.find({}).toArray();
    const simpleResult = result.map((book) => ({
      ...book,
      _id: book._id.toString(),
    }));
    return simpleResult;
  } finally {
    await client.close();
  }
}
