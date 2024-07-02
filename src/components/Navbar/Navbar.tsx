"use client";

import styles from "./Navbar.module.css";
import Link from "next/link";
import { useSession } from "@/context";

export default function Navbar() {
  const { session, loading } = useSession();

  return (
    <nav className={styles.navbar}>
      <Link href="/">Home</Link>
      <Link href="/book-catalog">Book catalog</Link>
      {loading ? null : session ? (
        <Link href="/logout">Logout</Link>
      ) : (
        <>
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}
