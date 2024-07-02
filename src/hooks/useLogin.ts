"use client";

import { useState } from "react";
import { ZodError } from "zod";
import { userLoginSchema } from "@/validators";
import { login as loginAction } from "@/actions";
import { useSession } from "@/context";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const { setSession } = useSession();
  const [errors, setErrors] = useState<string[]>([]);

  const login = async (username: string, password: string) => {
    try {
      userLoginSchema.parse({ username, password });
      const result = await loginAction(username, password);
      if (result.success) {
        setSession(result.session);
        return true;
      } else {
        setErrors([result.error || "Unexpected error"]);
        return false;
      }
    } catch (error: any) {
      if (error instanceof ZodError) {
        setErrors(error.errors.map((error) => error.message));
      } else {
        setErrors([error.message]);
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };

  return { login, loading, errors };
}
