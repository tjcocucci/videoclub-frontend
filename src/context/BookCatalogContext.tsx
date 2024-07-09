"use client";

import { useAddBook, useGetBooks, useRemoveBook, useUpdateBook } from "@/hooks";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { AddBookRequest, Book, UpdateBookRequest } from "@/types";

interface BookCatalogContextType {
  books: Book[];
  loading: boolean;
  errors: string[];
  removeErrors: string[];
  updateErrors: string[];
  addErrors: string[];
  updateLoading: null | number;
  removeLoading: null | number;
  addLoading: boolean;
  handleRemoveBook: (id: number) => Promise<void>;
  handleUpdateBook: (book: UpdateBookRequest) => Promise<void>;
  handleAddBook: (book: AddBookRequest) => Promise<void>;
}

const BookCatalogContext = createContext<BookCatalogContextType | undefined>(
  undefined
);

export const BookCatalogProvider = ({ children }: { children: ReactNode }) => {
  const { books: initialBooks, loading, errors } = useGetBooks();
  const {
    removeBook,
    errors: removeErrors,
    loading: removeLoading,
  } = useRemoveBook();
  const {
    updateBook,
    errors: updateErrors,
    loading: updateLoading,
  } = useUpdateBook();
  const { addBook, errors: addErrors, loading: addLoading } = useAddBook();

  const [books, setBooks] = useState(initialBooks);

  useEffect(() => {
    if (initialBooks) setBooks(initialBooks);
  }, [initialBooks]);

  const handleRemoveBook = async (id: number) => {
    await removeBook(id);
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const handleUpdateBook = async (updatedBook: UpdateBookRequest) => {
    const response = await updateBook(updatedBook);
    if (response?.success) {
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === updatedBook.id ? { ...book, ...response.data } : book
        )
      );
    }
  };

  const handleAddBook = async (newBook: AddBookRequest) => {
    const response = await addBook(newBook);
    if (response?.success) {
      setBooks((prevBooks) => [...prevBooks, response.data]);
    }
  };

  return (
    <BookCatalogContext.Provider
      value={{
        books,
        loading,
        errors,
        removeErrors,
        updateErrors,
        addErrors,
        updateLoading,
        removeLoading,
        addLoading,
        handleRemoveBook,
        handleUpdateBook,
        handleAddBook,
      }}
    >
      {children}
    </BookCatalogContext.Provider>
  );
};

export const useBookCatalog = () => {
  const context = useContext(BookCatalogContext);
  if (context === undefined) {
    throw new Error("useBookCatalog must be used within a BookCatalogProvider");
  }
  return context;
};
