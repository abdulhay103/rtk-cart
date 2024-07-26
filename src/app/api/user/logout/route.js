import { NextResponse } from "next/server";

//Logout / token remove
export async function GET() {
  const expirationDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const formattedExpiration = expirationDate.toUTCString();
  const cookieString = `token=${""}; expires=${formattedExpiration}; path=/`;
  return NextResponse.json(
    {
      status: "Logout Success",
    },
    { status: 200, headers: { "Set-Cookie": cookieString } },
  );
}
