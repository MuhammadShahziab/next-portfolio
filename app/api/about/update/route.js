import ConnectDB from "@/app/db/Connect";
import About from "@/app/models/About";
import { NextResponse } from "next/server";

export async function PUT(req, res) {
  try {
    await ConnectDB();
    const { formData } = await req.json();
    const _id = formData._id;

    const updateAbout = await About.findByIdAndUpdate({ _id: _id }, formData);
    if (updateAbout) {
      return NextResponse.json({
        success: true,
        message: " updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        error: "Failed to update . ",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Updated failed server error !",
      status: 500,
    });
  }
}
