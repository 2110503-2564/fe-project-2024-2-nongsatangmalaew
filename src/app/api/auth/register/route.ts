import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password, tel } = await req.json();

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, tel }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Registration failed" }, { status: 400 });
    }

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

