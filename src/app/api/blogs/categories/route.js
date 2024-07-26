import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  let headerList = headers();
  let id = parseInt(headerList.get("id"));

  try {
    let prisma = new PrismaClient();
    let reqBody = await req.json();

    let createCategory = await prisma.blog_catagories.createMany({
      data: {
        title: reqBody["title"],
        desc: reqBody["desc"],
        usersId: id,
      },
    });
    return NextResponse.json({
      status: "Successfully Create Category",
      data: createCategory,
    });
  } catch (e) {
    return NextResponse.json({
      status: "Fail! Internal Error.",
      data: e.toString(),
    });
  }
}

// Get All Categories
export async function PATCH(req) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    const updateCategory = await prisma.blog_catagories.update({
      where: { id: reqBody["id"] },
      data: {
        title: reqBody["title"],
        desc: reqBody["desc"],
      },
    });
    return NextResponse.json({
      status: "Successfully Update category.",
      data: updateCategory,
    });
  } catch (error) {
    return NextResponse.json({
      status: "Fail! Internal Error.",
      data: error.toString(),
    });
  }
}
