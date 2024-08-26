import ConnectDB from "@/app/db/Connect";
import Header from "@/app/models/Header";

import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    await ConnectDB();
    const body = await req.json();

    const {
      name,
      animatedText,
      description,
      subHeading,
      github,
      linkedIn,
      instagram,
      facebook,
      image,
      cv,
    } = body.formData;

    if (!name || !animatedText || !description || !subHeading) {
      return NextResponse.json({
        success: false,
        message: "please fill all these fields",
      });
    }

    const newHeader = await Header.create({
      name,
      animatedText,
      description,
      subHeading,
      github,
      linkedIn,
      instagram,
      facebook,
      image,
      cv,
    });

    if (newHeader) {
      return NextResponse.json({
        success: true,
        message: "Data saved successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Data not saved successfully",
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
