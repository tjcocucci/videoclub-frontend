"use client";

import { useState } from "react";
import styles from "./BookRow.module.css";

export default function BookRow({
  book,
}: {
  book: { title: string; author: string };
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);

  const save = () => {
    setEditing(false);
    // save to server
  };

  const onEditButtonClick = () => {
    if (editing) {
      save();
    } else {
      setEditing(true);
    }
  };

  return (
    <div className={styles.container}>
      {editing ? (
        <>
          <input
            className={styles.title}
            defaultValue={book.title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className={styles.author}
            defaultValue={book.author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </>
      ) : (
        <>
          <h2 className={styles.title}>{book.title}</h2>
          <p className={styles.author}>{book.author}</p>
        </>
      )}
      <div className={styles.buttons}>
        <button className={styles.editButton} onClick={onEditButtonClick}>
          {editing ? "Confirm" : "Edit"}
        </button>
        <button className={styles.removeButton}>Remove</button>
      </div>
    </div>
  );
}
