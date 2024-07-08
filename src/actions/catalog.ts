"use server";

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

export async function updateBook(book: {
  id: number;
  title: string;
  author: string;
}) {
  try {
    const session = await getSession();
    if (!session.data?.access_token) {
      return { success: false, error: "Unauthorized" };
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CATALOG_SERVER_ADDRESS}/books/${book.id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.data?.access_token}`,
        },
        body: JSON.stringify(book),
      }
    );

    if (response.ok) {
      return { success: true };
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

