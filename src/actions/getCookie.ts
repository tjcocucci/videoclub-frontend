"use server";

import { cookies } from "next/headers";

export default async function getCookie(name: string) {
  return cookies().get(name);
}
