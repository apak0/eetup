import bcrypt from "bcrypt";
import { NextRequest } from "next/server";
import { users } from "../../db";

export async function POST(req: NextRequest) {
  const { email, username, password } = await req.json();
  if (users[email]) {
    return new Response("User already exists", {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users[email] = { email, username, password: hashedPassword };

  return new Response("User registered successfully", {
    status: 200,
  });
}
