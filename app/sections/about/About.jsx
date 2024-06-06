"use client";
import Image from "next/image";
import { useState } from "react";
import { FaBriefcase } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import { Cake, MailOpen, MapPin, PhoneCall, User } from "lucide-react";
import { motion } from "framer-motion";
import {
  desVariants,
  imageVariant,
  leftToRight,
  rightToLeft,
  tagVariants,
  tittleVariants,
} from "@/app/(services)/animation/animation";
const About = ({ aboutData, contactData }) => {
  const [activeBtn, setactiveBtn] = useState("personal");

  const { name, email, address, phone, dob } = contactData[0];
  const button = [
    {
      id: "personal",
      label: "Personal ",
    },
    {
      id: "qualification",
      label: "Qualification ",
    },
  ];

  const getdata = (arr, title) => {
    return arr.find((item) => item.title === title);
  };

  const handleBtnClick = (btn) => {
    setactiveBtn(btn);
  };

  return (
    <section className="h-100vh padding  max-container" id="about">
      <div className="flex flex-col justify-center items-center  relative">
        <motion.h1
          initial="offscreen"
          whileInView={"onscreen"}
          variants={tagVariants}
          className="section-title"
        >
          About Me
        </motion.h1>
        <motion.h5
          initial="offscreen"
          whileInView={"onscreen"}
          variants={tittleVariants}
          className="font-palanquin  font-bold   text-orange ms-5"
        >
          My intro
        </motion.h5>
      </div>

      <div className="flex justify-between max-md:flex-col mt-9">
        <div className="hidden lg:flex  flex-1 items-center ">
          <motion.div
            initial="offscreen"
            whileInView={"onscreen"}
            variants={imageVariant}
            className="w-[330px] h-[330px]  relative "
          >
            <Image
              src={"/assets/hero/developer.jpeg"}
              layout="fill"
              objectFit="contain"
              alt="logo"
              className="  animate_imagee rounded-2xl "
            ></Image>
          </motion.div>
        </div>
        <div
          className="flex-1 
       "
        >
          <div className="border border-indigo-100  w-full  p-1 flex justify-between rounded-3xl">
            {button?.map((btn) => {
              return (
                <button
                  key={btn.id}
                  className={`border-none flex-1 text-center capitalize cursor-pointer outline-none font-semibold rounded-3xl px-4 py-2 flex items-center justify-center transition-colors  max-md:gap-x-3   
    ${
      activeBtn === btn.id ? "bg-orange text-white  " : "text-black bg-white "
    }`}
                  onClick={() => handleBtnClick(btn.id)}
                >
                  {btn.label}

                  {/* Animation for active button */}
                  {activeBtn === btn.id && (
                    <span className="relative left-2  sm:left-4 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-50 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-offwhite"></span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {activeBtn === "personal" || activeBtn === "qualification" ? (
            <>
              {activeBtn === "personal" && (
                <div className="flex flex-col gap-8 mt-7">
                  <div>
                    <motion.h1
                      initial="offscreen"
                      whileInView={"onscreen"}
                      variants={tittleVariants}
                      className="font-bold  mb-3 text-black   text-2xl 2xl:text-3xl"
                    >
                      Unmatched Service Quality for Over 10 Years{" "}
                    </motion.h1>
                    <motion.p
                      initial="offscreen"
                      whileInView={"onscreen"}
                      variants={desVariants}
                      className="text-softtext  max-w-lg  2xl:max-w-xl 2xl:leading-7  leading-2 text-md 2xl:text-lg"
                    >
                      I specialize in crafting intuitive websites with
                      cutting-edge technology, delivering dynamic and engaging
                      user experience.
                    </motion.p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div
                      initial="offscreen"
                      whileInView={"onscreen"}
                      variants={desVariants}
                      className="flex gap-x-3 items-center"
                    >
                      <span className="text-orange  text-lg">
                        <User strokeWidth={2} />
                      </span>{" "}
                      <div className="text-black text-md 2xl:text-lg capitalize ">
                        {name}
                      </div>
                    </motion.div>
                    <motion.div
                      initial="offscreen"
                      whileInView={"onscreen"}
                      variants={desVariants}
                      className="flex gap-x-3 items-center"
                    >
                      <span className="text-orange ">
                        <MailOpen />
                      </span>{" "}
                      <div className="text-black text-md 2xl:text-lg  ">
                        {email}
                      </div>
                    </motion.div>
                    <motion.div
                      initial="offscreen"
                      whileInView={"onscreen"}
                      variants={desVariants}
                      className="flex gap-x-3 items-center"
                    >
                      <span className="text-orange ">
                        <PhoneCall />
                      </span>{" "}
                      <div className="text-black text-md 2xl:text-lg   ">
                        {phone}
                      </div>
                    </motion.div>
                    <motion.div
                      initial="offscreen"
                      whileInView={"onscreen"}
                      variants={desVariants}
                      className="flex gap-x-3 items-center"
                    >
                      <span className="text-orange ">
                        <Cake />
                      </span>{" "}
                      <div className="text-black text-md 2xl:text-lg  ">
                        {dob}
                      </div>
                    </motion.div>
                    <motion.div
                      initial="offscreen"
                      whileInView={"onscreen"}
                      variants={desVariants}
                      className="flex gap-x-3 items-center"
                    >
                      <span className="text-orange ">
                        <MapPin />
                      </span>{" "}
                      <div className="text-black text-md 2xl:text-lg capitalize md:whitespace-nowrap ">
                        {address}
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}
              {activeBtn === "qualification" && (
                <div className=" mt-8">
                  <motion.h1
                    initial="offscreen"
                    whileInView={"onscreen"}
                    variants={tittleVariants}
                    className="font-bold  mb-3 text-black  text-2xl 2xl:text-3xl"
                  >
                    My Awesome Journey
                  </motion.h1>
                  <div className="grid md:grid-cols-2 gap-y-4 mt-6">
                    {/* {education} */}
                    <div className="flex flex-col gap-y-4">
                      {getdata(aboutData, "education")?.title && (
                        <motion.div
                          initial="offscreen"
                          whileInView={"onscreen"}
                          variants={leftToRight}
                          className="flex gap-x-4 items-center text-[18px] text-orange"
                        >
                          <FaUserGraduate></FaUserGraduate>
                          <div className="capitalize">
                            {getdata(aboutData, "education")?.title}
                          </div>
                        </motion.div>
                      )}

                      {/* {list} */}
                      <div className="flex flex-col gap-y-4 cursor-pointer">
                        {getdata(aboutData, "education")?.data?.map(
                          (item, index) => {
                            const { institute, designation, years } = item;
                            return (
                              <motion.div
                                initial="offscreen"
                                whileInView={"onscreen"}
                                variants={tittleVariants}
                                key={index}
                                className=" flex gap-x-4 group"
                              >
                                <div className="h-[84px] w-[1px] bg-orange ml-2 relative">
                                  <div className="w-[11px] h-[11px] rounded-full bg-orange absolute -left-[4px] group-hover:translate-y-[73px] transition-all duration-500  "></div>
                                </div>
                                <div>
                                  <div className="font-semibold mb-2 capitalize leading-none text-md">
                                    {institute}
                                  </div>
                                  <div className="text-softtext mb-1 capitalize">
                                    {designation}
                                  </div>
                                  <div className="text-softtext text-base">
                                    {years}
                                  </div>
                                </div>
                              </motion.div>
                            );
                          }
                        )}
                      </div>
                    </div>

                    {/* {experience} */}

                    <div className="flex flex-col gap-y-4">
                      {getdata(aboutData, "experience")?.title && (
                        <motion.div
                          initial="offscreen"
                          whileInView={"onscreen"}
                          variants={rightToLeft}
                          className="flex gap-x-4 items-center text-[18px] text-orange"
                        >
                          <FaBriefcase></FaBriefcase>
                          <div className="capitalize">
                            {getdata(aboutData, "experience")?.title}
                          </div>
                        </motion.div>
                      )}

                      {/* {list} */}
                      <div className="flex flex-col gap-y-4">
                        {getdata(aboutData, "experience")?.data?.map(
                          (item, index) => {
                            const { institute, designation, years } = item;
                            return (
                              <motion.div
                                initial="offscreen"
                                whileInView={"onscreen"}
                                variants={tittleVariants}
                                key={index}
                                className=" flex gap-x-4 group"
                              >
                                <div className="h-[84px] w-[1px] bg-orange ml-2 relative">
                                  <div className="w-[11px] h-[11px] rounded-full bg-orange absolute -left-[4px] group-hover:translate-y-[73px] transition-all duration-500 "></div>
                                </div>
                                <div>
                                  <div className="capitalize font-semibold mb-2 leading-none text-md">
                                    {institute}
                                  </div>
                                  <div className="text-softtext capitalize mb-1">
                                    {designation}
                                  </div>
                                  <div className="text-base text-softtext">
                                    {years}
                                  </div>
                                </div>
                              </motion.div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <h1>skills</h1>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
