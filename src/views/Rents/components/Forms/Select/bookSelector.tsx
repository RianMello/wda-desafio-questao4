import { ErrorMessage, Field } from "formik";
import { useState } from "react";
import { Book, Rent } from "../../../../../interfaces/ResponseAPI";
import { SelectContainer } from "./style";

interface SelectProps {
  rent?: Rent;
  books: Book[];
  bookChange: (book: Book) => void;
}

export function SelectBook({ rent, books, bookChange }: SelectProps) {
  const [book, setBook] = useState(books[0]);

  return (
    <SelectContainer>
      <label htmlFor="book_id">Book:</label>
      <Field
        as="select"
        id="book_id"
        name={book.id}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          books.map((book) => {
            if (book.id === Number(e.target.value)) {
              setBook(book);
              bookChange(book);
            }
          });
        }}
      >
        <option></option>
        {books.map((b) => {
          if (rent?.id && rent?.livro_id.id === b.id) {
            return (
              <option selected key={b.id} value={b.id}>
                {b.nome}
              </option>
            );
          }
          return (
            <option key={b.id} value={b.id}>
              {b.nome}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name="livro_id" />
    </SelectContainer>
  );
}
