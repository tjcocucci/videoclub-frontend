"use client";

import { useState } from "react";
import styles from "./BookRow.module.css";
import { useBookCatalog } from "@/context";

export default function AddBookRow() {
  const [title, setTitle] = useState<string | null>(null);
  const [author, setAuthor] = useState<string | null>(null);
  const { handleAddBook } = useBookCatalog();

  const add = () => {
    if (title && author) {
      handleAddBook({ title, author });
      setTitle(null);
      setAuthor(null);
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.title}
        defaultValue={"Title"}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className={styles.author}
        defaultValue={"Author"}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <div className={styles.buttons}>
        <button onClick={add}>Add</button>
      </div>
    </div>
  );
}
