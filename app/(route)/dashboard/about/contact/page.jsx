"use client";
import { addData, getData, updateData } from "@/app/(services)/services";
import Button from "@/app/components/admin-view/button/Button";
import FormControls from "@/app/components/admin-view/form-controls";
import Loading from "@/app/components/admin-view/Loading";
import { Cake, MailOpen, MapPin, PhoneCall, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

const controls = [
  {
    lable: "Name",
    type: "text",
    placeholder: " Name",
    name: "name",
  },
  {
    lable: "Email ",
    type: "text",
    placeholder: "abcd@gmail.com ",
    name: "email",
  },
  {
    lable: "Phone",
    type: "text",
    placeholder: "0307*******",
    name: "phone",
  },
  {
    lable: "Twitter",
    type: "text",
    placeholder: "*Optional* m_shahzaib414 ",
    name: "twitter",
  },
  {
    lable: "DOB",
    type: "text",
    placeholder: "22-01-2000",
    name: "dob",
  },
  {
    lable: "Address",
    type: "text",
    placeholder: "Address *******",
    name: "address",
  },
];

const ContactFormData = {
  name: "",
  email: "",
  phone: "",
  dob: "",
  address: "",
  twitter: "",
};

const Contactpage = () => {
  const [contactViewFormData, setContactViewFormData] =
    useState(ContactFormData);
  const [pageloading, setPageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  console.log(contactViewFormData, "check form data ");
  const saveData = async () => {
    try {
      setLoading(true);
      update
        ? await updateData("contact", contactViewFormData)
        : await addData("contact", contactViewFormData);
      console.log(res, "contact res ");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const extractData = async () => {
    setPageLoading(true);
    const data = await getData("contact");
    if (data && data.length) {
      setContactViewFormData(data && data[0]);
      setUpdate(true);
    }
    setPageLoading(false);
  };

  useEffect(() => {
    extractData();
  }, []);

  return (
    <div className="padding max-md:mt-16  w-full">
      {pageloading ? (
        <Loading></Loading>
      ) : (
        <>
          <FormControls
            controls={controls}
            setFormData={setContactViewFormData}
            formDataa={contactViewFormData}
          />

          <div className="flex justify-center items-center mt-6 ">
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

export default Contactpage;
