"use client";

import { getSession } from "@/actions";
import { useEffect, useState } from "react";

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
        const session = await getSession();
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_CATALOG_SERVER_ADDRESS}/books/`,
          {
            headers: {
              Authorization: `Bearer ${session?.data?.access_token}`,
            },
          }
        );
        const data = await response.json();
        setBooks(data);
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
