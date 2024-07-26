import { CreateToken } from "@/src/utils/jwtHelper";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    let uniqueUser = await prisma.users.findUnique({ where: reqBody });

    if (uniqueUser === null) {
      return NextResponse.json({
        status: "Invalid username or password.",
      });
    } else {
      // Set token
      let token = await CreateToken(
        uniqueUser["id"],
        uniqueUser["firstName"],
        uniqueUser["email"],
        uniqueUser["type"],
      );

      const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const formattedExpiration = expirationDate.toUTCString();
      const cookieString = `token=${token}; expires=${formattedExpiration}; path=/; HttpOnly; Secured`;
      return NextResponse.json(
        {
          status: "Login Success",
          token: token,
        },
        {
          status: 200,
          headers: { "Set-Cookie": cookieString },
        },
      );
    }
  } catch (e) {
    return NextResponse.json({
      status: "Login Fail. Server Problem.",
      data: e.toString(),
    });
  }
}
