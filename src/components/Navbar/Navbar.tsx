"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { useSession } from "@/context";
import { useLogout } from "@/hooks";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { session, loading } = useSession();
  const router = useRouter();
  const { logout } = useLogout();
  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/">Home</Link>
      <Link href="/book-catalog">Book catalog</Link>
      {loading ? null : session ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}
