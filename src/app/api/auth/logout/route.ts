import { cookies } from "next/headers";

export async function POST() {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");

  return new Response(JSON.stringify({ message: "Logout Successful" }), {
    status: 200,
  });
}
