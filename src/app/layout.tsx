import type { Metadata } from "next";
import Link from "next/link";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Videoclub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Link href="/login"> Login</Link>
        <Link href="/signup"> Signup</Link>
        <Link href="/book-catalog"> Book Catalog</Link>
        {children}
      </body>
    </html>
  );
}
