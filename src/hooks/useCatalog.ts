"use client";

import { useEffect, useState } from "react";
import {
  fetchBooks as fetchBooksAction,
  updateBook as updateBookAction,
  removeBook as removeBookAction,
  addBook as addBookAction,
} from "@/actions";
import { AddBookRequest, Book, UpdateBookRequest } from "@/types";

export function useGetBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const result = await fetchBooksAction();
        if (!result.success) {
          setErrors([result.error || "Unexpected error"]);
        } else {
          setBooks(result.data);
        }
      } catch (error: any) {
        setErrors(["Unexpected error occurred. Please try again later."]);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return { books, loading, errors };
}

export function useUpdateBook() {
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const updateBook = async (book: UpdateBookRequest) => {
    setLoading(true);
    try {
      const result = await updateBookAction(book);
      if (!result.success) {
        setErrors([result.error || "Unexpected error"]);
      }
    } catch (error: any) {
      setErrors(["Unexpected error occurred. Please try again later."]);
    } finally {
      setLoading(false);
    }
  };
  return { updateBook, loading, errors };
}

export function useRemoveBook() {
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const removeBook = async (id: number) => {
    try {
      setLoading(true);
      const result = await removeBookAction(id);
      if (!result.success) {
        setErrors([result.error || "Unexpected error"]);
      }
    } catch (error: any) {
      setErrors(["Unexpected error occurred. Please try again later."]);
    } finally {
      setLoading(false);
    }
  };
  return { removeBook, loading, errors };
}

export function useAddBook() {
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const addBook = async (book: AddBookRequest) => {
    try {
      setLoading(true);
      const result = await addBookAction(book);
      if (!result.success) {
        setErrors([result.error || "Unexpected error"]);
      }
      return result;
    } catch (error: any) {
      setErrors(["Unexpected error occurred. Please try again later."]);
    } finally {
      setLoading(false);
    }
  };
  return { addBook, loading, errors };
}
