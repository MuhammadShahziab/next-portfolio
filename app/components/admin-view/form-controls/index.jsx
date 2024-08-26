"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { Download, ImageUp, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { saveAs } from "file-saver";

const FormControls = ({ formDataa, controls, setFormData, categories }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [cvLoading, setCvLoading] = useState(false);
  const [imageloading, setImageLoading] = useState(false);
  const [cvUrl, setCvUrl] = useState(formDataa?.cv || "");

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
  const handleDownloadCV = () => {
    if (cvUrl) {
      saveAs(cvUrl, "Cv.pdf");
    }
  };

  return (
    <div className="grid lg:grid-cols-2 w-full   md:gap-4  mx-auto">
      {controls.map((controlItem, index) => (
        <div className="mb-4  md:mb-0 " key={index}>
          {controlItem.type === "file" ? (
            <div className=" md:gap-8  mt-2 gap-5 flex items-center w-full  ">
              {" "}
              <div>
                <label
                  htmlFor={controlItem.name}
                  className=" group w-[80px] h-[80px]  md:w-24 md:h-24   text-sm  gap-2 rounded-md border flex flex-col justify-center items-center text-center hover:bg-orange transition-all duration-300 hover:text-white text-green-500 hover:border-none hover:shadow-md cursor-pointer"
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
                  <div className="w-[100px]  rounded-lg h-[80px] md:w-[120px] md:h-[100px] relative ">
                    <img
                      src={formDataa?.image}
                      alt="hero_image"
                      className="  w-full object-contain h-full"
                    />
                  </div>
                  <button
                    onClick={() => handleRemove(controlItem.name)}
                    className="  text-red-500 bg-red-100 hover:bg-red-200 hover:text-white  cursor-pointer w-10  flex justify-center items-center h-10 rounded-full"
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
                      src={`${formDataa?.cv && "/assets/cv.png"}  `}
                      layout="fill"
                      objectFit="contain"
                      alt="CV"
                      className=" border   rounded-md "
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <button
                      onClick={() => handleRemove(controlItem.name)}
                      className=" text-red-500 bg-red-100 hover:bg-red-200 hover:text-white  cursor-pointer w-10  flex justify-center items-center h-10 rounded-full"
                    >
                      <Trash size={20}></Trash>
                    </button>{" "}
                    <button
                      onClick={handleDownloadCV}
                      type="button"
                      className=" text-green-500 bg-green-100 hover:bg-green-300 hover:text-white  cursor-pointer w-10  flex justify-center items-center h-10 rounded-full"
                    >
                      <Download size={20}></Download>
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : controlItem.lable === "Category" ? (
            <div className="input_div">
              <label className="text-sm md:text-base">
                {controlItem?.lable} <span className="text-red-500">*</span>
              </label>
              <Select
                className="outline-none"
                onValueChange={(value) =>
                  setFormData({
                    ...formDataa,
                    [controlItem.name]: value,
                  })
                }
              >
                <SelectTrigger className="w-full h-12 mt-1 outline-none flex items-center justify-between px-4">
                  <SelectValue
                    className=" outline-none"
                    placeholder="Select Category"
                  />
                </SelectTrigger>
                <SelectContent className="outline-none">
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category?.category}>
                      {category?.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="input_div ">
              <label className="text-sm capitalize md:text-base text-softtext">
                {controlItem?.lable} <span className="text-red-500"> *</span>
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
