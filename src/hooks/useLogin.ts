import { useState } from "react";
import { userLoginSchema } from "@/validators";
import { login as loginAction } from "@/actions";
import { ZodError } from "zod";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const login = async (username: string, password: string) => {
    try {
      userLoginSchema.parse({ username, password });
      const result = await loginAction(username, password);
      if (result.success) {
        return true;
      } else {
        setErrors([result.error]);
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
