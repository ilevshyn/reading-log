"use client";
import { Controller, useForm } from "react-hook-form";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import handleAddBook from "@/app/add/handleAddBook";
import { redirect } from "next/navigation";
import { bookData } from "@/types/bookData";
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
import { Command, CommandInput } from "@/components/ui/command";

let matchedBooks = [];

export default function AddBookPage() {
  const API_URL = "https://openlibrary.org/search.json";
  const { register, handleSubmit, control } = useForm<bookData>();
  const [titleSearch, setTitleSearch] = useState<string>("");
  useEffect(() => {
    if (titleSearch.length >= 3) {
      setTimeout(() => {
        console.log("Changed!");
      }, 3000);
    }
  }, [titleSearch]);
  console.log(matchedBooks);
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" role={"combobox"} />
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput
              placeholder={"Search Title..."}
              onValueChange={(e) => setTitleSearch(e)}
            ></CommandInput>
          </Command>
        </PopoverContent>
      </Popover>
      <form
        onSubmit={handleSubmit((data: bookData) => {
          console.log(data);
          handleAddBook(data).then(() => redirect("/"));
        })}
      >
        <FieldLabel htmlFor={"bookTitle"}>Enter the Book Title</FieldLabel>
        <Input
          {...register("bookTitle")}
          id="bookTitle"
          placeholder="Title"
          required
          type="text"
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
        <FieldLabel htmlFor={"addToList"}>Add To List:</FieldLabel>
        <Controller
          name={"list"}
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
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
        <Button type="submit">Add To Currently Reading</Button>
      </form>
    </>
  );
}
