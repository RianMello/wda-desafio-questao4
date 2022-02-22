import { ErrorMessage, Field } from "formik";
import { useState } from "react";
import { Book, Rent} from "../../../../../interfaces/ResponseAPI";
import { SelectContainer } from "./style";

interface SelectProps{
    rent?: Rent;
    books: Book[];
    bookChange: (book: Book) => void;
}

export function SelectBook({ rent, books, bookChange }: SelectProps){

    const [book, setBook] = useState(books[0])

    return (
      <SelectContainer>
        <label htmlFor="editora_id">Responsible:</label>
        <Field
          as="select"
          id="usuario"
          name={book.id}
          placeholder="editora..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            books.map((book) => {
              if (book.id === Number(e.target.value)) {
                setBook(book)
                bookChange(book)
              }
              return book
            });
          }}
        >
          {books.map((book) => {
            if (rent?.id && rent?.usuario_id.id === book.id) {
              return (
                <option selected key={book.id} value={book.id}>
                  {book.nome}
                </option>
              );
            }
            return (
              <option key={book.id} value={book.id}>
                {book.nome}
              </option>
            );
          })}
        </Field>
        <ErrorMessage name="livro_id" />
      </SelectContainer>
    );
}