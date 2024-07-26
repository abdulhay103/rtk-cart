import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    let prisma = new PrismaClient();
    let reqBody = await req.json();

    let createCategory = await prisma.product_catagories.createMany({
      data: reqBody,
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
    const updateCategory = await prisma.product_catagories.update({
      where: { id: reqBody["id"] },
      data: {
        categoryName: reqBody["categoryName"],
        categoryImg: reqBody["categoryImg"],
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
