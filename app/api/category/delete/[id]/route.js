import ConnectDB from "@/app/db/Connect";
import Category from "@/app/models/Category";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const id = params.id;

  try {
    await ConnectDB();

    const deleteCategory = await Category.findByIdAndDelete({ _id: id });

    if (deleteCategory) {
      return NextResponse.json({
        success: true,
        message: "Category Deleted",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Deleted failed",
    });
  }
};
