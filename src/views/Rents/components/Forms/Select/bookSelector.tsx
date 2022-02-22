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

    const [book, setBook] = useState({}as Book)

    return (
      <SelectContainer>
        <label htmlFor="livro_id">Book:</label>
        <Field
          as="select"
          id="livro_id"
          name={book.id}
          placeholder="Livro..."
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
          {books.map((b) => {
            if (rent?.id && rent?.usuario_id.id === b.id) {
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