import ConnectDB from "@/app/db/Connect";
import Project from "@/app/models/Project";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    await ConnectDB();

    const body = await req.json();
    const { name, category, description, image, link, github } = body.formData;

    const newpProject = await Project.create({
      name,
      category,
      description,
      image,
      link,
      github,
    });

    if (newpProject) {
      return NextResponse.json({
        success: true,
        message: "Project save Successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Project Failed ",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Server Error",
    });
  }
}
