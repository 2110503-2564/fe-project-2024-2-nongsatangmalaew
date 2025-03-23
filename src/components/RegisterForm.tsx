"use client";
import { useState } from "react";

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={form.tel}
        onChange={(e) => setForm({ ...form, tel: e.target.value })}
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Register
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
