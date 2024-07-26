import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Update Cart Item
export async function PATCH(req) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    let updateOrder = await prisma.product_carts.update({
      where: { id: reqBody["id"] },
      data: {
        status: reqBody["status"],
      },
    });

    return NextResponse.json({
      status: "Successfully update Order.",
      data: updateOrder,
    });
  } catch (error) {
    return NextResponse.json({
      status: "Fail! Internal Error.",
      data: error.toString(),
    });
  }
}
