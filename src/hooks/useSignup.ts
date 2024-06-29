import { useState } from "react";
import { ZodError } from "zod";
import { userSignupSchema } from "@/validators";
import { signup as signupAction } from "@/actions";

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
      const result = await signupAction(username, password);
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

  return { signup, loading, errors };
}
