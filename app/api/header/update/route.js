import ConnectDB from "@/app/db/Connect";
import Header from "@/app/models/Header";
import { NextResponse } from "next/server";

export const PUT = async (req, res) => {
  try {
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
      _id,
    } = body.formData;

    await ConnectDB();

    const updateData = await Header.findByIdAndUpdate(
      { _id: _id },
      {
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
      },
      {
        new: true,
      }
    );

    if (updateData) {
      return NextResponse.json({
        success: true,
        message: "Updated!",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Try Again",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
