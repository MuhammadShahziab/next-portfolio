"use client";
import { getSingleData, updateData } from "@/app/(services)/services";
import React, { useEffect, useState } from "react";

import { HashLoader } from "react-spinners";
import Button from "@/app/components/admin-view/button/Button";
import { useRouter } from "next/navigation";
import { CirclePlus, Trash } from "lucide-react";

const aboutFormdata = {
  title: "experience",
  data: [
    {
      designation: "",
      institute: "",
      years: "",
    },
  ],
};

const Page = ({ params }) => {
  const [formData, setFormdata] = useState(aboutFormdata);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState("");
  const [update, setUpdate] = useState(false);
  const id = params.id;
  const router = useRouter();

  const formValidate = () => {
    return formData.data.every(
      (item) => item.designation && item.institute && item.years
    );
  };

  const handleAddMore = () => {
    setFormdata((prev) => ({
      ...prev,
      data: [...prev.data, { designation: "", institute: "", years: "" }],
    }));
  };

  const handleInputChange = (index, fieldname, value) => {
    setFormdata((prev) => {
      const newData = [...prev.data];
      newData[index] = { ...newData[index], [fieldname]: value };
      return { ...prev, data: newData };
    });
  };

  const handleTitleChange = (title) => {
    setFormdata((prev) => ({
      ...prev,
      title: title,
    }));
  };

  const handleRemove = (index) => {
    setFormdata((prev) => {
      const newData = [...prev.data];
      newData.splice(index, 1);
      return { ...prev, data: newData };
    });
  };

  const saveData = async () => {
    try {
      if (!formValidate()) {
        setError("Please fill in all fields before submitting.");
        return;
      }
      setLoading(true);
      const response = await updateData("about", formData);
      setLoading(false);
      if (response && response.success) {
        router.push("/dashboard/about/experience");
      } else {
        console.error("Failed to update about:", response);
      }
    } catch (error) {
      console.error("Failed to update server error:", error);
    }
  };

  useEffect(() => {
    const extractData = async () => {
      try {
        setPageLoading(true);
        const data = await getSingleData("about", id);
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
    <div className="padding max-md:mt-16 flex flex-col gap-4 w-full">
      {pageLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <HashLoader color="#FF715F" />
        </div>
      ) : (
        <>
          <div className="flex items-center max-md:justify-center gap-8">
            <label
              className={`w-28 cursor-pointer transition-all duration-300 h-20 flex justify-center items-center border text-lg ${
                formData.title === "experience"
                  ? "bg-orange text-white font-semibold"
                  : "bg-white border text-black"
              } rounded-md`}
              onClick={() => handleTitleChange("experience")}
            >
              Experience
            </label>

            <label
              className={`w-28 h-20 ${
                formData.title === "education"
                  ? "bg-orange text-white font-semibold"
                  : "bg-white border text-black"
              } flex justify-center items-center text-lg rounded-md cursor-pointer`}
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
                    value={item.designation}
                    className="focus:border-orange"
                    placeholder={
                      formData.title === "education" ? "Degree" : "Designation"
                    }
                    name="designation"
                    onChange={(e) =>
                      handleInputChange(index, "designation", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    value={item.institute}
                    className="focus:border-orange"
                    placeholder={
                      formData.title === "education" ? "Institute" : "Company"
                    }
                    name="institute"
                    onChange={(e) =>
                      handleInputChange(index, "institute", e.target.value)
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
                      handleInputChange(index, "years", e.target.value)
                    }
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
            <div className="w-full flex justify-end items-center mt-4">
              <button
                className="px-4 py-2 flex gap-1 justify-center items-center bg-green-300 font-semibold rounded-md text-white"
                onClick={handleAddMore}
              >
                <CirclePlus size={20} /> Add
              </button>
            </div>
            <span className="text-red-500 font-semibold"> {error}</span>
            <div>
              <Button saveData={saveData} loading={loading} update={update} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
