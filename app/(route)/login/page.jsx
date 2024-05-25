"use client";
import Image from "next/image";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";

import { HashLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

const loginData = {
  email: "",
  passward: "",
};
const controls = [
  {
    label: "Email",
    type: "text",
    placeholder: "Msworld@gmail.com",
    name: "email",
  },
  {
    label: "Password",
    type: "password",
    placeholder: "Password",
    name: "password",
  },
];
const Login = () => {
  const [formData, setFormData] = useState(loginData);
  const [loading, setLoading] = useState(false);
  const { data, session, status } = useSession();
  console.log(formData);
  const handleChange = (name, value) => {
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl: `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
      });
      console.log(res, "cehck res");
      setLoading(false);
      toast.success("Login Success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen ">
      <div className=" md:grid grid-cols-3">
        <div className="hidden md:flex col-span-2  items-center   bg-white">
          <div className=" padding-l padding-r    flex justify-center items-center ">
            <Image
              src="/assets/login/login2.jpeg"
              width={450}
              height={450}
              alt="login "
              className="object-contain  2xl:h-[550px] 2xl:w-[550px] "
            ></Image>
          </div>
        </div>
        <div className="md:bg-orange flex justify-center items-center w-full h-screen md:relative">
          <div className="bg-white w-[300px] sm:w-[400px] 2xl:top-48  flex flex-col  h-[500px]   px-6   rounded-sm  shadow-xl md:absolute -left-24 2xl:-left-32">
            <h1 className=" text-3xl mb-0 leading-7 max-md:flex-col font-bold mt-6 text-orange ">
              Login <br />{" "}
              <span className="text-sm text-gray-400 ">
                (Only Admin can Login this Dashboard)
              </span>
            </h1>
            <form
              onSubmit={handleFormSubmit}
              className=" w-full mt-12 flex flex-col   gap-4 items-center "
            >
              {controls?.map((item, index) => {
                return (
                  <>
                    <div className="    w-full" key={index}>
                      <label className=" text-gray-400">{item.label}</label>
                      <input
                        type={item.type}
                        className="bg-gray-100 w-full h-11 outline-none mt-2 focus:border  border-none px-3"
                        name={item.name}
                        placeholder={item.placeholder}
                        value={formData[item.name]}
                        onChange={(e) =>
                          handleChange(item.name, e.target.value)
                        }
                      />
                    </div>
                  </>
                );
              })}

              <button
                type="submit"
                className=" flex items-center gap-x-5 px-11 py-2 w-full mt-4 rounded-lg shadow-lg text-white font-semibold justify-center bg-orange"
              >
                {loading ? <HashLoader color="#ffffff" size={25} /> : "Login"}
              </button>
            </form>
            <Toaster />{" "}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
