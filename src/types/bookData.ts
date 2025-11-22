export type bookData = {
  bookTitle: string;
  bookAuthor: string;
  list: string;
  amountOfPages: number;
  currentlyReadPages: number;
};

export type bookDataFromApi = {
  author_name: string;
  key: string;
  title: string;
};
