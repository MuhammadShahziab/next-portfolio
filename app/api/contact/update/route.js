import ConnectDB from "@/app/db/Connect";
import Contact from "@/app/models/Contact";
import { NextResponse } from "next/server";

export const PUT = async (req, res) => {
  try {
    const body = await req.json();
    const { name, email, address, dob, phone, _id, twitter } = body.formData;

    await ConnectDB();

    const updateData = await Contact.findByIdAndUpdate(
      { _id: _id },
      {
        name,
        email,
        address,
        dob,
        phone,
        twitter,
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
        status: 500,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
