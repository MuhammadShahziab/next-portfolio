"use client";
import Button from "@/app/components/admin-view/button/Button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { addData, getData, updateData } from "@/app/(services)/services";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { HashLoader } from "react-spinners";
import { ImageDown, ImageUp, Trash } from "lucide-react";

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
        console.log(fetchId, "check response id 1122");
        console.log(fetchedData, "check response data 1122");

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
    <div className="padding w-full max-md:mt-16 ">
      {pageLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          {" "}
          <HashLoader color="#FF715F" />
        </div>
      ) : (
        <>
          <div className="flex justify-center gap-8 items-center w-full">
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
          </div>

          <div className="flex border rounded-md p-4 justify-center flex-wrap mt-8 gap-4 mb-0 items-center">
            {formData?.data?.length > 0 ? (
              formData.data.map((item, index) => (
                <div
                  key={item._id} // Use _id as the key
                  className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] relative rounded-md p-2 group border"
                >
                  <Image
                    src={item.url}
                    alt="Tech_Image"
                    layout="fill"
                    objectFit="contain"
                  />
                  <div className="absolute top-0 z-10 flex justify-center items-center bottom-0 right-0 left-0 gap-x-3">
                    <button
                      onClick={() => handleRemove(index)} // Pass _id to handleRemove
                      className="bg-red-500 text-white scale-0 z-10 cursor-pointer opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 hover:text-orange w-11 h-11 rounded-full flex justify-center items-center text-2xl"
                    >
                      <Trash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center w-full my-auto h-full">
                <div className="flex justify-center items-center flex-col">
                  <p className="text-softtext">Add images</p>

                  <span className="text-softtext">
                    <ImageDown size={30} />
                  </span>
                </div>
              </div>
            )}

            <div
              className={`${
                imageLoading
                  ? "w-[100px] h-[100px] md:w-[120px] md:h-[120px] bg-gray-100 rounded-md animate-pulse"
                  : "w-[100px] h-[100px] md:w-[120px] md:h-[120px]"
              }`}
            ></div>
          </div>

          <div className="mt-10">
            <Button loading={loading} saveData={saveData} update={update} />
          </div>
        </>
      )}
    </div>
  );
};

export default TechPage;
