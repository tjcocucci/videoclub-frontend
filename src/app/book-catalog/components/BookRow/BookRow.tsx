"use client";

import { useState } from "react";
import styles from "./BookRow.module.css";
import { useBookCatalog } from "@/context";
import { Book } from "@/types";

export default function BookRow({ book }: { book: Book }) {
  const { updateLoading, removeLoading, handleRemoveBook, handleUpdateBook } =
    useBookCatalog();

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [isbn, setIsbn] = useState(book.isbn);

  const save = () => {
    setEditing(false);
    handleUpdateBook({ ...book, id: book.id, title, author, isbn });
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

  const loading = removeLoading === book.id || updateLoading === book.id;

  return (
    <div className={styles.container}>
      {!loading && (
        <>
          {editing ? (
            <>
              <div className={styles.titleIsbnBox}>
                <input
                  className={styles.title}
                  defaultValue={book.title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  className={styles.isbn}
                  defaultValue={book.isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                />
              </div>
              <input
                className={styles.author}
                defaultValue={book.author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </>
          ) : (
            <>
              <div>
                <h2 className={styles.title}>{book.title}</h2>
                <p className={styles.isbn}>Isbn: {book.isbn}</p>
              </div>
              <p>{book.genres.map((genre) => genre.name).join(", ")}</p>
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
