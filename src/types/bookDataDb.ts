import { ObjectId } from "bson";

export type bookDataDb = {
  _id: string;
  bookTitle: string;
  bookAuthor: string;
  amountOfPages: number;
  currentlyReadPages: number;
};

export type bookDataDbRaw = {
  _id: ObjectId;
  bookTitle: string;
  bookAuthor: string;
  amountOfPages: number;
  currentlyReadPages: number;
};

export type bookDataDbArray = bookDataDb[];
