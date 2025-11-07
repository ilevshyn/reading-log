import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Book(props): React.ReactElement {
  return (
    <Card className={"w-46"}>
      <CardHeader>
        <CardTitle>{props.bookTitle}</CardTitle>
        <CardDescription>{props.bookAuthor}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  );
}
