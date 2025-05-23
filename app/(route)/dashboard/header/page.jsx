"use client";
import { addData, getData, updateData } from "@/app/(services)/services";
import Button from "@/app/components/admin-view/button/Button";
import FormControls from "@/app/components/admin-view/form-controls";
import Loading from "@/app/components/admin-view/Loading";
import React, { useEffect, useState } from "react";

const HeaderFormData = {
  name: "",
  animatedText: "",
  description: "",
  subHeading: "",
  github: "",
  linkedIn: "",
  instagram: "",
  facebook: "",
  image: "",
  cv: "",
};

const controls = [
  {
    lable: "Name",
    type: "text",
    placeholder: "Insert your Name",
    name: "name",
  },
  {
    lable: "sub Heading",
    type: "text",
    placeholder: "Insert your sub Heading",
    name: "subHeading",
  },
  {
    lable: "Animated Text",
    type: "text",
    placeholder: "eg: react, next, etc ",
    name: "animatedText",
  },
  {
    lable: "Description",
    type: "text",
    placeholder: "Insert your Description",
    name: "description",
  },

  {
    lable: "Github",
    type: "text",
    placeholder: "Insert your Github URL",
    name: "github",
  },
  {
    lable: "LinkedIn",
    type: "text",
    placeholder: "Insert your linkedIn URL",
    name: "linkedIn",
  },
  {
    lable: "Instagram",
    type: "text",
    placeholder: "Insert your instagram URL",
    name: "instagram",
  },
  {
    lable: "Facebook",
    type: "text",
    placeholder: "Insert your Facebook URL",
    name: "facebook",
  },

  {
    lable: "Image",
    type: "file",
    placeholder: "Insert your Image",
    name: "image",
  },
  {
    lable: "CV",
    type: "file",
    placeholder: "Insert your Cv",
    name: "cv",
  },
];

const Headerpage = () => {
  const [headerViewFormData, setHeaderViewFormData] = useState(HeaderFormData);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [pageloading, setPageLoading] = useState(false);

  const extractData = async () => {
    setPageLoading(true);
    const data = await getData("header");
    if (data && data.length) {
      setHeaderViewFormData(data && data[0]);
      setUpdate(true);
    }
    setPageLoading(false);
  };

  const saveData = async () => {
    setLoading(true);
    const response = update
      ? await updateData("header", headerViewFormData)
      : await addData("header", headerViewFormData);
    setLoading(false);

    if (response?.success) {
      setHeaderViewFormData(response?.data);
      setUpdate(true);
    }
    extractData();
  };

  useEffect(() => {
    extractData();
  }, []);

  return (
    <div className="padding max-md:mt-16  w-full ">
      {pageloading ? (
        <Loading></Loading>
      ) : (
        <>
          <FormControls
            controls={controls}
            setFormData={setHeaderViewFormData}
            formDataa={headerViewFormData}
          />

          <div className="flex justify-center mt-4 items-center ">
            <Button
              saveData={saveData}
              loading={loading}
              update={update}
            ></Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Headerpage;
