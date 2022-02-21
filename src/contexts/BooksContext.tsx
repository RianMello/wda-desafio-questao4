import { AxiosRequestConfig } from "axios";
import { createContext, useState, ReactNode, useEffect } from "react";
import { Book } from "../interfaces/ResponseAPI";
import api from "../services/api";


interface BookProviderProps{
    children: ReactNode;
}

interface BookContextProps{
    books: Book[]
    addBook: (book: Book) => void;
    removeBook: (book: Book) => void;
    editBook: (book: Book) => void;
}

export const BooksContext = createContext<BookContextProps>({} as BookContextProps)

export function BooksProvider({ children }: BookProviderProps){
    const [books, setBooks] = useState<Book[]>([])

    useEffect(()=>{
        api
        .get('/api/livros')
        .then(res => setBooks(res.data))
        .catch(err => console.log(err))
    })

    function addBook(book:Book){
        api.post('/api/livro', book)
        .then(()=> alert("livro adicionado com sucesso"))
        .catch(err => alert("Ops! Algo de errado não deu certo"))
    }

    function removeBook(book:Book){
        api.delete('/api/livro', book as AxiosRequestConfig<Book>)
        .then(res => console.log(res))
        .catch(err => {
            console.log(err.response)
            console.log(err.request)
            })
    }

    function editBook(book: Book){
        api.put('/api/livro', book)
    }

    return(
        <BooksContext.Provider 
            value={{
                books, addBook, removeBook, editBook
            }}
        >
            {children}
        </BooksContext.Provider>
    )
}