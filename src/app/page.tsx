"use client";
import { useEffect, useState } from "react";
import getBooks from "@/app/getBooks";
import Book from "@/app/components/Book";

export default function Home() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    async function fetchBooks() {
      const res = await getBooks();
      setBooks(res);
    }
    fetchBooks();
  }, []);
  return (
    <div className={"text-center text-2xl"}>
      <p>My Reading Log App!</p>
      {books.map((book) => (
        <Book
          key={book._id}
          bookTitle={book.bookTitle}
          bookAuthor={book.bookAuthor}
        ></Book>
      ))}
      <p>I am currently reading...</p>
    </div>
  );
}
