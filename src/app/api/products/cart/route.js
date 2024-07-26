import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Add Cart Item
export async function POST(req) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    let createCartItem = await prisma.product_carts.create({
      data: reqBody,
    });

    return NextResponse.json({
      status: "Successfully Product add to cart.",
      data: createCartItem,
    });
  } catch (error) {
    return NextResponse.json({
      status: "Fail! Internal Error.",
      data: error.toString(),
    });
  }
}

// Delete Cart Item
export async function DELETE(req) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    let deleteCartItem = await prisma.product_carts.deleteMany({
      where: reqBody,
    });

    return NextResponse.json({
      status: "Product Removed",
      data: deleteCartItem,
    });
  } catch (error) {
    return NextResponse.json({
      status: "Fail! Internal Error.",
      data: error.toString(),
    });
  }
}

// Update Cart Item
export async function PATCH(req) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    let UpdateCartItem = await prisma.product_carts.updateMany({
      where: { user_id: reqBody["user_id"], status: "pending" },
      data: {
        status: "ordered",
      },
    });

    return NextResponse.json({
      status: "Order Confirmed.",
      data: UpdateCartItem,
    });
  } catch (error) {
    return NextResponse.json({
      status: "Fail! Internal Error.",
      data: error.toString(),
    });
  }
}
