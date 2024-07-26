import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };

  const headerList = headers();
  let id = parseInt(headerList.get("id"));
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
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
        data: {
          firstName: reqBody.firstName,
          lastName: reqBody.lastName,
          profession: reqBody.profession,
          bio: reqBody.bio,
          avatar: reqBody.avatar,
          email: reqBody.email,
          phone: reqBody.phone,
          address: reqBody.address,
          password: reqBody.password,
          otp: "0",
        },
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
