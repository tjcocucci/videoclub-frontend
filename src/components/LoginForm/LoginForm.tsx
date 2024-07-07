"use client";

import { useState } from "react";

import { useLogin } from "@/hooks";
import { useRouter } from "next/navigation";
import { FormContainer, ErrorList } from "@/components";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, errors } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loggedIn = await login(username, password);
    if (loggedIn) {
      router.push("/");
    }
  };

  return (
    <FormContainer>
      <h1>Login</h1>
      <label>
        <p>Username:</p>
        <input
          type="text"
          autoComplete="on"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        <p>Password:</p>
        <input
          type="password"
          autoComplete="on"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button onClick={handleSubmit}>{loading ? "Loading..." : "Login"}</button>
      {errors && <ErrorList errors={errors} />}
    </FormContainer>
  );
}
