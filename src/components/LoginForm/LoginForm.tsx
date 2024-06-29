"use client";

import { useState } from "react";

import styles from "./LoginForm.module.css";
import { useLogin } from "@/hooks";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      await login(username, password);
    } else {
      console.error("Please fill in both fields");
    }
  };

  return (
    <form className={styles.container}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button onClick={handleSubmit}>{loading ? "Loading..." : "Login"}</button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
