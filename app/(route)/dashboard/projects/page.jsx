"use client";
import { addData, deleteData, getData } from "@/app/(services)/services";
import FormControls from "@/app/components/admin-view/form-controls";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import Button from "@/app/components/admin-view/button/Button";
import { HashLoader } from "react-spinners";
import Pagination from "@/app/components/pagination/Pagination";
import Link from "next/link";
import DeleteCard from "@/app/components/admin-view/deleteCard/Card";
import { CirclePlus, Pencil, Trash, View } from "lucide-react";

const projectFormData = {
  name: "",
  image: "",
  category: "",
  description: "",
  link: "",
  github: "",
};

const controls = [
  {
    lable: "Name",
    type: "text",
    placeholder: "Insert your Project Name",
    name: "name",
  },
  {
    lable: "Description",
    type: "text",
    placeholder: "Insert your Description",
    name: "description",
  },
  {
    lable: "Category",
    type: "text",
    placeholder: " your Project Category",
    name: "category",
  },
  {
    lable: "Link",
    type: "text",
    placeholder: "Insert your Project Link",
    name: "link",
  },
  {
    lable: "Github",
    type: "text",
    placeholder: "Insert your Github Link",
    name: "github",
  },
  {
    lable: "Image",
    type: "file",
    placeholder: "Insert your Name",
    name: "image",
  },
];

const Projectpage = () => {
  const [projectViewFormData, setProjectViewFormData] =
    useState(projectFormData);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [projects, setProjects] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [deletedName, setDeletedName] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSeach] = useState("");
  const [pageSize, setPageSize] = useState("6");
  const [categories, setCategories] = useState();
  console.log(categories, "check category 323");
  const saveData = async () => {
    const { name, category, description, image } = projectViewFormData;
    if (
      !name.trim() ||
      !category.trim() ||
      !description.trim() ||
      !image.trim()
    ) {
      setError("Please fill in all fields before submitting.");
      return;
    }
    setLoading(true);
    const response = await addData("projects", projectViewFormData);
    setLoading(false);

    if (response?.success) {
      setProjectViewFormData(projectFormData);
      setShow(false);
    }
  };

  const extractAllData = async () => {
    try {
      setPageLoading(true); // Set loading state to true before fetching data
      const data = await getData("projects");
      const categories = await getData("category");
      if (data || categories) {
        setProjects(data);
        setCategories(categories);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false); // Set loading state to false after fetching data
    }
  };

  const confirmDelete = (projectId, projectName) => {
    setDeleteId(projectId);
    setDeletedName(projectName);
  };

  const searchItems = projects.filter((project) => {
    const allprojects = search.length <= 0;

    const searchProjects =
      project.category.toLowerCase().includes(search.toLowerCase()) ||
      project.name.toLowerCase().includes(search.toLowerCase());

    return allprojects || searchProjects;
  });
  const totalPages = Math.ceil(projects.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize);
  const currentData = searchItems.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSize = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };
  useEffect(() => {
    extractAllData();
    setError("");
  }, [show]);

  return (
    <div className="padding max-md:mt-16  w-full ">
      {pageLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          {" "}
          <HashLoader color="#FF715F" />
        </div>
      ) : (
        <>
          <button
            onClick={() => setShow((pre) => !pre)}
            className="flex justify-center text-base md:text-lg hover:shadow-md gap-2 md:gap-3 py-2 px-2 md:px-4 rounded-md bg-green-300 text-white items-center"
          >
            {!show ? (
              <>
                {" "}
                <CirclePlus className="w-5 h-5 md:w-6 md:h-6 2xl:w-8 2xl:h-8" />{" "}
                Create
              </>
            ) : (
              <>
                {" "}
                <View className="w-5 h-5 md:w-6 md:h-6 2xl:w-8 2xl:h-8" /> See
                All
              </>
            )}
          </button>

          <div className="mt-5 w-full">
            {show ? (
              <div className=" ">
                <FormControls
                  controls={controls}
                  formDataa={projectViewFormData}
                  categories={categories && categories}
                  setFormData={setProjectViewFormData}
                />
                <span className="text-red-500 font-semibold mt-4 text-center block">
                  {error}
                </span>
                <div className="mt-8 ">
                  {" "}
                  <Button saveData={saveData} loading={loading} />
                </div>
              </div>
            ) : (
              <>
                {loading ? (
                  <div className="w-full h-full flex justify-center items-center">
                    {" "}
                    <HashLoader color="#FF715F" />
                  </div>
                ) : (
                  <div>
                    {deletedName ? (
                      <DeleteCard
                        deleteId={deleteId}
                        deletedName={deletedName}
                        setDeletedName={setDeletedName}
                        routeName="projects"
                        extractAllData={extractAllData}
                        setDeleteLoading={setDeleteLoading}
                        deleteLoading={deleteLoading}
                        category="Project"
                      />
                    ) : (
                      " "
                    )}

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

                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="border text-sm md:text-md px-2 md:px-4 py-2 text-black">
                            #No
                          </th>
                          <th className="border px-2 md:px-4 text-sm md:text-md py-2 text-black">
                            Name
                          </th>
                          <th className="border px-2 md:px-4 text-sm md:text-md py-2 text-black hidden md:block">
                            Category
                          </th>
                          <th className="border text-sm md:text-md px-2 md:px-4 py-2 text-black">
                            Image
                          </th>
                          <th className="border text-sm md:text-md px-2 md:px-4 py-2 text-black">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentData.length >= 1 &&
                          currentData?.map((project, index) => (
                            <>
                              <tr key={index} className="bg-gray-50">
                                <td className="border md:px-4 px-2 md:py-2 py-1 text-sm md:text-md text-center">
                                  {(currentPage - 1) * pageSize + index + 1}
                                </td>
                                <td className="border md:px-4 px-2 md:py-2 py-1 text-sm md:text-md  text-center">
                                  {project.name}
                                </td>
                                <td className="border max-md:hidden  md:px-4 px-2 text-sm md:text-md md:py-2 py-1 text-center ">
                                  {project.category}
                                </td>
                                <td className="border md:px-4 px-2 py-1 md:py-2 text-sm md:text-md flex justify-center items-center">
                                  <Image
                                    src={project.image}
                                    width={100}
                                    height={100}
                                    alt={project.name}
                                  ></Image>
                                </td>
                                <td className="border md:px-4 px-2 md:py-2 py-1 mx-auto  ">
                                  <div className="flex justify-center items-center">
                                    <Link
                                      href={`${process.env.NEXT_PUBLIC_API_URL}/dashboard/projects/edit/${project._id}`}
                                    >
                                      <button className="mr-2 bg-blue-200 rounded-full flex justify-center items-center text-blue-500 w-6 h-6 md:w-8 md:h-8 ">
                                        <Pencil className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 " />
                                      </button>
                                    </Link>
                                    <button
                                      onClick={() =>
                                        confirmDelete(project._id, project.name)
                                      }
                                      className="mr-2 bg-red-200 rounded-full flex justify-center items-center text-red-500 w-6 h-6 md:w-8 md:h-8 "
                                    >
                                      <Trash className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 " />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            </>
                          ))}
                      </tbody>
                    </table>

                    {currentData.length <= 0 && (
                      <div className="flex justify-center items-center w-full pb-5  flex-col mt-8  ">
                        <div className="flex justify-center flex-col items-center ">
                          <Image
                            src={"/assets/empty_icon.jpg"}
                            width={180}
                            height={180}
                            alt="empty"
                            className="object-contain  "
                          ></Image>
                          <span className="text-xl">Sorry Not found!</span>
                        </div>
                      </div>
                    )}

                    <Pagination
                      currentPage={currentPage}
                      itemLength={projects?.length}
                      totalPages={totalPages}
                      handlePageChange={handlePageChange}
                      pageSize={pageSize}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Projectpage;
