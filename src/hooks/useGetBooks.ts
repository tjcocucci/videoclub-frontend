"use client";

import { useEffect, useState } from "react";
import { fetchBooks as fetchBooksAction } from "@/actions";

interface Book {
  id: string;
  title: string;
  author: string;
}

export default function useGetBooks() {
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
