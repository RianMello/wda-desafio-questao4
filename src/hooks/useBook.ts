import { useContext } from "react";
import { BooksContext } from "../contexts/BooksContext";

export function useBook(){
    const context = useContext(BooksContext)
    const { available,load,books, addBook, removeBook, editBook, moreRenteds} = context;
    return { available,load,books, addBook, removeBook, editBook, moreRenteds}
}