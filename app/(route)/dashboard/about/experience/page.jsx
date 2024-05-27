"use client";
import { addData, deleteData, getData } from "@/app/(services)/services";
import Button from "@/app/components/admin-view/button/Button";
import React, { useEffect, useState } from "react";

import { HashLoader } from "react-spinners";

import Link from "next/link";
import DeleteCard from "@/app/components/admin-view/deleteCard/Card";
import { CirclePlus, Pencil, Trash, View } from "lucide-react";

const aboutFormdata = {
  title: "experience",
  data: [
    {
      institute: "",
      designation: "",

      years: "",
    },
  ],
};

const Aboutpage = () => {
  const [formData, setFormdata] = useState(aboutFormdata);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [deletedName, setDeletedName] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const formValidate = () => {
    return formData.data.every(
      (item) => item.designation && item.institute && item.years
    );
  };

  const saveData = async () => {
    try {
      if (!formValidate()) {
        setError("Please fill in all fields before submitting.");
        return;
      }

      setLoading(true);
      await addData("about", formData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddMore = () => {
    setFormdata((pre) => ({
      ...pre,
      data: [...pre.data, { designation: "", institute: "", years: "" }],
    }));
  };
  const handleInpuChange = (index, fieldname, value) => {
    setFormdata((pre) => {
      const newData = [...pre.data];
      newData[index] = { ...newData[index], [fieldname]: value };
      return { ...pre, data: newData };
    });
  };
  const handleTitleChange = (title) => {
    setFormdata((pre) => ({
      ...pre,
      title: title,
    }));
  };
  const handleRemove = (index) => {
    setFormdata((pre) => {
      const newData = [...pre.data];
      newData.splice(index, 1);
      return { ...pre, data: newData };
    });
  };

  const extractData = async () => {
    try {
      setPageLoading(true);
      const alldata = await getData("about");
      setData(alldata);
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  };

  const getParticularData = (arr, title) => {
    try {
      return arr.find((item) => item.title === title);
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelete = (Id, cardName) => {
    setDeleteId(Id);
    setDeletedName(cardName);
  };

  const handleDelete = async (id) => {
    try {
      const deleted = await deleteData("about", id);
      if (deleted.success) {
        extractData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    extractData();
    setError("");
  }, [show]);
  return (
    <div className="padding max-md:mt-16 flex flex-col gap-4    w-full">
      {pageLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          {" "}
          <HashLoader color="#FF715F" />
        </div>
      ) : (
        <>
          <div className="mb-3 md:mb-5">
            <button
              onClick={() => setShow((pre) => !pre)}
              className="flex justify-center text-base md:text-lg hover:shadow-md gap-3 py-2 px-2 md:px-4 rounded-md bg-green-300 text-white items-center"
            >
              {show ? (
                <>
                  {" "}
                  <CirclePlus className="w-5 h-5 md:w-6 md:h-6 2xl:w-8 2xl:h-8" />{" "}
                  Add
                </>
              ) : (
                <>
                  {" "}
                  <View className="w-5 h-5 md:w-6 md:h-6 2xl:w-8 2xl:h-8" /> See
                </>
              )}
            </button>
          </div>

          {!show ? (
            <>
              <div className="flex items-center max-md:justify-center gap-8">
                <label
                  className={`w-28 cursor-pointer transition-all duration-300 h-20 flex justify-center items-center  border text-lg ${
                    formData.title === "experience"
                      ? "bg-orange text-white font-semibold"
                      : "bg-white border text-black"
                  }  rounded-md  `}
                  onClick={() => handleTitleChange("experience")}
                >
                  Experience
                </label>

                <label
                  className={`w-28 h-20  ${
                    formData.title === "education"
                      ? "bg-orange text-white font-semibold"
                      : "bg-white border text-black"
                  }  flex justify-center items-center   text-lg  rounded-md cursor-pointer`}
                  onClick={() => handleTitleChange("education")}
                >
                  Education
                </label>
              </div>

              <div>
                {formData?.data?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="max-md:grid max-md:grid-cols-2 flex mt-4 gap-4"
                    >
                      <input
                        type="text"
                        value={item.institute}
                        placeholder={
                          formData.title === "education"
                            ? "Institute"
                            : "Company"
                        }
                        name="institute"
                        className="focus:border-orange"
                        onChange={(e) =>
                          handleInpuChange(index, "institute", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        value={item.designation}
                        placeholder={
                          formData.title === "education"
                            ? "Degree"
                            : "Designation"
                        }
                        className="focus:border-orange"
                        name="designation"
                        onChange={(e) =>
                          handleInpuChange(index, "designation", e.target.value)
                        }
                      />

                      <input
                        type="text"
                        value={item.years}
                        placeholder="years"
                        name="years"
                        className="focus:border-orange"
                        style={{ width: "160px" }}
                        onChange={(e) =>
                          handleInpuChange(index, "years", e.target.value)
                        }
                      />

                      <div className=" flex justify-center items-center ">
                        <span
                          onClick={() => handleRemove(index)}
                          className="w-10 h-10 flex  cursor-pointer text-red-600 font-semibold justify-center items-center border rounded-r-full "
                        >
                          {" "}
                          <Trash />
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div className=" w-full flex justify-end items-center mt-4">
                  <button
                    className="px-4 py-2 flex gap-1 justify-center items-center bg-green-300 font-semibold rounded-md text-white"
                    onClick={handleAddMore}
                  >
                    <CirclePlus size={20} /> Add
                  </button>
                </div>
                <span className="text-red-500 font-semibold w-full text-center  block">
                  {error}
                </span>
                <div>
                  <Button saveData={saveData} loading={loading}></Button>
                </div>
              </div>
            </>
          ) : (
            <div className="  flex max-md:flex-col gap-8">
              {deletedName && (
                <DeleteCard
                  deleteId={deleteId}
                  deletedName={deletedName}
                  setDeletedName={setDeletedName}
                  routeName="about"
                  extractAllData={extractData}
                  setDeleteLoading={setDeleteLoading}
                  deleteLoading={deleteLoading}
                />
              )}
              {data && data.length > 0 ? (
                <>
                  {" "}
                  <div className="flex-1 border rounded-sm px-4 py-3">
                    <div className="flex justify-between">
                      <h2 className="capitalize text-xl  font-semibold">
                        {getParticularData(data, "experience")?.title}
                      </h2>
                      {getParticularData(data, "experience") ? (
                        <>
                          <div className="flex gap-2 items-center">
                            <Link
                              href={`/dashboard/about/experience/edit/${
                                getParticularData(data, "experience")?._id
                              }`}
                            >
                              {" "}
                              <button className="bg-blue-200 rounded-full cursor-pointer w-8 h-8 flex justify-center p-1.5 items-center text-blue-500">
                                <Pencil size={25} />
                              </button>
                            </Link>

                            <button
                              onClick={() =>
                                confirmDelete(
                                  getParticularData(data, "experience")?._id,
                                  getParticularData(data, "experience")?.title
                                )
                              }
                              className="mr-2 bg-red-200 rounded-full w-8 h-8 flex justify-center items-center text-red-500"
                            >
                              <Trash size={20} />
                            </button>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>
                      {data && getParticularData(data, "experience") ? (
                        getParticularData(data, "experience")?.data?.map(
                          (item, index) => (
                            <div
                              className="border bg-slate-50 mb-3  py-2 px-2 rounded-md mt-4"
                              key={index}
                            >
                              <div className="flex items-center gap-5">
                                <label className="w-24 font-semibold  text-lg">
                                  Company
                                </label>
                                <span className="capitalize text-softtext">
                                  {item.institute}
                                </span>
                              </div>
                              <div className="flex items-center gap-5">
                                <label className="font-semibold w-24 text-lg">
                                  Designation
                                </label>
                                <span className="capitalize text-softtext">
                                  {item.designation}
                                </span>
                              </div>
                              <div className="flex items-center gap-5">
                                <label className="font-semibold w-24 text-lg">
                                  Years
                                </label>
                                <span className="capitalize text-softtext">
                                  {item.years}
                                </span>
                              </div>
                            </div>
                          )
                        )
                      ) : (
                        <div
                          onClick={() => setShow((pre) => !pre)}
                          className=" cursor-pointer text-red-500 gap-3 flex flex-col justify-center h-full w-full  items-center font-semibold text-lg"
                        >
                          <span className=""> Add Experience</span>
                          <CirclePlus size={40}></CirclePlus>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 border rounded-sm px-4 py-3">
                    <div className="flex justify-between">
                      <h2 className="capitalize text-xl font-semibold">
                        {getParticularData(data, "education")?.title}
                      </h2>

                      {getParticularData(data, "education") ? (
                        <>
                          <div className="flex gap-2 items-center">
                            <Link
                              href={`/dashboard/about/experience/edit/${
                                getParticularData(data, "education")?._id
                              }`}
                            >
                              {" "}
                              <span className="bg-blue-200 rounded-full cursor-pointer w-8 h-8 flex justify-center items-center p-1.5 text-blue-500">
                                <Pencil size={25} />
                              </span>
                            </Link>
                            <button
                              onClick={() =>
                                confirmDelete(
                                  getParticularData(data, "experience")?._id,
                                  getParticularData(data, "experience")?.title
                                )
                              }
                              className="mr-2 bg-red-200 rounded-full w-8 h-8 flex justify-center items-center text-red-500"
                            >
                              <Trash size={20} />
                            </button>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>

                    {data && getParticularData(data, "education") ? (
                      getParticularData(data, "education")?.data?.map(
                        (item, index) => (
                          <div
                            className="border mb-3 py-2 px-2 rounded-md mt-4"
                            key={index}
                          >
                            <div className="flex items-center gap-5">
                              <label className="w-20 font-semibold text-lg">
                                Institute
                              </label>
                              <span className="capitalize text-softtext">
                                {item.institute}
                              </span>
                            </div>
                            <div className="flex items-center gap-5">
                              <label className="font-semibold w-20 text-lg">
                                Degree
                              </label>
                              <span className="capitalize text-softtext">
                                {item.designation}
                              </span>
                            </div>
                            <div className="flex items-center gap-5">
                              <label className="font-semibold w-20 text-lg">
                                Years
                              </label>
                              <span className="capitalize text-softtext">
                                {item.years}
                              </span>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <div
                        onClick={() => setShow((pre) => !pre)}
                        className=" cursor-pointer text-red-500 gap-3 flex flex-col justify-center h-full w-full  items-center font-semibold text-lg"
                      >
                        <span className=""> Add Education</span>
                        <CirclePlus size={40}></CirclePlus>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex justify-center items-center w-full">
                  <p className="text-xl font-semibold ">Not Found!</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Aboutpage;
