"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Loading from "@/app/components/admin-view/Loading";
import axios from "axios";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";
import Button from "@/app/components/admin-view/button/Button";
import { Eye, EyeOff } from "lucide-react";
const ProfilePage = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [isChangePass, setIsChangePass] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { data: session } = useSession();

  const currentUser = session?.user;
  useEffect(() => {
    if (currentUser) {
      setPageLoading(false);
      setImage(currentUser?.profileImage || "/assets/login/person.png");
    }
  }, [currentUser]);

  useEffect(() => {
    if (!isChangePass) {
      setPassword("");
      setNewPassword("");
    }
  }, [isChangePass]);

  const uploadImg = async (value) => {
    try {
      if (!value) {
        console.log("No file selected");
        return;
      }
      setImageLoading(true);
      const formData = new FormData();
      formData.append("file", value);
      formData.append("upload_preset", "msportfolio");

      const uploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/msworlddev/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!uploadResponse.ok) {
        toast.error("Failed to upload image");
      }

      const uploadedImageData = await uploadResponse.json();
      const imgUrl = uploadedImageData.secure_url;
      if (imgUrl) {
        setImageLoading(false);
        setImage(imgUrl);
      }
    } catch (error) {}
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setFormLoading(true);

      if ((password && !newPassword) || (newPassword && !password)) {
        if (password && !newPassword) {
          return toast.error("Please provide the new password.");
        } else if (newPassword && !password) {
          return toast.error("Please provide the current password.");
        }
      }

      const { data } = await axios.post(
        "/api/register/update",
        { email: currentUser?.email, Image: image, password, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data?.success) {
        toast.success(data?.message);
        window.location.reload();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the profile.");
    } finally {
      setFormLoading(false);
    }
  };

  return pageLoading ? (
    <Loading></Loading>
  ) : (
    <section className=" w-full  padding max-container  flex flex-col items-center ">
      {imageLoading ? (
        <div className="rounded-full  lg:w-36  w-28 h-28 lg:h-36 max-lg:mt-8 bg-gray-50 animate-pulse"></div>
      ) : (
        <label htmlFor="profile" className=" max-lg:mt-8 cursor-pointer">
          <img
            src={image}
            className="rounded-full shadow-lg lg:w-36 w-28 h-28 lg:h-36 object-cover"
            alt="profile"
          />
        </label>
      )}

      <input
        id="profile"
        type="file"
        name="Image"
        onChange={(e) => uploadImg(e.target.files[0])}
        className="focus:border-orange hidden w-full"
      />
      <form
        onSubmit={handleUpdate}
        className=" w-[450px] max-md:w-full flex flex-col gap-y-3  "
      >
        <div className="mainInput">
          <label className="text-gray-400">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="email"
            value={currentUser?.email}
            disabled
            placeholder="Insert your Email Address"
          ></input>
        </div>
        {isChangePass && (
          <>
            {" "}
            <div className="mainInput relative">
              <label className="text-gray-400">
                Passward <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Insert your old Passward"
              ></input>
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 md:top-10 top-9 cursor-pointer text-sm  text-softtext"
              >
                {showPassword ? <Eye size={17} /> : <EyeOff size={17} />}
              </span>
            </div>
            <div className="mainInput relative">
              <label className="text-gray-400">
                New Passward <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Insert your new Passward"
              ></input>
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 md:top-10 top-9 cursor-pointer text-sm  text-softtext"
              >
                {showPassword ? <Eye size={17} /> : <EyeOff size={17} />}
              </span>
            </div>
          </>
        )}

        <div
          onClick={() => setIsChangePass((prev) => !prev)}
          className="flex justify-end items-start lg:text-sm text-[12px] leading-4 text-red-400 cursor-pointer"
        >
          {isChangePass ? "No Need ?" : "Change Password ?"}
        </div>

        <div className="flex justify-center ">
          <button
            type="submit"
            disabled={formLoading}
            className="bg-orange text-white rounded-full shadow-md py-2 px-12 text-lg   flex justify-center gap-x-2 items-center"
          >
            Update {formLoading && <HashLoader color="#ffffff" size={20} />}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProfilePage;
