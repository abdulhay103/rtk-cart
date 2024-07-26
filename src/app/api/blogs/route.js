import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

//Create New Product
export async function POST(req) {
  let allHeader = headers();
  let userId = parseInt(allHeader.get("id"));
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    let data = {
      title: reqBody["title"],
      shortDesc: reqBody["shortDesc"],
      featuredImg: reqBody["featuredImg"],
      fullImg: reqBody["fullImg"],
      details: reqBody["details"],
      usersId: userId,
      blogCatsId: reqBody["blogCatsId"],
    };
    let createBlog = await prisma.blogs.create({
      data: data,
    });
    return NextResponse.json({
      status: "Successfully Create Blogs.",
      data: createBlog,
    });
  } catch (e) {
    return NextResponse.json({
      starus: "Internal Error!",
      data: e.toString(),
    });
  }
}

// Update Blog Details
export async function PATCH(req) {
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };

  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    const updateBlog = await prisma.blogs.update({
      where: { id: reqBody["postId"] },
      data: {
        title: reqBody["title"],
        shortDesc: reqBody["shortDesc"],
        featuredImg: reqBody["featuredImg"],
        fullImg: reqBody["fullImg"],
        details: reqBody["details"],
        blogCatsId: reqBody["blogCatsId"],
      },
    });
    return NextResponse.json({
      status: "Successfully Update Blog.",
      data: updateBlog,
    });
  } catch (error) {
    return NextResponse.json({
      status: "Fail! Internal Error.",
      data: error.toString(),
    });
  }
}

// Delete Blogs
export async function DELETE(req) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    let deleteBlog = await prisma.blogs.delete({
      where: { id: reqBody["id"] },
    });

    return NextResponse.json({
      status: "Successfully Delete Blogs",
      data: deleteBlog,
    });
  } catch (e) {
    return NextResponse.json({
      status: "Internal Error!",
      data: e.toString(),
    });
  }
}
