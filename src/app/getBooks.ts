"use server";

import { getMongoClient } from "@/lib/mongodbConnection";
import { bookDataDbArray, bookDataDbRaw } from "@/types/bookDataDb";

export default async function getBooks(
  listParam: string,
): Promise<bookDataDbArray> {
  const booksDb = (await getMongoClient())
    .db("reading-log-app")
    .collection("books");
  const result = await booksDb.find({ list: listParam }).toArray();
  return result.map((book) => ({
    ...(book as bookDataDbRaw),
    _id: book._id.toString(),
  }));
}
