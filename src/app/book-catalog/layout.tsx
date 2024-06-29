import { AuthProvider } from "@/context";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthProvider> {children} </AuthProvider>;
}
