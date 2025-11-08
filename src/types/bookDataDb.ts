import { ObjectId } from "bson";

export type bookDataDb = {
  _id: string;
  bookTitle: string;
  bookAuthor: string;
};

export type bookDataDbRaw = {
  _id: ObjectId;
  bookTitle: string;
  bookAuthor: string;
};

export type bookDataDbArray = bookDataDb[];
