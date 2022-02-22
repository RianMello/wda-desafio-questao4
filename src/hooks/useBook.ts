import { useContext } from "react";
import { BooksContext } from "../contexts/BooksContext";

export function useBook(){
    const context = useContext(BooksContext)
    const {books, addBook, removeBook, editBook, moreRenteds} = context;
    return {books, addBook, removeBook, editBook, moreRenteds}
}