"use server";
import getBooks from "@/app/getBooks";
import { Item, ItemContent, ItemGroup, ItemTitle } from "@/components/ui/item";
import { bookDataDb } from "@/types/bookDataDb";

export default async function Home() {
  const books = await getBooks("currently-reading");
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
