"use client";

import { ErrorList } from "@/components";
import { BooksTable } from "./components";
import { useBookCatalog } from "@/context";

export default function BookCatalog() {
  const { books, loading, errors } = useBookCatalog();

  return (
    <div>
      <h1>Book Catalog</h1>
      {loading ? <p>Loading...</p> : <BooksTable items={books} />}
      {errors && <ErrorList errors={errors} />}
    </div>
  );
}
