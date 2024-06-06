"use client";
import React, { useEffect, useState } from "react";
import ProfileImg from "../profileImg/ProfileImg";
import { IoReorderThreeOutline } from "react-icons/io5";
import CategoryList from "../categoryList/CategoryList";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [open, setOpen] = useState(false);

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

  const toggleOpenState = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="flex fixed top-0 left-0 right-0 z-10 justify-between px-8 md:px-12 py-2 items-center bg-gray-50 ">
        <span className=" text-black md:hidden" onClick={toggleOpenState}>
          {open ? <IoMdClose size={40} /> : <IoReorderThreeOutline size={40} />}
        </span>{" "}
        <h2 className="font-semibold text-[16px]  md:text-[25px] mb-2 text-orange  italic ">
          <span className=" md:text-[40px] text-[20px]    font-bold">p</span>
          <span className="max-md:hidden">orfolio</span>{" "}
        </h2>
        <div>
          <ProfileImg />
        </div>
      </nav>
      <CategoryList open={open} setOpen={setOpen} />
    </>
  );
};

export default Navbar;
