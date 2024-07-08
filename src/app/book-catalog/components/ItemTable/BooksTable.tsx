import { BookRow } from "..";

import styles from "./BooksTable.module.css";

export default function BooksTable({
  items,
}: {
  items: { id: number; title: string; author: string }[];
}) {
  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        <BookRow key={index} book={item} />
      ))}
    </div>
  );
}
