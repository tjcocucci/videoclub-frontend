"use server";

import { AddBookRequest, Book, Genre, UpdateBookRequest } from "@/types";
import { getSession } from "./session";

export async function fetchBooks() {
  try {
    const session = await getSession();
    if (!session.data?.access_token) {
      return { success: false, error: "Unauthorized" };
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CATALOG_SERVER_ADDRESS}/books/`,
      {
        headers: {
          Authorization: `Bearer ${session?.data?.access_token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      return { success: true, data };
    } else {
      return { success: false, error: "There was an error fetching the books" };
    }
  } catch (error: any) {
    return { success: false, error: "Internal server error" };
  }
}

export async function updateBook(book: UpdateBookRequest) {
  try {
    const session = await getSession();
    if (!session.data?.access_token) {
      return { success: false, error: "Unauthorized" };
    }
    const body = {
      title: book.title,
      author: book.author,
      isbn: book.isbn,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CATALOG_SERVER_ADDRESS}/books/${book.id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.data?.access_token}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      return { success: false, error: "There was an error updating the book" };
    }
  } catch (error: any) {
    return { success: false, error: "Internal server error" };
  }
}

export async function removeBook(id: number) {
  try {
    const session = await getSession();
    if (!session.data?.access_token) {
      return { success: false, error: "Unauthorized" };
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CATALOG_SERVER_ADDRESS}/books/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.data?.access_token}`,
        },
      }
    );

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: "There was an error removing the book" };
    }
  } catch (error: any) {
    return { success: false, error: "Internal server error" };
  }
}

export async function addBook(book: AddBookRequest) {
  try {
    const session = await getSession();
    if (!session.data?.access_token) {
      return { success: false, error: "Unauthorized" };
    }
    const body = {
      title: book.title,
      author: book.author,
      isbn: book.isbn || "1234567890123",
      stock: book.stock || 0,
      price: book.price || 0,
      genres: book.genres || [],
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CATALOG_SERVER_ADDRESS}/books/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.data?.access_token}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      return { success: false, error: "There was an error adding the book" };
    }
  } catch (error: any) {
    return { success: false, error: "Internal server error" };
  }
}
