import ConnectDB from "@/app/db/Connect";
import Project from "@/app/models/Project";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await ConnectDB();
    const projects = await Project.find({});
    if (projects) {
      return NextResponse.json({
        success: true,
        data: projects,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "projects not found",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Projects Server Error",
      status: 500,
    });
  }
}
