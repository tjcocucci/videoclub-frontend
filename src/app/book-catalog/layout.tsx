import { Suspense } from "react";

import { AuthProvider } from "@/context";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AuthProvider> {children} </AuthProvider>;
    </Suspense>
  );
}
