import ConnectDB from "@/app/db/Connect";
import Project from "@/app/models/Project";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    await ConnectDB();
    const body = await req.json();
    const { name, image, category, description, link, github, _id } =
      body.formData;

    const updateProject = await Project.findByIdAndUpdate(
      { _id: _id },
      { name, image, category, description, link, github },
      { new: true }
    );

    if (updateProject) {
      return NextResponse.json({
        success: true,
        message: "Project updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        error: "Failed to update project. Project not found.",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Updated failed server error !",
    });
  }
}
