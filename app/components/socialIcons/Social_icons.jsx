"use client";
import { Socialicons } from "../../constants";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  containerVariants,
  containerVariantsView,
} from "@/app/(services)/animation/animation";
const Social_icons = ({ color }) => {
  return (
    <div className="flex items-center gap-x-10 ">
      {Socialicons &&
        Socialicons.map((icon, index) => {
          return (
            <motion.div
              initial="offscreen"
              whileInView={"onscreen"}
              variants={containerVariantsView((index + 1) * 0.1)}
              key={index}
            >
              {" "}
              <Link
                className={` hover:text-orange text-${color}`}
                href={icon.path}
              >
                {icon.icon}
              </Link>
            </motion.div>
          );
        })}
    </div>
  );
};

export default Social_icons;
