"use client";

import { logout as logoutAction } from "@/actions";
import { useSession } from "@/context";
import { useState } from "react";

export function useLogout() {
  const [loading, setLoading] = useState(false);

  const { setSession } = useSession();
  const logout = async () => {
    setLoading(true);
    await logoutAction();
    setSession(null);
    setLoading(false);
  };
  return { logout, loading };
}
