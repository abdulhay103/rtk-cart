import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Create Massage Api
export async function POST(req) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    reqBody.status = "unread";
    let createMassage = await prisma.massages.create({ data: reqBody });
    return NextResponse.json({
      status: "Successfully send your massage.",
      data: createMassage,
    });
  } catch (error) {
    return NextResponse.json({
      status: "Fail! Internal Error",
      data: error.toString(),
    });
  }
}

//Update Massage API
export async function PATCH(req) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    let updateMassage = await prisma.massages.update({
      where: {
        id: reqBody.id,
      },
      data: {
        status: "read",
      },
    });
    return NextResponse.json({
      status: "Successfully open the message.",
      data: updateMassage,
    });
  } catch (error) {
    return NextResponse.json({
      status: "Fail! Internal Error",
      data: error.toString(),
    });
  }
}
//DELETE Massage API
export async function DELETE(req) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    let deleteMassage = await prisma.massages.delete({
      where: reqBody,
    });
    return NextResponse.json({
      status: "Successfully delete the massage.",
      data: deleteMassage,
    });
  } catch (error) {
    return NextResponse.json({
      status: "Fail! Internal Error",
      data: error.toString(),
    });
  }
}
