import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Create Notice
export async function POST(req) {
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };
  try {
    let prisma = new PrismaClient();
    let reqBody = await req.json();
    reqBody.status = "open";
    let createNotice = await prisma.notices.create({ data: reqBody });

    return NextResponse.json({
      status: "Successfully Create Notice",
      data: createNotice,
    });
  } catch (e) {
    return NextResponse.json({
      status: "Fail, Internal Error!",
      data: e.toString(),
    });
  }
}

// Update Notice
export async function PATCH(req) {
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };
  try {
    let prisma = new PrismaClient();
    let reqBody = await req.json();
    let updateNotice = await prisma.notices.update({
      where: { id: reqBody.id },
      data: {
        title: reqBody.title,
        details: reqBody.details,
        status: reqBody.status,
      },
    });

    return NextResponse.json({
      status: "Successfully Update Notice.",
      data: updateNotice,
    });
  } catch (e) {
    return NextResponse.json({
      status: "Fail, Internal Error!",
      data: e.toString(),
    });
  }
}

// Delete Notice
export async function DELETE(req) {
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };

  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    let deleteNotice = await prisma.notices.delete({
      where: { id: reqBody["id"] },
    });

    return NextResponse.json({
      status: "Successfully Delete Notice",
      data: deleteNotice,
    });
  } catch (e) {
    return NextResponse.json({
      status: "Internal Error!",
      data: e.toString(),
    });
  }
}
