"use client";
import { useState } from "react";
import styles from "./register.module.css"; // Import CSS Module

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    tel: "",
  });
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMessage("User registered successfully!");
      setForm({ name: "", email: "", password: "", tel: "" });
    } else {
      const error = await res.json();
      setMessage(error.error || "Registration failed");
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className={styles.input}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={form.tel}
          onChange={(e) => setForm({ ...form, tel: e.target.value })}
          required
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Register
        </button>

        {message && (
          <p
            className={`${styles.message} ${
              message.includes("success") ? styles.success : styles.error
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
