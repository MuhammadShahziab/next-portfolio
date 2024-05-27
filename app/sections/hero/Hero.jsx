"use client";
import { IoIosSend } from "react-icons/io";
import { IoDownloadOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import Typewriter from "typewriter-effect";
import Button from "@/app/components/button/Button";
import Social_icons from "@/app/components/socialIcons/Social_icons";
import Image from "next/image";
import {
  desVariants,
  imageVariant,
  tagVariants,
  tittleVariants,
} from "@/app/(services)/animation/animation";
import Link from "next/link";

const Hero = ({ heroData }) => {
  const { name, animatedText, description, subHeading, image, cv } =
    heroData[0];
  const animate = animatedText.split(",");

  return (
    <section
      id="home"
      className="w-full relative padding-y max-sm:py-2 padding-x 
       sm:h-[90vh] bg-offwhite "
    >
      <div
        className="flex lg:gap-x-52 2xl:justify-between  max-md:flex-col-reverse max-md:gap-6 max-container
           mt-7"
      >
        <div className="flex flex-col max-w-[600px] 2xl:w-full   xl:mx-0 justify-center ">
          <motion.div
            initial="offscreen"
            whileInView={"onscreen"}
            variants={tagVariants}
            className=" text-sm mb-0  text-capitalize tracking-[4px] font-semibold text-orange"
          >
            {subHeading}
          </motion.div>
          <motion.h1
            initial="offscreen"
            whileInView={"onscreen"}
            variants={tittleVariants}
            className="max-sm:text-[65px] mb-0  mt-1 font-bold flex-wrap text-black max-sm:leading-[72px] text-[54px]  "
          >
            Hi, I&apos;m <span className="text-orange capitalize">{name}</span>
          </motion.h1>
          <motion.h3
            initial="offscreen"
            whileInView={"onscreen"}
            variants={tittleVariants}
            className=" text-xl max-sm:text-black max-sm:text-[18px]  tracking-[2px] text-orange font-semibold mb-2  max-sm:py-1 "
          >
            <Typewriter
              options={{
                strings: animate,
                autoStart: true,
                loop: true,
              }}
            />
          </motion.h3>

          <motion.p
            initial="offscreen"
            whileInView={"onscreen"}
            variants={desVariants}
            className="text-softtext text-[20px] flex-wrap sm:text-md leading-7 md:text-leading-normal sm:max-w-md  "
          >
            {description}
          </motion.p>
          <motion.div
            initial="offscreen"
            whileInView={"onscreen"}
            variants={tittleVariants}
            className="flex items-center gap-6 mt-4 sm:mt-6"
          >
            <Button
              label="Contact Me"
              bg="orange"
              icon={<IoIosSend />}
              link="#contact"
            />
            {cv && <Button label="Download Cv" icon={<IoDownloadOutline />} />}
          </motion.div>
          <div className=" md:flex hidden mt-5 sm:mt-8">
            <Social_icons color="black"></Social_icons>
          </div>
        </div>
        <div className="  2xl:w-full flex justify-center items-center">
          <motion.div
            initial="offscreen"
            whileInView={"onscreen"}
            variants={imageVariant}
            className=" flex relative justify-center w-[220px] h-[220px] lg:w-[300px] lg:h-[300px] 2xl:w-[380px]  2xl:h-[380px] items-center  flex-wrap"
          >
            <Link href={`${process.env.NEXT_PUBLIC_API_URL}/dashboard`}>
              {" "}
              <Image
                src={image}
                className="border  animate_image"
                alt="banner"
                layout="fill"
                objectFit="contain"
              />
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="hidden md:flex absolute left-2/4 bottom-[-30px] animate-bounce">
        <IoIosArrowDown className="text-2xl text-orange"></IoIosArrowDown>
      </div>
    </section>
  );
};

export default Hero;
