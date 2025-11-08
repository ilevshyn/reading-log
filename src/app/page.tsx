"use client";
import { useEffect, useState } from "react";
import getBooks from "@/app/getBooks";
import { Item, ItemContent, ItemGroup, ItemTitle } from "@/components/ui/item";
import { bookDataDb, bookDataDbArray } from "@/types/bookDataDb";

export default function Home() {
  const [books, setBooks] = useState<bookDataDbArray>([]);
  useEffect(() => {
    async function fetchBooks() {
      const res = await getBooks();
      setBooks(res);
    }
    fetchBooks();
  }, []);
  return (
    <div>
      <ItemGroup className={"flex flex-row justify-evenly"}>
        {books.map((book: bookDataDb) => (
          <Item key={book._id} variant={"outline"}>
            <ItemContent>
              <ItemTitle>{book.bookTitle}</ItemTitle>
              <ItemContent>{book.bookAuthor}</ItemContent>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}
