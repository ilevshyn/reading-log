"use client";

import { Controller, useForm } from "react-hook-form";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import handleAddBook from "@/app/add/handleAddBook";
import { redirect } from "next/navigation";
import { bookData, bookDataFromApi } from "@/types/bookData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from "@/components/ui/command";
import { match } from "assert";
import { CommandItem, CommandList } from "cmdk";
import { title } from "process";

export default function AddBookPage() {
  const API_URL = "https://openlibrary.org/search.json";
  const API_SEARCH_URL = "https://openlibrary.org/search.json?q=";
  const { register, handleSubmit, control, setValue, watch } =
    useForm<bookData>();
  const [titleSearch, setTitleSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [matchedBooks, setMatchedBooks] = useState<bookDataFromApi[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState<string>("Currently Reading");

  const bookTitle = watch("bookTitle");
  const bookAuthor = watch("bookAuthor");

  type ApiResponse = {
    author_name: string[];
    key: string;
    title: string;
  };

  type ApiResponses = {
    docs: ApiResponse[];
  };

  useEffect(() => {
    if (titleSearch.length >= 3) {
      const timedRequest = setTimeout(() => {
        setDebouncedSearch(titleSearch);
      }, 500);

      return () => {
        clearTimeout(timedRequest);
      };
    }
  }, [titleSearch]);

  useEffect(() => {
    if (debouncedSearch.length >= 3) {
      const fetchBooksFromApi = async () => {
        const fetchedData = await fetch(
          API_SEARCH_URL + debouncedSearch.replaceAll(" ", "+")
        );
        const data: ApiResponses = await fetchedData.json();

        const result: bookDataFromApi[] = data.docs.map((doc) => ({
          author_name: doc.author_name[0],
          key: doc.key,
          title: doc.title,
        }));

        setMatchedBooks(result);
      };

      fetchBooksFromApi();
    }
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role={"combobox"} className="w-xl">
            Pick From Database
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput
              placeholder={"Search Title..."}
              onValueChange={(e) => setTitleSearch(e)}
            ></CommandInput>
            <CommandList>
              <CommandEmpty>No books found!</CommandEmpty>
              <CommandGroup>
                {matchedBooks?.length > 0 &&
                  matchedBooks.map((book) => (
                    <CommandItem
                      key={book["key"] || book["title"]}
                      value={book["title"]}
                      onSelect={() => {
                        setValue("bookAuthor", book["author_name"]);
                        setValue("bookTitle", book["title"]);
                        console.log(book);
                      }}
                    >
                      {book["title"]}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <form
        onSubmit={handleSubmit((data: bookData) => {
          console.log(data);
          handleAddBook(data).then(() => redirect("/"));
        })}
        className="w-xl"
      >
        <FieldLabel htmlFor={"bookTitle"}>Enter the Book Title</FieldLabel>
        <Input
          {...register("bookTitle")}
          id="bookTitle"
          placeholder="Title"
          required
          type="text"
          value={bookTitle}
        />
        <FieldLabel htmlFor={"bookAuthor"}>Enter the Book Author</FieldLabel>
        <Input
          {...register("bookAuthor")}
          id="bookAuthor"
          placeholder="Author"
          required
          type="text"
        />

        <FieldLabel htmlFor={"amountOfPages"}>Amount of Pages</FieldLabel>
        <Input
          {...register("amountOfPages")}
          id="amountOfPages"
          placeholder="Amount of Pages"
          required
          type="number"
        />
        <FieldLabel htmlFor={"currentlyReadPages"}>
          Currently Read Pages
        </FieldLabel>
        <Input
          {...register("currentlyReadPages")}
          id="currentlyReadPages"
          placeholder="Currently Read Pages"
          required
          type="number"
        />
        <br />
        <FieldLabel htmlFor={"addToList"}>Add To List:</FieldLabel>
        <Controller
          name={"list"}
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                switch (value) {
                  case "currently-reading":
                    setSelectedList("Currently Reading");
                    break;
                  case "want-to-read":
                    setSelectedList("Want To Read");
                    break;
                  case "completed":
                    setSelectedList("Completed");
                    break;
                  default:
                    break;
                }
              }}
              value={field.value}
            >
              <SelectTrigger id={"addToList"}>
                <SelectValue placeholder={"Add to list"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"currently-reading"}>
                  Currently Reading
                </SelectItem>
                <SelectItem value={"want-to-read"}>Want To Read</SelectItem>
                <SelectItem value={"completed"}>Completed</SelectItem>
              </SelectContent>
            </Select>
          )}
        ></Controller>
        <br />
        <Button type="submit">Add To {selectedList}</Button>
      </form>
    </div>
  );
}
