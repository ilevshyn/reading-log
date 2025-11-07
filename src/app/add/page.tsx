"use client";
import { useForm } from "react-hook-form";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import handleAddBook from "@/app/add/handleAddBook";
import { redirect } from "next/navigation";

export default function AddBookPage() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      bookTitle: "",
      bookAuthor: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
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
      <Button type="submit">Add To Currently Reading</Button>
    </form>
  );
}
