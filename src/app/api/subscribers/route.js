import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };
  try {
    let prisma = new PrismaClient();
    let reqBody = await req.json();
    let uniqueSubscriber = await prisma.subscribers.findUnique({
      where: reqBody,
    });
    if (uniqueSubscriber === null) {
      let createSubsriber = await prisma.subscribers.create({
        data: reqBody,
      });
      return NextResponse.json({
        status: "Your subscription successfully done.",
        data: createSubsriber,
      });
    } else {
      return NextResponse.json({
        status: "This email already exist.",
      });
    }
  } catch (e) {
    return NextResponse.json({
      status: "Fail! Internal Error",
      data: e.toString(),
    });
  }
}
