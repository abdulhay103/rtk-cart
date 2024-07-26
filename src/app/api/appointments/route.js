import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Create Appointments Api
export async function POST(req) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    reqBody.status = "pending";
    let createAppointment = await prisma.appointments.create({ data: reqBody });
    return NextResponse.json({
      status: "Successfully create your appointment.",
      data: createAppointment,
    });
  } catch (error) {
    return NextResponse.json({
      status: "Fail! Internal Error",
      data: error.toString(),
    });
  }
}

//Update Appointments API
export async function PATCH(req) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    let updateAppointment = await prisma.appointments.update({
      where: {
        id: reqBody.id,
      },
      data: {
        status: reqBody.status,
      },
    });
    return NextResponse.json({
      status: "Appointment confirmed",
      data: updateAppointment,
    });
  } catch (error) {
    return NextResponse.json({
      status: "Fail! Internal Error",
      data: error.toString(),
    });
  }
}

//DELETE Appointment API
export async function DELETE(req) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();
    let deleteAppointment = await prisma.appointments.delete({
      where: reqBody,
    });
    return NextResponse.json({
      status: "Successfully delete the Appointment.",
      data: deleteAppointment,
    });
  } catch (error) {
    return NextResponse.json({
      status: "Fail! Internal Error",
      data: error.toString(),
    });
  }
}
