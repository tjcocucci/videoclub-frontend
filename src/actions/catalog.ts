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
