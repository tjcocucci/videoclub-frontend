"use client";

import { useGetBooks } from "@/hooks";

export default function BookCatalog() {
  const { books, loading, errors } = useGetBooks();

  return (
    <div>
      <h1>Book Catalog</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <h2>{book.title}</h2>
              <p>{book.author}</p>
            </li>
          ))}
        </ul>
      )}
      {errors && (
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
