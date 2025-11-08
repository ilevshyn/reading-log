"use server";

import { getMongoClient } from "@/lib/mongodbConnection";
import { bookData } from "@/types/bookData";

export default async function handleAddBook(bookData: bookData) {
  const booksDb = (await getMongoClient())
    .db("reading-log-app")
    .collection("books");
  await booksDb.insertOne(bookData);
}
