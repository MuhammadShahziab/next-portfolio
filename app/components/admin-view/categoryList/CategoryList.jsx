"use client";
import { adminMenu } from "@/app/constants";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaS } from "react-icons/fa6";

const CategoryList = ({ open, setOpen }) => {
  const [dropdown, setDropDown] = useState(false);

  const router = usePathname();
  const fullPath = router;
  const path =
    router.split("/")[2] || router.split("/")[2] || router.split("/")[3];

  const handlecloseSidebar = () => {
    if (window.innerWidth <= 768) {
      setOpen(false);
    }
    setDropDown(false);
  };

  return (
    <div
      className={` transition duration-500 h-screen z-10 fixed top-14  w-[230px] 2xl:w-[330px] bg-offwhite flex flex-col gap-y-2  text-black py-6 px-4 ${
        open ? "" : "-translate-x-60"
      } `}
    >
      {adminMenu?.map((item, index) => (
        <div key={index}>
          {item.label === "about" ? (
            <div>
              <div
                onClick={() => setDropDown((pre) => !pre)}
                className={`${
                  path === item.label
                    ? "bg-orange text-white"
                    : "hover:bg-orange hover:text-white"
                }  py-2 cursor-pointer font-semibold w-full text-black text-md group capitalize rounded-md px-3 flex items-center z-10 relative justify-between`}
              >
                <div className="flex items-center gap-x-3">
                  <span
                    className={`${
                      path === item.label
                        ? "text-white"
                        : "text-orange group-hover:text-white"
                    } `}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </div>
                <span>
                  {dropdown ? (
                    <ChevronUp size={21} strokeWidth={1.8} />
                  ) : (
                    <ChevronDown size={21} strokeWidth={1.8} />
                  )}
                </span>
              </div>

              <div
                className={`${
                  dropdown
                    ? "flex flex-col translate-y-0 transition duration-500  bg-gray-100 rounded relative "
                    : " -translate-y-8 absolute opacity-0 -z-10 "
                } mt-2 pb-2    `}
              >
                {item?.submenu?.map((subitem, subindex) => (
                  <Link
                    onClick={handlecloseSidebar}
                    className={` ${
                      fullPath === subitem.href
                        ? " bg-orange text-white"
                        : "hover:bg-orange  hover:text-white "
                    } py-2 cursor-pointer font-semibold w-full text-black text-md  capitalize rounded-md px-6 flex items-center gap-x-3  mb-2`}
                    href={subitem.href}
                    key={subindex}
                  >
                    {subitem.label}{" "}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              onClick={handlecloseSidebar}
              className={` ${
                path === item.label
                  ? "bg-orange text-white"
                  : "hover:bg-orange hover:text-white "
              } py-2 cursor-pointer font-semibold w-full text-black text-md group  capitalize rounded-md px-3 flex items-center gap-x-3`}
              href={item.href}
              key={index}
            >
              <span
                className={`${
                  path === item.label
                    ? "text-white"
                    : "text-orange  group-hover:text-white "
                } `}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
