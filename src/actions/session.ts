"use server";

import { cookies } from "next/headers";
import { decrypt } from "./jwt";

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  const data = await decrypt(session);
  return data;
}
