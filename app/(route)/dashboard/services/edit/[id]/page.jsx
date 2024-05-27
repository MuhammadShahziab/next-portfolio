"use client";
import { getSingleData, updateData } from "@/app/(services)/services";
import Button from "@/app/components/admin-view/button/Button";
import { CirclePlus, ImageUp, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { HashLoader } from "react-spinners";

const serviceFormData = {
  name: "",
  description: "",
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

const Page = ({ params }) => {
  const [formData, setFormdata] = useState(serviceFormData);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [update, setUpdate] = useState(true);
  const id = params.id;
  const router = useRouter();
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

  const formValidate = () => {
    return formData.data.every((item) => item.points);
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

  const handleRemove = (index) => {
    setFormdata((pre) => {
      const newData = [...pre.data];
      newData.splice(index, 1);
      return { ...pre, data: newData };
    });
  };

  const handleAddMore = () => {
    setFormdata((pre) => ({
      ...pre,
      data: [...pre.data, { points: "" }],
    }));
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
      const response = await updateData("services", formData);
      if (response.success) {
        router.push("/dashboard/services");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const extractData = async () => {
      try {
        setPageLoading(true);
        const data = await getSingleData("services", id);
        setUpdate(true);
        setFormdata(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setPageLoading(false);
      }
    };

    extractData(); // Call extractData directly inside useEffect

    // Add extractData to the dependency array
  }, [id]);

  return (
    <div className="padding max-md:mt-16  w-full">
      {pageLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          {" "}
          <HashLoader color="#FF715F" />
        </div>
      ) : (
        <>
          <div className="mt-6">
            <div className="mb-4 ">
              <input
                type="text"
                value={formData.name}
                className="focus:border-orange"
                placeholder="Service Name"
                name="name"
                onChange={(e) => handleNameChange("name", e.target.value)}
              />
            </div>
            <div className="mb-4 ">
              <input
                type="text"
                value={formData.description}
                className="focus:border-orange"
                placeholder="Description"
                name="description"
                onChange={(e) =>
                  handleNameChange("description", e.target.value)
                }
              />
            </div>

            <div className="md:grid md:grid-cols-2 mt-3 md:mt-0  gap-4">
              {formData?.data?.map((item, index) => {
                return (
                  <div key={index} className="flex max-md:mb-3 gap-2">
                    <input
                      type="text"
                      value={item.points}
                      className="focus:border-orange"
                      placeholder="Add your service points"
                      name="points"
                      onChange={(e) => handlePointChange(index, e.target.value)}
                    />
                    <span
                      className="px-2 cursor-pointer py-1 text-xl flex justify-center items-center text-red-600 font-semibold"
                      onClick={() => handleRemove(index)}
                    >
                      <Trash />
                    </span>
                  </div>
                );
              })}
            </div>

            <div className=" w-full flex justify-center  md:justify-end items-center mt-4">
              <button
                onClick={handleAddMore}
                className="px-6 py-2   flex gap-1 justify-center items-center bg-green-300 font-semibold rounded-md text-white"
              >
                <CirclePlus size={20} /> Add point
              </button>
            </div>
            <div className="flex  items-center gap-3 mt-5 md:mt-0">
              <div>
                <label
                  htmlFor="upload"
                  className="group w-[100px] h-[100px] md:w-32 md:h-32 font-semibold text-lg gap-2 rounded-md border flex flex-col justify-center items-center hover:bg-orange hover:text-white text-green-300 hover:border-none hover:shadow-md cursor-pointer"
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
                <div className="border w-[100px] h-[100px] bg-slate-100 animate-pulse rounded-md"></div>
              ) : (
                <>
                  {formData?.image ? (
                    <div className="border w-[100px] h-[80px] md:w-[120px] md:h-[100px] relative flex justify-center items-center rounded-md p-1">
                      <Image
                        src={formData?.image}
                        layout="fill"
                        objectFit="contain"
                        alt="service image"
                      />
                    </div>
                  ) : null}
                </>
              )}
            </div>
            <span className="text-red-500 rounded-sm bg-red-100 font-semibold w-full text-center mt-4 block">
              {error}
            </span>
            <div>
              <Button
                saveData={saveData}
                loading={loading}
                update={update}
              ></Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
