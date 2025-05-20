"use client";
import { getData, getSingleData, updateData } from "@/app/(services)/services";
import Button from "@/app/components/admin-view/button/Button";
import FormControls from "@/app/components/admin-view/form-controls";
import Loading from "@/app/components/admin-view/Loading";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";

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

const EditPage = ({ params }) => {
  const id = params.id;

  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [pageloading, setPageLoading] = useState(false);
  const [editprojectViewFormData, setEditProjectViewFormData] =
    useState(projectFormData);
  const [categories, setCategories] = useState();

  const router = useRouter();

  // Memoizing extractData using useCallback to avoid re-creating the function on every render
  const extractData = useCallback(async () => {
    try {
      setPageLoading(true);
      const { data } = await getSingleData("projects", id);
      const getCategories = await getData("category");
      if (data || getCategories) {
        setEditProjectViewFormData(data);
        setCategories(getCategories);
        setUpdate(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  }, [id]);

  const saveData = async () => {
    setLoading(true);

    try {
      const response = await updateData("projects", editprojectViewFormData);
      setLoading(false);

      if (response && response?.success) {
        router.push("/dashboard/projects");
      } else {
        console.error("Failed to update project:", response);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    extractData();
  }, [extractData]); // Including extractData in the dependency array

  return (
    <div className="padding max-md:mt-16 w-full">
      {pageloading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <>
          <FormControls
            controls={controls}
            formDataa={editprojectViewFormData}
            setFormData={setEditProjectViewFormData}
            categories={categories && categories}
            isEdit={true}
          />
          <div>
            <Button saveData={saveData} loading={loading} update={update} />
          </div>
        </>
      )}
    </div>
  );
};

export default EditPage;
