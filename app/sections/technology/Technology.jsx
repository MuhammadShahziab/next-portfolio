"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  tagVariants,
  tittleVariants,
} from "@/app/(services)/animation/animation";
import Tech from "@/app/components/tech/Tech";
const Technology = ({ techData }) => {
  return (
    <section
      id="technologies"
      className=" padding  max-container a h-100vh overflow-x-hidden"
    >
      <div className="flex flex-col justify-center items-center   relative">
        <motion.h1
          initial="offscreen"
          whileInView={"onscreen"}
          variants={tagVariants}
          className="section-title"
        >
          Technologies
        </motion.h1>
        <motion.h5
          initial="offscreen"
          whileInView={"onscreen"}
          variants={tittleVariants}
          className="font-palanquin  font-bold   text-orange ms-8"
        >
          Skills
        </motion.h5>
      </div>

      <div className="mt-14">
        <Tech techData={techData[0].data}></Tech>
      </div>
    </section>
  );
};

export default Technology;
// techData={techData[0].data}
