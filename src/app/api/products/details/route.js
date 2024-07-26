import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Create Brands
export async function POST(req) {
  try {
    let prisma = new PrismaClient();
    let reqBody = await req.json();

    let createProductDetails = await prisma.product_details.createMany({
      data: reqBody,
    });
    return NextResponse.json({
      status: "Successfully Add Product Details",
      data: createProductDetails,
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
    const updateProductDetails = await prisma.product_details.update({
      where: { id: reqBody["id"] },
      data: {
        img1: reqBody["img1"],
        img2: reqBody["img2"],
        img3: reqBody["img3"],
        des: reqBody["des"],
        color: reqBody["color"],
        size: reqBody["size"],
        product_id: reqBody["product_id"],
      },
    });
    return NextResponse.json({
      status: "Successfully Update Product Details.",
      data: updateProductDetails,
    });
  } catch (error) {
    return NextResponse.json({
      status: "Fail! Internal Error.",
      data: error.toString(),
    });
  }
}
