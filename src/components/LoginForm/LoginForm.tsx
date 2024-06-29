"use client";

import { useState } from "react";

import styles from "./LoginForm.module.css";
import { useLogin } from "@/hooks";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, errors } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      access_token,
      token_type,
      username: user,
    } = await login(username, password);
    console.log({ access_token, token_type, user });
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
      {errors && (
        <ul className={styles.error}>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </form>
  );
}
