"use client";
import React, { useState } from "react";
import Pagination from "../pagination/Pagination";
import Card from "../projectCard/Card";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  containerVariants,
  tagVariants,
  tittleVariants,
} from "@/app/(services)/animation/animation";
const All_projects = ({ projectData }) => {
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState("6");
  const [search, setSeach] = useState("");

  const filteredProjects = projectData.filter((project) => {
    // Filter based on category
    const categoryMatch = category === "All" || project.category === category;

    // Filter base on Search
    const searchMatch =
      project.category.toLowerCase().includes(search.toLowerCase()) ||
      project.name.toLowerCase().includes(search.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const uniqueCategory = [
    "All",
    ...new Set(projectData.map((item) => item.category)),
  ];

  const totalPages = Math.ceil(projectData.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredProjects.length);

  const currentData = filteredProjects.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const setCategoryAndResetPage = (name) => {
    setCategory(name);
    setCurrentPage(1);
  };
  return (
    <>
      <section className="max-container padding ">
        <div className="  py-2 mb-6 flex flex-col justify-center items-center">
          <motion.h2
            initial="offscreen"
            whileInView={"onscreen"}
            variants={tagVariants}
            className="mx-auto section-title"
          >
            Projects
          </motion.h2>
          <motion.h5
            initial="offscreen"
            whileInView={"onscreen"}
            variants={tittleVariants}
            className="font-palanquin  font-bold   text-orange ms-7"
          >
            My Work
          </motion.h5>
        </div>
        <div className="flex justify-center mt-3 ">
          <div className="flex md:border items-center  md:border-indigo-100 md:p-1 flex-wrap max-md:justify-center gap-y-4  gap-x-3 md:gap-x-0 mb-4 rounded-3xl">
            {uniqueCategory?.map((name, index) => {
              return (
                <motion.label
                  initial="offscreen"
                  animate={"animate"}
                  variants={containerVariants((index + 1) * 0.1)}
                  key={name}
                  className={`${
                    category === name ? "bg-orange  text-white" : "bg-white"
                  } w-32 md:w-36 text-center capitalize cursor-pointer outline-none font-semibold rounded-3xl px-3 md:px-4 py-2 flex border md:border-none items-center text-sm md:text-base justify-center transition-colors  max-md:gap-x-3 `}
                  onClick={() => setCategoryAndResetPage(name)}
                >
                  {name}

                  {category === name && (
                    <span className="relative left-1  sm:left-4 flex h-1.5 w-1.5 md:h-3 md:w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-50 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-3 md:w-3 bg-offwhite"></span>
                    </span>
                  )}
                </motion.label>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center  mt-7 py-3 border-b">
          <div className="flex justify-center  items-center relative  md:mb-0 ">
            <select
              onChange={(e) => setPageSize(e.target.value)}
              id="small"
              className="p-2 w-full text-center text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange dark:focus:border-blue-500 mr-4"
            >
              <option value="6" selected>
                Per Page
              </option>
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="9">9</option>
              <option value="12">12</option>
            </select>
          </div>
          <div className="max-md:w-[150px]">
            <input
              type="search"
              className="relative m-0 block w-full flex-auto rounded border  bg-transparent bg-clip-padding px-3 py-[0.25rem] text-baseb text-black font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3]  focus:shadow-inset focus:outline-none motion-reduce:transition-none "
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => setSeach(e.target.value)}
              id="exampleFormControlInput2"
              aria-describedby="button-addon2"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div
            className={`${
              currentData.length >= 1
                ? " grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4 text-center gap-x-6 mt-7 gap-y-4 "
                : "md:h-[300px]   flex justify-center items-center"
            }    `}
          >
            {currentData.length >= 1 ? (
              currentData?.map((project, index) => {
                return (
                  <Card projects={project} loading={false} key={index}></Card>
                );
              })
            ) : (
              <div className="flex justify-center items-center w-full   flex-col mt-8  ">
                <div className=" flex justify-center flex-col items-center">
                  <Image
                    src={"/assets/empty_icon.jpg"}
                    width={180}
                    height={180}
                    alt="empty"
                    className="object-contain"
                  ></Image>
                  <span className="text-xl">Sorry Not found!</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          itemLength={filteredProjects.length}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          pageSize={pageSize}
        />
      </section>
    </>
  );
};

export default All_projects;
