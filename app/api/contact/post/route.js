import ConnectDB from "@/app/db/Connect";
import Contact from "@/app/models/Contact";

import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    await ConnectDB();
    const body = await req.json();

    const { name, email, address, dob, phone, twitter } = body.formData;

    if (!name || !email || !address || !dob || !phone) {
      return NextResponse.json({
        success: false,
        message: "please fill all these fields",
      });
    }

    const newContact = await Contact.create({
      name,
      email,
      address,
      dob,
      phone,
      twitter,
    });

    if (newContact) {
      return NextResponse.json({
        success: true,
        message: "saved successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: " Not saved successfully",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Server Error check",
      status: 500,
    });
  }
}
