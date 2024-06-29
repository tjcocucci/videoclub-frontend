"use server";

import { cookies } from "next/headers";
import { encrypt } from "./jwt";

export async function login(username: string, password: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH_SERVER_ADDRESS}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      // Create the session
      const expires = new Date(Date.now() + 10 * 1000);
      const session = await encrypt({ data, expires });

      // Save the session in a cookie
      cookies().set("session", session, { expires, httpOnly: true });

      return { success: true };
    } else if (response.status === 404) {
      return { success: false, error: "User not found" };
    } else if (response.status === 401) {
      return { success: false, error: "Invalid password" };
    } else {
      return { success: false, error: "Unexpected error" };
    }
  } catch (error: any) {
    return { success: false, error: error.message || "Internal server error" };
  }
}

export async function signup(username: string, password: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH_SERVER_ADDRESS}/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    if (response.ok) {
      return { success: true };
    } else if (response.status === 409) {
      return { success: false, error: "User already exists" };
    } else {
      return { success: false, error: "Unexpected error" };
    }
  } catch (error: any) {
    return { success: false, error: error.message || "Internal server error" };
  }
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}
