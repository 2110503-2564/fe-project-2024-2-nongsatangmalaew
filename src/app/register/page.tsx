// import  RegisterForm  from "../../components/RegisterForm";

// export default function RegisterPage() {
//   return (
//     <main className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-2xl mb-4">Register</h1>
//       <RegisterForm />
//     </main>
//   );
// }



"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    telephone_number: "",
  });
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const res = await fetch("http://localhost:5000/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });


    const data = await res.json();

    if (res.ok) {
      setMessage("User registered successfully!");
      setForm({ name: "", email: "", password: "", telephone_number: "" });

      // Redirect ไปหน้า login หรือ home
      setTimeout(() => router.push("/api/auth/signin"), 300);
    } else {
      setMessage(data.error || "Registration failed");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={form.telephone_number}
          onChange={(e) => setForm({ ...form, telephone_number: e.target.value })}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Register
        </button>

        {message && (
          <p className={`text-center mt-2 ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
