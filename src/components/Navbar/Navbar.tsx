"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { useSession } from "@/context";
import { useLogout } from "@/hooks";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { session, loading } = useSession();
  const router = useRouter();
  const { logout } = useLogout();
  const path = usePathname();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={path === "/" ? styles.active : styles.inactive}>
        Home
      </Link>
      <Link
        href="/book-catalog"
        className={path === "/book-catalog" ? styles.active : styles.inactive}
      >
        Book catalog
      </Link>
      {loading ? null : session ? (
        <button
          className={styles.inactive}
        onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <Link
            href="/login"
            className={path === "/login" ? styles.active : styles.inactive}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className={path === "/signup" ? styles.active : styles.inactive}
          >
            Signup
          </Link>
        </>
      )}
    </nav>
  );
}
