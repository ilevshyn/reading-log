"use server";

import { bookDataDb } from "@/types/bookDataDb";
import { Item, ItemContent, ItemGroup, ItemTitle } from "@/components/ui/item";
import getBooks from "@/app/getBooks";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const books = await getBooks((await params).slug);

  return (
    <ItemGroup className={"flex flex-row justify-evenly"}>
      {books.length === 0 ? (
        <Item>No Books Found!</Item>
      ) : (
        books.map((book: bookDataDb) => (
          <Item key={book._id} variant={"outline"}>
            <ItemContent>
              <ItemTitle>{book.bookTitle}</ItemTitle>
              <ItemContent>
                Author: {book.bookAuthor}, Pages: {book.amountOfPages},
                Currently Read Pages: {book.currentlyReadPages}, Reading
                Progress:{" "}
                {book.amountOfPages == 0
                  ? Math.trunc(book.currentlyReadPages / book.amountOfPages)
                  : 0}
                %
              </ItemContent>
            </ItemContent>
          </Item>
        ))
      )}
    </ItemGroup>
  );
}
