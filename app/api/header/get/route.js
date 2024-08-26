import ConnectDB from "@/app/db/Connect";
import Header from "@/app/models/Header";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await ConnectDB();

    const header = await Header.find({});
    if (header) {
      return NextResponse.json({
        success: true,
        data: header,
      });
    } else {
      return NextResponse.json(
        { message: "something went wrong !" },
        { success: false }
      );
    }
  } catch (error) {
    console.log(error);
  }
};
