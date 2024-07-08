"use client";

import { useGetBooks, useRemoveBook, useUpdateBook } from "@/hooks";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface Book {
  id: number;
  title: string;
  author: string;
}

interface BookCatalogContextType {
  books: Book[];
  loading: boolean;
  errors: string[];
  removeErrors: string[];
  updateErrors: string[];
  updateLoading: boolean;
  removeLoading: boolean;
  handleRemoveBook: (id: number) => Promise<void>;
  handleUpdateBook: (book: Book) => Promise<void>;
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

  const [books, setBooks] = useState(initialBooks);

  useEffect(() => {
    if (initialBooks) setBooks(initialBooks);
  }, [initialBooks]);

  const handleRemoveBook = async (id: number) => {
    await removeBook(id);
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const handleUpdateBook = async (updatedBook: Book) => {
    await updateBook(updatedBook);
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  return (
    <BookCatalogContext.Provider
      value={{
        books,
        loading,
        errors,
        removeErrors,
        updateErrors,
        updateLoading,
        removeLoading,
        handleRemoveBook,
        handleUpdateBook,
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
