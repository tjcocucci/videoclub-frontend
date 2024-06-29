import { useState } from "react";
import { userLoginSchema } from "@/validators";
import { ZodError } from "zod";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const login = async (username: string, password: string) => {
    try {
      userLoginSchema.parse({ username, password });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_SERVER_ADDRESS}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setErrors([]);
        return data;
      } else if (response.status === 404) {
        throw new Error("User not found");
      } else if (response.status === 401) {
        throw new Error("Invalid password");
      } else {
        throw new Error("Unexpected error");
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
