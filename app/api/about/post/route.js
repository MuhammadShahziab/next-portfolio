import ConnectDB from "@/app/db/Connect";
import About from "@/app/models/About";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { formData } = await req.json();

    await ConnectDB();

    const allAboutData = await About.find();

    const experienceExists = allAboutData.some(
      (item) => item.title === "experience"
    );
    const educationExists = allAboutData.some(
      (item) => item.title === "education"
    );

    // some methode return true or false value  . The some() method checks if any array elements pass a test (provided as a callback function).

    if (formData.title === "education" && educationExists) {
      return NextResponse.json({
        success: false,
        status: 500,
        message:
          "You already have education data saved. You can only edit this data.",
      });
    } else if (formData.title === "experience" && experienceExists) {
      return NextResponse.json({
        success: false,
        status: 500,
        message:
          "You already have experience data saved. You can only edit this data.",
      });
    } else if (experienceExists && educationExists) {
      return NextResponse.json({
        success: false,
        status: 500,
        message:
          "You already have both data saved. You can only edit both data.",
      });
    } else {
      const newAbout = await About.create(formData);
      if (newAbout) {
        return NextResponse.json({
          success: true,
          message: "Data successfully uploaded.",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to upload data.",
        });
      }
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "An error occurred while processing the request.",
      status: 500,
    });
  }
}
