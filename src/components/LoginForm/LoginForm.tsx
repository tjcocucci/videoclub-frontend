"use client";

import { useState } from "react";

import styles from "./LoginForm.module.css";
import { useLogin } from "@/hooks";
import { setCookie } from "@/actions";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, errors } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await login(username, password);
    if (!data?.access_token) return;
    setCookie("access_token", data.access_token);
    router.push("/");
    console.log(data);
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
