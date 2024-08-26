"use client";
import React, { useEffect, useState } from "react";

import { IoReorderThreeOutline } from "react-icons/io5";
import CategoryList from "../categoryList/CategoryList";
import { IoMdClose } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { data: session } = useSession();
  const currentUser = session?.user;

  const handleResize = () => {
    setOpen(window.innerWidth >= 768); // Assuming medium screen size is 768px
  };
  useEffect(() => {
    // Set initial state on component mount
    handleResize();

    // Add event listener to window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
  }, []); // Only run effect once on component mount

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.log(error);
    }
  };
  const toggleOpenState = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="flex fixed top-0 left-0 right-0 z-10 justify-between px-4 md:px-7  max-lg:py-2 py-1 items-center bg-offwhite  ">
        <span className=" text-black md:hidden" onClick={toggleOpenState}>
          {open ? <IoMdClose size={27} /> : <IoReorderThreeOutline size={27} />}
        </span>{" "}
        <Link href="/">
          <h2 className="font-semibold text-[16px] relative text-orange">
            <span className="md:text-[35px] text-[20px] bg-green-400 rounded-2xl h-6 px-1 text-white font-semibold">
              P
            </span>
            <span className="max-md:text-sm md:text-[23px] ml-1">ortfolio</span>
            <span className="h-2 w-2 rounded-full bg-green-400 absolute right-[-12px] animate-pulse top-1/2 lg:mt-1 "></span>
          </h2>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {" "}
            <Avatar className="w-11 h-11 overflow-hidden rounded-full">
              {currentUser?.profileImage ? (
                <AvatarImage
                  src={currentUser.profileImage}
                  className="object-cover w-full h-full"
                  alt="Profile Image"
                />
              ) : (
                <AvatarFallback className="capitalize text-xl">
                  {currentUser?.email.charAt(0)}
                </AvatarFallback>
              )}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/dashboard/profile">
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <CategoryList open={open} setOpen={setOpen} />
    </>
  );
};

export default Navbar;
