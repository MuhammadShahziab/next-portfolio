import ConnectDB from "@/app/db/Connect";
import Project from "@/app/models/Project";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const id = params.id;
  try {
    await ConnectDB();
    const deleteProject = await Project.findByIdAndDelete(id);
    if (deleteProject) {
      return NextResponse.json({
        message: "Project Deleted",
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "Project not Deleted",
        success: false,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Server Project Deleted Error",
      success: false,
      status: 500,
    });
  }
}
