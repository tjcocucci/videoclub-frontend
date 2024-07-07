"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignup } from "@/hooks";
import { FormContainer, ErrorList } from "@/components";

export default function SignupForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, loading, errors } = useSignup();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isSignedUp = await signup(username, password, confirmPassword);
    if (isSignedUp) {
      router.push("/login");
    }
  };

  return (
    <FormContainer>
      <h1>Signup</h1>
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
      <label>
        <p>Confirm Password:</p>
        <input
          type="password"
          autoComplete="off"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <button onClick={handleSubmit}>
        {loading ? "Loading..." : "Signup"}
      </button>
      {errors && <ErrorList errors={errors} />}
    </FormContainer>
  );
}
