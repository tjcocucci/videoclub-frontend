import { useState } from "react";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    setLoading(true);

    try {
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
        return data;
      } else if (response.status === 404) {
        throw new Error("User not found");
      } else if (response.status === 401) {
        throw new Error("Invalid password");
      } else {
        throw new Error("Unexpected error");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };

  return { login, loading, error };
}
