import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    reqBody.profession = "0";
    reqBody.bio = "0";
    reqBody.avatar =
      "https://ucarecdn.com/0b2cf336-fb74-444a-8d97-781c09dbf43f/dumpyuser.jpg";
    reqBody.address = "0";
    reqBody.otp = "0";
    reqBody.type = "user";
    let uniqueUser = await prisma.users.count({
      where: { email: reqBody.email },
    });
    if (uniqueUser === 1) {
      return NextResponse.json({
        status: "Email already exist.",
      });
    } else {
      let createUser = await prisma.users.create({ data: reqBody });
      return NextResponse.json({
        status: "Successfully create user.",
        data: createUser,
      });
    }
  } catch (e) {
    return NextResponse.json({
      status: "Registration Fail",
      data: e.toString(),
    });
  }
}
