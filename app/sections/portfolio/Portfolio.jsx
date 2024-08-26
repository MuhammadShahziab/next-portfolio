"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
import Button from "@/app/components/button/Button";
import { motion } from "framer-motion";
import {
  desVariants,
  tittleVariants,
} from "@/app/(services)/animation/animation";
import { useEffect, useState, useCallback } from "react";
import ProjectCard from "@/app/components/projectCard/ProjectCard";

const Portfolio = ({ projectsData }) => {
  const [loading, setLoading] = useState(false);

  // Memoizing the extractData function using useCallback
  const extractData = useCallback(() => {
    if (!projectsData || projectsData.length < 1) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [projectsData]);

  useEffect(() => {
    extractData();
  }, [extractData]); // Including extractData in the dependency array

  return (
    <section
      className="max-container relative padding-l max-md:padding-r"
      id="portfolio"
    >
      <div className="max-w-[300px] mx-auto xl:mx-0 text-center xl:text-left mb-12 xl:h-[350px] flex flex-col gap-y-3 justify-center items-center xl:items-start">
        <motion.h2
          initial="offscreen"
          whileInView={"onscreen"}
          variants={tittleVariants}
          className="section-title"
        >
          Latest Projects
        </motion.h2>
        <motion.p
          initial="offscreen"
          whileInView={"onscreen"}
          variants={desVariants}
          className="text-softtext text-lg 2xl:text-xl"
        >
          This is my all latest projects with all free source code available.
        </motion.p>
        <motion.div
          initial="offscreen"
          whileInView={"onscreen"}
          variants={tittleVariants}
        >
          <Link href="/projects">
            <Button label="All Projects" bg="orange"></Button>
          </Link>
        </motion.div>
      </div>
      <div className="xl:max-w-[850px] xl:absolute top-0 right-10">
        <Swiper
          className="h-[440px]" // Add custom class here
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
          }}
          pagination={{ clickable: true }}
        >
          {projectsData.length > 0
            ? projectsData.slice(0, 4).map((project, index) => (
                <SwiperSlide key={index}>
                  <ProjectCard
                    loading={loading}
                    projects={project}
                    index={index}
                  />
                </SwiperSlide>
              ))
            : [1, 2, 3, 4].map((item, index) => (
                <SwiperSlide key={index}>
                  <ProjectCard loading={true} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Portfolio;
