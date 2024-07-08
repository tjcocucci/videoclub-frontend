"use client";

import { ErrorList } from "@/components";
import { useGetBooks } from "@/hooks";
import { BooksTable } from "./components";

export default function BookCatalog() {
  const { books, loading, errors } = useGetBooks();

  return (
    <div>
      <h1>Book Catalog</h1>
      {loading ? <p>Loading...</p> : <BooksTable items={books} />}
      {errors && <ErrorList errors={errors} />}
    </div>
  );
}
