"use client";
// import { menu } from "@/constants";
import { menu } from "../../constants";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  containerVariantsView,
  leftToRight,
} from "@/app/(services)/animation/animation";
const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const path = usePathname();

  const getPath = path.split("/");

  const icons = menu.map((item, index) => {
    if (index === 0 || index === 4) {
      return item.icon;
    }
    return null;
  });

  const filteredIcons = icons.filter((icon) => icon !== null);

  const iconLinkPairs = [
    { icon: filteredIcons[0], label: "Home", href: "/" },
    { icon: filteredIcons[1], label: "projects", href: "projects" },
  ];

  return (
    <header className="padding-x z-20 py-4 leading-8 w-full lg:fixed lg:top-0 lg:left-0 fixed bottom-0 h-16 left-0 bg-offwhite ">
      <nav className="flex justify-between  items-center z-10 max-container">
        <motion.h2
          initial="offscreen"
          whileInView={"onscreen"}
          variants={leftToRight}
          className="font-semibold text-[16px]  md:text-[25px] mb-2 text-orange  italic "
        >
          <span className=" md:text-[40px] text-[20px]    font-bold">p</span>
          <span className="max-md:hidden">orfolio</span>{" "}
        </motion.h2>
        <div
          className={`max-lg:bg-white z-10 max-lg:shadow-3xl max-lg:fixed max-lg:bottom-0 ${
            openMenu ? "block " : "max-lg:hidden"
          } transition  left-0 max-lg:w-full max-lg:pt-8 px-6 max-lg:pb-16 max-lg:rounded-tl-xl max-lg:rounded-tr-xl`}
        >
          {getPath[1] !== "projects" ? (
            <ul
              className={`flex gap-9 items-center max-lg:grid grid-cols-3 sm:text-center `}
            >
              {menu?.map((item, index) => (
                <motion.li
                  initial="offscreen"
                  whileInView={"onscreen"}
                  variants={containerVariantsView((index + 1) * 0.1)}
                  onClick={() => setOpenMenu(false)}
                  key={index}
                  className="flex flex-col gap-3 items-center "
                >
                  <Link
                    href={item.href}
                    className={` ${
                      getPath[1] === "projects"
                        ? "text-orange border-b border-orange"
                        : ""
                    }   font-medium lg:text-base flex flex-col items-center justify-center`}
                  >
                    <label className="text-3xl text-orange lg:hidden">
                      {item.icon}
                    </label>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          ) : (
            <ul className="flex gap-10 items-center justify-center">
              {iconLinkPairs.map((item, index) => {
                return (
                  <li
                    onClick={() => setOpenMenu(false)}
                    className="flex flex-col gap-3 items-center"
                    key={index}
                  >
                    <Link
                      href={item.href}
                      className={` ${
                        getPath[1] === item.label
                          ? "text-orange  md:border-b-2 pb-[3px]  border-orange"
                          : ""
                      } font-semibold lg:text-base capitalize 2xl:text-2xl flex items-center justify-center flex-col`}
                    >
                      <label className="text-3xl text-orange lg:hidden ">
                        {item.icon}
                      </label>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          <IoMdClose
            className="absolute bottom-4 right-7 lg:hidden"
            size={25}
            onClick={() => setOpenMenu(!openMenu)}
          />
        </div>
        <div className="lg:hidden">
          <AiOutlineAppstore
            size={25}
            onClick={() => setOpenMenu(!openMenu)}
            className="lg:hidden cursor-pointer"
          ></AiOutlineAppstore>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
