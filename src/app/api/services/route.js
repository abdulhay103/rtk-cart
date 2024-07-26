import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

//Create Service
export async function POST(req) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();

    let createService = await prisma.services.createMany({ data: reqBody });
    return NextResponse.json({
      status: "Successfully Create Service",
      data: createService,
    });
  } catch (e) {
    return NextResponse.json({
      status: "Internal Error!!",
      data: e.toString(),
    });
  }
}

// Update Service
export async function PATCH(req) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    let updateService = await prisma.services.update({
      where: { id: reqBody["id"] },
      data: {
        title: reqBody["title"],
        subTitle: reqBody["subTitle"],
        shortDetails: reqBody["shortDetails"],
        featuredImg: reqBody["featuredImg"],
        fullImg: reqBody["fullImg"],
        details: reqBody["details"],
      },
    });

    return NextResponse.json({
      status: "Successfully Update Service",
      data: updateService,
    });
  } catch (e) {
    return NextResponse.json({
      status: "Internal Error!",
      data: e.toString(),
    });
  }
}
// Delete Service
export async function DELETE(req) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    let deleteService = await prisma.services.delete({
      where: { id: reqBody["id"] },
    });

    return NextResponse.json({
      status: "Successfully Delete Service",
      data: deleteService,
    });
  } catch (e) {
    return NextResponse.json({
      status: "Internal Error!",
      data: e.toString(),
    });
  }
}
