"use client";
import Button from "../button/Button";

import { motion } from "framer-motion";

import {
  containerVariantsView,
  tittleVariants,
} from "@/app/(services)/animation/animation";
import { Socialicons } from "@/app/constants";
import Link from "next/link";
import Social_icons from "../socialIcons/Social_icons";

const Footer = ({ heroData }) => {
  const { github, linkedIn, instagram, facebook } = heroData[0];

  const iconsLinks = [github, linkedIn, instagram, facebook];

  return (
    <footer className="max-md:pb-16 max-xl:max-container ">
      <div className="bg-offwhite flex flex-col justify-center items-center gap-y-4 py-10 text-center shadow-md">
        <motion.h1
          initial="offscreen"
          whileInView={"onscreen"}
          variants={tittleVariants}
          className="md:text-2xl text-xl px-7  font-bold text-center max-w-[500px] text-black/80 mx-auto max-container"
        >
          Prepared to turn your ideas into reality? I&apos;m here to help.
        </motion.h1>
        <Button label="Contact Me" bg="orange" link="#contact"></Button>
      </div>
      <div className="bg-black/80 flex flex-col justify-center items-center gap-y-4 py-10 text-center ">
        <div className="flex gap-x-4 items-center  max-w-[400px]">
          <Social_icons color="white" iconsLinks={iconsLinks}></Social_icons>
        </div>
        <motion.label
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 2,
            type: "spring",
          }}
          className="text-white text-sm"
        >
          Copyright Shahzaib. All rights reserved.
        </motion.label>
      </div>
    </footer>
  );
};

export default Footer;
