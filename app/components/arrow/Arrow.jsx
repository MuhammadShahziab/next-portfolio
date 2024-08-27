"use client";
import { ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const Arrow = () => {
  const [showArrow, setShowArrow] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 600) {
      setShowArrow(true);
    } else {
      setShowArrow(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      onClick={scrollToTop}
      className={`${
        showArrow
          ? " cursor-pointer group text-white bg-orange   hover:border-none  transition  rounded-full w-11 h-11 flex justify-center items-center fixed z-10 md:right-10 right-3 bottom-20 "
          : "hidden"
      }  `}
    >
      <span className="animate-bounce">
        {" "}
        <ArrowUp></ArrowUp>
      </span>{" "}
    </div>
  );
};

export default Arrow;
