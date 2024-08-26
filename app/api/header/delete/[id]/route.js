import ConnectDB from "@/app/db/Connect";
import Header from "@/app/models/Header";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const id = params.id;

  try {
    await ConnectDB();

    await Header.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Deleted!",
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};
