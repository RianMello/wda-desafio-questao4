import { createContext, useState, ReactNode, useEffect } from "react";
import { Book } from "../interfaces/ResponseAPI";
import api from "../services/api";

interface BookProviderProps {
  children: ReactNode;
}
interface BookContextProps {
  load: boolean;
  books: Book[];
  moreRenteds: Book[];
  available: Book[];
  addBook: (book: Book, onFinish: () => void) => void;
  removeBook: (book: Book, onFinish: () => void) => void;
  editBook: (book: Book) => void;
}

export const BooksContext = createContext<BookContextProps>(
  {} as BookContextProps
);

export function BooksProvider({ children }: BookProviderProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [moreRenteds, setMoreRenteds] = useState([]);
  const [available, setAvailable] = useState([]);

  const [load, setLoad] = useState(true)

  useEffect(() => {
    api
      .get("/api/livros")
      .then((res) => {
        setLoad(false)
        setBooks(res.data)
      })
      .catch((err) => console.log(err));

    api
      .get("/api/maisalugados")
      .then((res) => setMoreRenteds(res.data))
      .catch((err) => console.log(err)); 

    api
      .get("/api/disponiveis")
      .then((res) => setAvailable(res.data))
      .catch((err) => console.log(err));
  }, []);

  function addBook(book: Book, onFinish: () => void) {
    api
      .post("/api/livro", book)
      .then(() => {
        onFinish();
      })
      .catch(err =>{ 
        if(err.message === 'Request failed with status code 400'){
          alert('Book already registered! Check the data and try again');
        }
      })
  }

  function removeBook(book: Book, onFinish: () => void) {
    api.delete("/api/livro", { data: book })
    .then(() => {
      alert('Book deleted successfully')
      onFinish();
    })
    .catch(() => {
      alert('Book not deleted, error in comunication')
    })
  }

  function editBook(book: Book) {
    api.put("/api/livro", book)
    .then(()=> console.log('Book updated'))
  }

  return (
    <BooksContext.Provider
      value={{
        available,
        load,
        books,
        addBook,
        removeBook,
        editBook,
        moreRenteds,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}
