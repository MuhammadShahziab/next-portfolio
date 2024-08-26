"use client";
import Link from "next/link";
import { motion } from "framer-motion";

import { Facebook, Github, Instagram, Linkedin } from "lucide-react";

import {
  containerVariants,
  containerVariantsView,
} from "@/app/(services)/animation/animation";
const Social_icons = ({ color, iconsLinks = [] }) => {
  const icons = [
    { icon: <Github />, path: iconsLinks[0] || "" },
    { icon: <Linkedin />, path: iconsLinks[1] || "" },
    { icon: <Instagram />, path: iconsLinks[2] || "" },
    { icon: <Facebook />, path: iconsLinks[3] || "" },
  ];

  return (
    <div className="flex items-center gap-x-10">
      {icons.map((icon, index) => (
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          variants={containerVariantsView((index + 1) * 0.1)}
          key={index}
        >
          {icon.path && (
            <Link
              href={icon.path}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-orange text-${color}`}
            >
              {icon.icon}
            </Link>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default Social_icons;
