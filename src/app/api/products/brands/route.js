import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Create Brands
export async function POST(req) {
  try {
    let prisma = new PrismaClient();
    let reqBody = await req.json();

    let createBrand = await prisma.brands.createMany({
      data: reqBody,
    });
    return NextResponse.json({
      status: "Successfully Create Brand",
      data: createBrand,
    });
  } catch (e) {
    return NextResponse.json({
      status: "Fail! Internal Error.",
      data: e.toString(),
    });
  }
}

// Update Brands
export async function PATCH(req) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    const updateBrand = await prisma.brands.update({
      where: { id: reqBody["id"] },
      data: {
        brandName: reqBody["brandName"],
        brandImg: reqBody["brandImg"],
      },
    });
    return NextResponse.json({
      status: "Successfully Update Brand.",
      data: updateBrand,
    });
  } catch (error) {
    return NextResponse.json({
      status: "Fail! Internal Error.",
      data: error.toString(),
    });
  }
}
