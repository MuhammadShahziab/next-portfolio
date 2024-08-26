import ConnectDB from "@/app/db/Connect";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { email, Image, password, newPassword } = body;
    await ConnectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
        status: 404,
      });
    }

    if (!password || !newPassword) {
      user.Image = Image || user.Image;
      await user.save();
    }

    if (password && newPassword) {
      const isMatch = await bcrypt.compare(password, user?.password);
      if (!isMatch) {
        return NextResponse.json({
          message: "incorrect password",
          success: false,
          status: 401,
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 8);

      user.password = hashedPassword;
      user.Image = Image || user.Image;
      await user.save();
    }

    return NextResponse.json({
      message: "Profile Updated",
      status: 200,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Failed to update user",
      status: 500,
      success: false,
    });
  }
};
