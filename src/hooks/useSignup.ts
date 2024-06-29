import { userSignupSchema } from "@/validators";
import { useState } from "react";
import { ZodError } from "zod";

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const signup = async (
    username: string,
    password: string,
    confirmPassword: string
  ) => {
    setLoading(true);

    try {
      userSignupSchema.parse({ username, password, confirmPassword });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_SERVER_ADDRESS}/users`,
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
      } else if (response.status === 409) {
        throw new Error("User already exists");
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

  return { signup, loading, errors };
}
