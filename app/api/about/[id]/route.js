import ConnectDB from "@/app/db/Connect";
import About from "@/app/models/About";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const id = params.id;

  try {
    await ConnectDB();
    const about = await About.findById(id);
    if (about) {
      return NextResponse.json({
        success: true,
        data: about,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Not found",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
      status: 500,
    });
  }
}
