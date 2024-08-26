import ConnectDB from "@/app/db/Connect";
import Contact from "@/app/models/Contact";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await ConnectDB();

    const contact = await Contact.find({});
    if (contact) {
      return NextResponse.json({
        success: true,
        data: contact,
      });
    } else {
      return NextResponse.json(
        { message: "something went wrong !" },
        { success: false }
      );
    }
  } catch (error) {}
};
