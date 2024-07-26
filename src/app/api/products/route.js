import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Create Product
export async function POST(req) {
  try {
    let prisma = new PrismaClient();
    let reqBody = await req.json();

    let createProduct = await prisma.products.create({
      data: {
        title: reqBody["title"],
        short_des: reqBody["short_des"],
        price: reqBody["price"],
        discount: reqBody["discount"],
        discount_price: reqBody["discount_price"],
        image: reqBody["image"],
        stock: reqBody["stock"],
        star: reqBody["star"],
        productCat_id: reqBody["productCat_id"],
        brand_id: reqBody["brand_id"],
        remark: reqBody["remark"],
        product_details: {
          create: {
            img1: reqBody["img1"],
            img2: reqBody["img2"],
            img3: reqBody["img3"],
            des: reqBody["des"],
            color: reqBody["color"],
            size: reqBody["size"],
          },
        },
      },
    });
    return NextResponse.json({
      status: "Successfully Create Product",
      data: createProduct,
    });
  } catch (e) {
    return NextResponse.json({
      status: "Fail! Internal Error.",
      data: e.toString(),
    });
  }
}

// Update Product
export async function PATCH(req) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    const updateProduct = await prisma.products.update({
      where: { id: reqBody["id"] },
      data: {
        title: reqBody["title"],
        short_des: reqBody["short_des"],
        price: reqBody["price"],
        discount: reqBody["discount"],
        discount_price: reqBody["discount_price"],
        image: reqBody["image"],
        stock: reqBody["stock"],
        star: reqBody["star"],
        productCat_id: reqBody["productCat_id"],
        brand_id: reqBody["brand_id"],
        remark: reqBody["remark"],
        product_details: {
          update: {
            img1: reqBody["img1"],
            img2: reqBody["img2"],
            img3: reqBody["img3"],
            des: reqBody["des"],
            color: reqBody["color"],
            size: reqBody["size"],
          },
        },
      },
    });
    return NextResponse.json({
      status: "Successfully Update Product",
      data: updateProduct,
    });
  } catch (error) {
    return NextResponse.json({
      status: "Fail! Internal Error.",
      data: error.toString(),
    });
  }
}
