"use client";
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
    <header className="padding-x z-20   w-full lg:fixed lg:top-0 lg:left-0 fixed bottom-0 h-14  left-0   bg-white/10 backdrop-blur-lg backdrop-saturate-150">
      <nav className="flex justify-between  items-center h-full z-10 max-container ">
        <Link href={"/"}>
          <motion.h2
            initial="offscreen"
            whileInView={"onscreen"}
            variants={leftToRight}
            className="font-semibold text-[16px] relative text-orange"
          >
            <span className="md:text-[35px] text-[20px] bg-green-400 rounded-2xl h-6 px-1 text-white font-semibold">
              P
            </span>
            <span className="max-md:text-sm md:text-[23px] ml-1">ortfolio</span>
            <span className="h-2 w-2 rounded-full bg-green-400 absolute right-[-12px] animate-pulse top-1/2 lg:mt-1 "></span>
          </motion.h2>
        </Link>

        <div
          className={`max-lg:bg-white z-50 max-lg:shadow-3xl max-lg:fixed max-lg:bottom-0 ${
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
                        ? "text-orange font-medium border-b border-orange"
                        : ""
                    }   text-sm lg:text-base gap-y-1 flex flex-col items-center justify-center`}
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
                    className="flex flex-col justify-center  gap-3 items-center"
                    key={index}
                  >
                    <Link
                      href={item.href}
                      className={` ${
                        getPath[1] === item.label
                          ? "text-orange font-medium  md:border-b-2   border-orange"
                          : ""
                      } text-sm lg:text-base capitalize 2xl:text-2xl flex items-center justify-center  flex-col`}
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
            className="absolute bottom-5 right-5 lg:hidden"
            size={20}
            onClick={() => setOpenMenu(!openMenu)}
          />
        </div>
        <div className="lg:hidden">
          <AiOutlineAppstore
            size={25}
            onClick={() => setOpenMenu(!openMenu)}
            className="absolute bottom-5 right-5 lg:hidden cursor-pointer"
          ></AiOutlineAppstore>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
