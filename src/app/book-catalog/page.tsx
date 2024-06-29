"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import getCookie from "@/actions/getCookie";
import { useAuthContext } from "@/context";

export default function BookCatalog() {
  const router = useRouter();

  const [showLoading, setShowLoading] = useState(true);

  const { setIsAuthenticated } = useAuthContext();

  useEffect(() => {
    const checkAuth = async () => {
      const access_token = await getCookie("access_token");
      if (!access_token) {
        window.location.href = "/login";
      }
      setShowLoading(false);
      setIsAuthenticated(true);
    };
    checkAuth();
  }, []);

  return showLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <h1>Book Catalog</h1>
    </div>
  );
}
