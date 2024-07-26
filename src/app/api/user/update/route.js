import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  const headerList = headers();
  let id = parseInt(headerList.get("id"));
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    reqBody.otp = "0";
    let uniqueUser = await prisma.users.findUnique({
      where: { id: id },
    });
    if (uniqueUser === null) {
      return NextResponse.json({
        status: "User dosen't exist.",
      });
    } else {
      let updateUser = await prisma.users.update({
        where: { id: id },
        data: reqBody,
      });
      return NextResponse.json({
        status: "Successfully Update User.",
        data: updateUser,
      });
    }
  } catch (e) {
    return NextResponse.json({
      status: "Update Fail",
      data: e.toString(),
    });
  }
}
