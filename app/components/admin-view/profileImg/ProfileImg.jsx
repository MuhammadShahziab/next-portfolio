"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
const ProfileImg = () => {
  const [open, setOpen] = useState(false);

  const handleCloseDropdown = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="flex items-center relative ">
      <Image
        src={"/assets/login/person.png"}
        width={50}
        height={50}
        alt="login"
        className="rounded-full object-contain cursor-pointer"
        onClick={handleCloseDropdown}
      ></Image>
      {open ? (
        <IoMdArrowDropup
          size={20}
          className="cursor-pointer"
          onClick={handleCloseDropdown}
        />
      ) : (
        <IoMdArrowDropdown
          size={20}
          className="cursor-pointer"
          onClick={handleCloseDropdown}
        />
      )}

      <div
        className={`${
          open
            ? "bg-white border rounded-md absolute top-14 -left-5  flex flex-col w-28 justify-center items-center"
            : "hidden"
        }  `}
      >
        <Link
          href={"/profile"}
          className=" w-full  hover:bg-slate-100 py-1 text-center border-b"
          onClick={handleCloseDropdown}
        >
          Profile
        </Link>
        <Link
          href={""}
          onClick={(e) => {
            e.preventDefault();
            signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_API_URL}/` });
          }}
          className=" w-full  hover:bg-slate-50 py-1 text-center "
        >
          Sign out
        </Link>
      </div>
    </div>
  );
};

export default ProfileImg;
