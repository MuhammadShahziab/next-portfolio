"use client";
import Button from "@/app/components/admin-view/button/Button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { addData, getData, updateData } from "@/app/(services)/services";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { HashLoader } from "react-spinners";
import { ImageDown, ImageUp, Trash } from "lucide-react";
import Loading from "@/app/components/admin-view/Loading";
import { BiImageAdd } from "react-icons/bi";

const techformdata = {
  data: [],
};
const TechPage = () => {
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [formData, setFormdata] = useState(techformdata);
  const [pageLoading, setPageLoading] = useState(false);
  const [update, setUpdate] = useState(false);

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
        setImageLoading(false);
        return;
      }

      const uploadedImageData = await uploadResponse.json();
      const imgUrl = uploadedImageData.secure_url;

      setImageLoading(false);
      setFormdata((prevImages) => ({
        ...prevImages,
        data: [...prevImages.data, { url: imgUrl }],
      }));
      toast.success("Image Selected");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to upload image");
    }
  };

  const saveData = async () => {
    try {
      setLoading(true);
      update
        ? await updateData("tech", formData)
        : await addData("tech", formData);

      extractData();
    } catch (error) {
      toast.error("Failed to save data");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (index) => {
    setFormdata((prevImages) => {
      const newData = [...prevImages.data];
      newData.splice(index, 1);
      return { ...prevImages, data: newData };
    });
  };

  const extractData = async () => {
    try {
      setPageLoading(true);

      const response = await getData("tech");
      if (response) {
        // Extract the 'data' array from the fetched response
        const fetchedData = response[0]?.data || [];

        const fetchId = response[0]._id || null;

        setFormdata({ data: fetchedData, id: fetchId }); // Set the fetched data into state
        setUpdate(true);
        setPageLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    extractData();
  }, []);
  return (
    <div className="padding w-full lg:h-[90vh] lg:flex    lg:flex-row-reverse  max-md:mt-16 ">
      {pageLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center   w-full">
            <div>
              <label
                htmlFor="upload"
                className="group w-[80px] h-[80px] md:w-24 md:h-24  text-lg gap-2 rounded-md border flex flex-col justify-center items-center hover:bg-orange hover:text-white text-green-400 hover:border-none hover:shadow-md cursor-pointer"
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
            <div className="mt-4">
              <Button loading={loading} saveData={saveData} update={update} />
            </div>
          </div>

          <div className="flex  h-full lg:max-w-[400px]  rounded-md lg:p-4 justify-center flex-wrap mt-8 gap-x-3 lg:gap-4 mb-0 items-center">
            {formData?.data?.length > 0
              ? formData.data.map((item, index) => (
                  <div
                    key={item._id} // Use _id as the key
                    className="w-[80px] h-[80px] md:w-[90px] md:h-[90px] relative rounded-full  group border"
                  >
                    <img
                      src={item?.url}
                      alt={`tech_image + ${index}`}
                      className="w-full h-full  object-contain p-3"
                    ></img>

                    <div className="absolute top-0 z-10 hover:bg-white/10 hover:backdrop-blur-lg hover:backdrop-saturate-150 rounded-full group flex justify-center items-center bottom-0 right-0 left-0 gap-x-3">
                      <button
                        onClick={() => handleRemove(index)} // Pass _id to handleRemove
                        className="  text-white scale-0 z-10 cursor-pointer opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 group-hover:text-red-500 w-11 h-11 rounded-full flex justify-center items-center text-2xl"
                      >
                        <Trash />
                      </button>
                    </div>
                  </div>
                ))
              : !imageLoading && (
                  <div className="flex justify-center items-center lg:w-[400px] w-full my-auto h-full">
                    <div className="flex justify-center items-center gap-y-2 flex-col">
                      <p className="text-softtext text-lg">No images</p>

                      <span className="text-softtext text-[70px]">
                        <BiImageAdd />
                      </span>
                    </div>
                  </div>
                )}

            <div
              className={`${
                imageLoading
                  ? "w-[80px] h-[80px] md:w-[90px] md:h-[90px] bg-gray-100  animate-pulse"
                  : "w-[80px] h-[80px] md:w-[90px] md:h-[90px]"
              } rounded-full p-3`}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default TechPage;
