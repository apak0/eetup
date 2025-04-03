import { NextRequest } from "next/server";
import { JWT_SECRET, users } from "../../db";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = users[email];

  if (!user) {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 400,
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 400,
    });
  }
  const { password: _, ...userWithoutPassword } = user;

  const accessToken = jsonwebtoken.sign(userWithoutPassword, JWT_SECRET, { expiresIn: "1d" });
  const refreshToken = jsonwebtoken.sign({}, JWT_SECRET, { expiresIn: "1w" });

  cookies().set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // One day
    path: "/",
  });
  cookies().set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });

  return new Response(JSON.stringify({ message: "Login Successful" }), {
    status: 200,
  });
}
