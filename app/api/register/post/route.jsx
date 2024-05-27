import ConnectDB from "@/app/db/Connect";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
export const POST = async (req) => {
  try {
    await ConnectDB();
    const { formData } = await req.json();
    const { email, password } = formData;
    // Check if password is empty or less than 5 characters
    if (!password || password.length < 5) {
      return NextResponse.json({
        success: false,
        message: "Password must be at least 5 characters",
        status: 400, // Bad Request status code
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "Email already exists ",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    if (user) {
      return NextResponse.json({
        success: true,
        message: "User created",
        data: user,
      });
    }
  } catch (err) {
    console.error(err);
    return new NextResponse.json({
      message: "Internal Server Error",
      success: false,
      status: 500,
    });
  }
};
