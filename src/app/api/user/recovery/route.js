import { SendMailer } from "@/src/utils/emailHelper";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

//Send OTP Route
export async function POST(req) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    let findUser = await prisma.users.findUnique({
      where: reqBody,
    });

    if (findUser === null) {
      return NextResponse.json({
        status: "Invaild email!",
      });
    } else {
      let code = Math.floor(100000 + Math.random() * 900000);
      let updateOtp = await prisma.users.update(
        {
          where: reqBody,
          data: {
            otp: code.toString(),
          },
        },
        { status: 200, headers: { email: reqBody["email"] } },
      );

      //Send Mail
      let toEmail = reqBody["email"];
      let subject = "6 Digit OTP has been send";
      let text = `Your OTP is ${code}`;
      SendMailer(toEmail, subject, text);

      return NextResponse.json({
        status: "6 Digit OTP send",
        data: updateOtp,
      });
    }
  } catch (e) {
    return NextResponse.next({
      status: "Data Fatchng Fail.",
      data: e.toString(),
    });
  }
}

//Verify OTP Route
export async function PUT(req) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    let findUser = await prisma.users.count({
      where: { email: reqBody["email"], otp: reqBody["otp"] },
    });

    if (findUser === 0) {
      return NextResponse.json({
        status: "Invaild OTP!",
      });
    } else {
      return NextResponse.json({
        status: "OTP Verify Success",
        data: findUser,
      });
    }
  } catch (e) {
    return NextResponse.next({
      status: "Data Fatchng Fail.",
      data: e.toString(),
    });
  }
}
//Reset Password
export async function PATCH(req) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    let findUser = await prisma.users.count({
      where: { email: reqBody["email"] },
    });

    let checkPassword = () => {
      if (reqBody["newPassword"] === reqBody["confirmPassword"]) {
        return reqBody["newPassword"];
      } else {
        return "0";
      }
    };
    let password = checkPassword();

    if (findUser === null) {
      return NextResponse.json({ status: "Invaild User!" });
    } else if (password === "0") {
      return NextResponse.json({ status: "Passwor dosn't match!" });
    } else {
      let resetPassword = await prisma.users.update({
        where: { email: reqBody["email"] },
        data: { password: password, otp: "0" },
      });
      return NextResponse.json({
        status: "Successfully Reset Password.",
        data: resetPassword,
      });
    }
  } catch (e) {
    return NextResponse.next({
      status: "Data Fatchng Fail.",
      data: e.toString(),
    });
  }
}
