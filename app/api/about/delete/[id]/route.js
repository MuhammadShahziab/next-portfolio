import ConnectDB from "@/app/db/Connect";
import About from "@/app/models/About";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const id = params.id;
  try {
    await ConnectDB();
    const deleteAbout = await About.findByIdAndDelete(id);
    if (deleteAbout) {
      return NextResponse.json({
        message: "Deleted",
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "Not Deleted",
        success: false,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Server About Deleted Error",
      success: false,
      status: 500,
    });
  }
}
