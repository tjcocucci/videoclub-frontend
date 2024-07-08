import { BookCatalogProvider } from "@/context";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BookCatalogProvider>{children}</BookCatalogProvider>;
}
