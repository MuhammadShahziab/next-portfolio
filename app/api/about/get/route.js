import ConnectDB from "@/app/db/Connect";
import About from "@/app/models/About";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await ConnectDB();
    const about = await About.find({});

    if (about) {
      return NextResponse.json({
        success: true,
        data: about,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "not found",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}
