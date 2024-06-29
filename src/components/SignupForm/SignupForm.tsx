"use client";

import { useState } from "react";

import styles from "./SignupForm.module.css";
import { useSignup } from "@/hooks";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, loading, errors } = useSignup();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(username, password, confirmPassword);
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
      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <button onClick={handleSubmit}>
        {loading ? "Loading..." : "Signup"}
      </button>
      {errors && (
        <ul className={styles.error}>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}{" "}
    </form>
  );
}
