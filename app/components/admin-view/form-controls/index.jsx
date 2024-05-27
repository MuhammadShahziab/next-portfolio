"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { ImageUp, Trash } from "lucide-react";

const FormControls = ({ formDataa, controls, setFormData, categories }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [cvLoading, setCvLoading] = useState(false);
  const [imageloading, setImageLoading] = useState(false);
  const [cvUrl, setCvUrl] = useState("");
  console.log(categories, "check categories data 4142");

  const uploadImg = async (name, value) => {
    console.log(name, "check name ");
    try {
      if (!value) {
        toast.error("No file selected");
        return;
      }

      if (name === "cv") {
        setCvLoading(true);
      } else {
        setImageLoading(true);
      }

      const formData = new FormData();
      formData.append("file", value);
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
      }

      const uploadedImageData = await uploadResponse.json();
      const imgUrl = uploadedImageData.secure_url;

      setLoading(false);

      if (name === "image") {
        setImageUrl(imgUrl);
        setImageLoading(false);
      } else if (name === "cv") {
        setCvUrl(imgUrl);
        setCvLoading(false);
      }

      setFormData({
        ...formDataa,
        [name]: imgUrl,
      });

      toast.success(`${name} Selected`);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to upload image");
    }
  };

  const handleRemove = (name) => {
    console.log(name, "deleted name ");
    setFormData((pre) => ({
      ...pre,
      [name]: "",
    }));
  };
  return (
    <div className="grid lg:grid-cols-2 w-full   md:gap-6 gap-2 mx-auto">
      {controls.map((controlItem, index) => (
        <div className="mb-4  md:mb-0 " key={index}>
          {controlItem.type === "file" ? (
            <div className="     md:gap-8 gap-5 flex items-center w-full  ">
              {" "}
              <div>
                <label
                  htmlFor={controlItem.name}
                  className=" group w-[100px] h-[100px]  md:w-28 md:h-28  font-semibold text-sm md:text-lg gap-2 rounded-md border flex flex-col justify-center items-center text-center hover:bg-orange hover:text-white text-green-300 hover:border-none hover:shadow-md cursor-pointer"
                >
                  Upload <br /> {controlItem.name}
                  <ImageUp size={25} className="group-hover:animate-bounce" />
                </label>

                <input
                  id={controlItem.name}
                  type={controlItem.type}
                  name={controlItem.name}
                  onChange={(e) =>
                    uploadImg(controlItem.name, e.target.files[0])
                  }
                  className="focus:border-orange hidden w-full"
                  placeholder={controlItem.placeholder}
                />
              </div>
              <div
                className={`${
                  imageloading && controlItem.name === "image"
                    ? "w-[100px] h-[100px] bg-gray-100 rounded-md animate-pulse"
                    : "w-[100px] h-[100px] hidden md:w-[150px] md:h-[150px]"
                }`}
              ></div>
              <div
                className={`${
                  cvLoading && controlItem.name === "cv"
                    ? "w-[100px] h-[100px] bg-gray-100 rounded-md animate-pulse"
                    : "w-[100px] h-[100px] hidden md:w-[150px] md:h-[150px]"
                }`}
              ></div>
              {controlItem.name === "image" && formDataa.image ? (
                <div
                  className={`${
                    imageloading && "hidden"
                  } flex gap-3 items-center  `}
                >
                  <div className="w-[100px] h-[80px] md:w-[120px] md:h-[100px] relative">
                    <Image
                      src={formDataa?.image}
                      layout="fill"
                      objectFit="contain"
                      alt="hero_image"
                      className="border rounded-md"
                    />
                  </div>
                  <button
                    onClick={() => handleRemove(controlItem.name)}
                    className="border text-red-500 hover:bg-red-500 hover:text-white hover:border-none hover:shadow-lg cursor-pointer w-10  flex justify-center items-center h-10 rounded-full"
                  >
                    <Trash size={20}></Trash>
                  </button>
                </div>
              ) : controlItem.name === "cv" && formDataa.cv ? (
                <div
                  className={`${
                    cvLoading && "hidden"
                  } flex gap-3 items-center  w-full`}
                >
                  <div className=" w-[100px] h-[80px] md:w-[120px] md:h-[100px] relative">
                    <Image
                      src={formDataa?.cv}
                      layout="fill"
                      objectFit="contain"
                      alt="CV"
                      className=" border   rounded-md "
                    />
                  </div>
                  <button
                    onClick={() => handleRemove(controlItem.name)}
                    className="border text-red-500 hover:bg-red-500 hover:text-white hover:border-none cursor-pointer w-10  flex justify-center items-center h-10 rounded-full"
                  >
                    <Trash size={20}></Trash>
                  </button>
                </div>
              ) : null}
            </div>
          ) : controlItem.lable === "Category" ? (
            <div className="input_div">
              <label className="text-sm md:text-base">
                {controlItem?.lable}
              </label>
              <select
                onChange={(e) =>
                  setFormData({
                    ...formDataa,
                    [controlItem.name]: e.target.value,
                  })
                }
                required
                className="px-2 py-4 w-full text-start text-md text-softtext border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange dark:focus:border-blue-500 mr-4"
              >
                <option selected>Select Category</option>
                {/* Option values for category */}
                {categories.map((category, index) => (
                  <>
                    <option key={index} value={category?.category}>
                      {category?.category}
                    </option>
                  </>
                ))}
              </select>
            </div>
          ) : (
            <div className="input_div">
              <label className="text-sm md:text-base">
                {controlItem?.lable}
              </label>
              <input
                required
                type={controlItem?.type}
                name={controlItem?.name}
                className="focus:border-orange w-full"
                placeholder={controlItem?.placeholder}
                value={formDataa[controlItem?.name]}
                onChange={(e) =>
                  setFormData({
                    ...formDataa,
                    [controlItem.name]: e.target.value,
                  })
                }
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormControls;
