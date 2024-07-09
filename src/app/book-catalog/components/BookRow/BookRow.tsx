"use client";

import { useState } from "react";
import styles from "./BookRow.module.css";
import { useRemoveBook, useUpdateBook } from "@/hooks";
import { useBookCatalog } from "@/context";
import { Book } from "@/types";

export default function BookRow({ book }: { book: Book }) {
  const {
    removeErrors,
    updateErrors,
    updateLoading,
    removeLoading,
    handleRemoveBook,
    handleUpdateBook,
  } = useBookCatalog();

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);

  const save = () => {
    setEditing(false);
    handleUpdateBook({ ...book, id: book.id, title, author });
  };

  const remove = () => {
    handleRemoveBook(book.id);
  };

  const onEditButtonClick = () => {
    if (editing) {
      save();
    } else {
      setEditing(true);
    }
  };

  const loading = removeLoading || updateLoading;

  return (
    <div className={styles.container}>
      {!loading && (
        <>
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
            <button className={styles.removeButton} onClick={remove}>
              Remove
            </button>
          </div>
        </>
      )}
    </div>
  );
}
