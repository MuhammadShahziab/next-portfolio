import ConnectDB from "@/app/db/Connect";
import Category from "@/app/models/Category";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const data = await req.json();
  try {
    await ConnectDB();
    const existingCategory = await Category.find({ category: data.formData });
    if (existingCategory.length > 0) {
      return NextResponse.json({
        success: false,
        message: "Already Exist !",
        status: 500,
      });
    } else {
      const newCategory = await Category.create({ category: data.formData });
      if (newCategory) {
        return NextResponse.json({
          success: true,
          message: "Add Category",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Category Failed",
        });
      }
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error",
    });
  }
};
