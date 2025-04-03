import { authenticateRequest } from "@/app/lib/utils/authenticate";
import { NextResponse } from "next/server";

export async function GET() {
  const user = authenticateRequest();

  return NextResponse.json(user);
}
