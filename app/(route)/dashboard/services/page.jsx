"use client";
import { addData, getData } from "@/app/(services)/services";
import Button from "@/app/components/admin-view/button/Button";
import React, { useEffect, useState } from "react";

import { HashLoader } from "react-spinners";
import ServiceCard from "@/app/components/serviceCard/Card";
import Image from "next/image";
import toast from "react-hot-toast";
import { CirclePlus, Eye, ImageUp, Trash, View } from "lucide-react";
import Loading from "@/app/components/admin-view/Loading";
import { IoIosArrowRoundBack } from "react-icons/io";

const serviceFormData = {
  name: "",
  description: "",
  image: "",
  data: [
    {
      points: "",
    },
    {
      points: "",
    },
    {
      points: "",
    },
    {
      points: "",
    },
  ],
};

const ServicesPage = () => {
  const [formData, setFormdata] = useState(serviceFormData);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const handleAddMore = () => {
    setFormdata((pre) => ({
      ...pre,
      data: [...pre.data, { points: "" }],
    }));
  };

  const handleNameChange = (name, value) => {
    setFormdata((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handlePointChange = (index, value) => {
    setFormdata((pre) => {
      const newData = [...pre.data];
      newData[index] = { ...newData[index], points: value };
      return { ...pre, data: newData };
    });
  };
  const uploadImg = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) {
        toast.error("No file selected");
        return;
      }

      setImageLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "msportfolio");

      const uploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/msworlddev/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!uploadResponse.ok) {
        toast.error("Failed to upload image");
        return;
      }

      const uploadedImageData = await uploadResponse.json();
      const imgUrl = uploadedImageData.secure_url;

      setImageLoading(false);
      setFormdata((prevImages) => ({
        ...prevImages,
        image: imgUrl,
      }));
      toast.success("Image Selected");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to upload image");
    }
  };
  const handleRemove = (index) => {
    setFormdata((pre) => {
      const newData = [...pre.data];
      newData.splice(index, 1);

      return { ...pre, data: newData };
    });
  };

  const formValidate = () => {
    return formData.data.every((item) => item.points);
  };

  const saveData = async () => {
    try {
      if (
        !formData.name.trim() ||
        !formData.description.trim() ||
        !formValidate()
      ) {
        setError("Please fill in all fields before submitting.");
        return;
      }
      setLoading(true);
      const response = await addData("services", formData);
      if (response.success) {
        setFormdata(serviceFormData);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const extractData = async () => {
    try {
      setPageLoading(true);
      const data = await getData("services");
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    extractData();
  }, [show]);
  return (
    <div className="padding  max-lg:mt-5  w-full">
      {pageLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <div className=" relative">
            {!show ? (
              <>
                <IoIosArrowRoundBack
                  onClick={() => setShow((pre) => !pre)}
                  className="text-orange absolute -top-6 cursor-pointer -left-10 text-4xl hidden lg:flex"
                ></IoIosArrowRoundBack>
              </>
            ) : (
              <button
                onClick={() => setShow((pre) => !pre)}
                className="flex justify-center text-base mt-3  hover:shadow-md  gap-2 py-2 px-2 md:px-4 rounded-md bg-green-400 text-white items-center"
              >
                <CirclePlus className="w-5 h-5 2xl:w-6 2xl:h-6" /> Create
              </button>
            )}
          </div>

          {!show ? (
            <div className=" mt-6 lg:mt-9">
              <div className="grid grid-cols-3 gap-2 lg:gap-3 mb-2 ">
                <div className="input_field col-span-3 lg:col-span-1">
                  <label className="text-sm md:text-base text-softtext">
                    Service Name<span className="text-red-500"> *</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    placeholder="Service Name"
                    className="focus:border-orange"
                    name="name"
                    onChange={(e) => handleNameChange("name", e.target.value)}
                  />
                </div>
                <div className="input_field col-span-3 lg:col-span-2">
                  <label className="text-sm md:text-base text-softtext">
                    Description<span className="text-red-500"> *</span>
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    placeholder="Description"
                    name="description"
                    className="focus:border-orange"
                    onChange={(e) =>
                      handleNameChange("description", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="md:grid md:grid-cols-2 mt-3  gap-4">
                {formData?.data?.map((item, index) => {
                  return (
                    <div key={index} className="flex max-md:mb-3 gap-2">
                      <input
                        type="text"
                        value={item.points}
                        required
                        placeholder="Add your service points"
                        name="points"
                        className="focus:border-orange"
                        onChange={(e) =>
                          handlePointChange(index, e.target.value)
                        }
                      />
                      <span
                        className=" cursor-pointer   lg:text-xl flex justify-center items-center text-red-500"
                        onClick={() => handleRemove(index)}
                      >
                        <Trash />
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className=" w-full flex justify-end items-center mt-4">
                <button
                  onClick={handleAddMore}
                  className="lg:px-4 px-3 py-2  mt-4 flex gap-1 justify-center items-center bg-green-300  rounded-md text-white"
                >
                  <CirclePlus size={20} /> Add point
                </button>
              </div>
              <div className="flex gap-3 mt-6">
                <div>
                  <label
                    htmlFor="upload"
                    className="group w-[80px] h-[80px] md:w-24 md:h-24  gap-2 rounded-md border flex flex-col justify-center items-center hover:bg-orange hover:text-white text-green-400 hover:border-none hover:shadow-md cursor-pointer"
                  >
                    Upload{" "}
                    <ImageUp size={25} className="group-hover:animate-bounce" />
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="upload"
                    onChange={uploadImg}
                    className="focus:border-orange hidden w-full"
                  />
                </div>
                {imageLoading ? (
                  <div className="border w-[120px] h-[120px]  bg-slate-100 animate-pulse rounded-md"></div>
                ) : (
                  <>
                    {formData.image.trim() ? (
                      <div className="border flex justify-center items-center  rounded-md p-1">
                        <Image
                          src={formData?.image}
                          width={100}
                          height={100}
                          alt="service image"
                          className="object-contain "
                        />
                      </div>
                    ) : null}
                  </>
                )}
              </div>
              <span className="text-red-500 rounded-sm bg-red-100 font-semibold w-full text-center mt-4 block">
                {error}
              </span>
              <div className="mt-6">
                <Button saveData={saveData} loading={loading}></Button>
              </div>
            </div>
          ) : (
            <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4  mt-6 ">
              <ServiceCard services={data} action={true} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ServicesPage;
