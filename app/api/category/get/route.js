import ConnectDB from "@/app/db/Connect";
import Category from "@/app/models/Category";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await ConnectDB();

    const categories = await Category.find({});
    if (categories) {
      return NextResponse.json({
        success: true,
        data: categories,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 500,
    });
  }
};
