import { Book } from "@/types";
import { AddBookRow, BookRow } from "..";

import styles from "./BooksTable.module.css";

export default function BooksTable({ items }: { items: Book[] }) {
  
  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        <BookRow key={index} book={item} />
      ))}
      <AddBookRow />
    </div>
  );
}
