"use client";
import Image from "next/image";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { HashLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { data, session, status } = useSession();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.ok) {
        toast.success("Login");
        router.push("/dashboard");
        window.location.reload();
        setError(null);
      } else if (res.error) {
        setError(res.error); // Set the error state
        toast.error(res.error); // Display error message with toast
      }
    } catch (error) {
      setError("Failed to login"); // Set a generic error message
      toast.error("Failed to login"); // Display generic error message with toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" grid md:grid-cols-3 min-h-screen  overflow-hidden">
      <div className=" max-md:hidden md:col-span-2   ">
        <div className=" padding-l padding-r  h-full   hidden md:flex justify-center items-center ">
          <Image
            src="/assets/login/c.jpg"
            width={450}
            height={450}
            alt="login "
            className="object-contain  2xl:h-[550px] 2xl:w-[550px] "
          ></Image>
        </div>
      </div>
      <div className="grid col-span-3 md:col-span-1  bg-orange h-full relative">
        <div className=" flex flex-col md:justify-center  items-center relative  ">
          <div className=" w-full h-screen   md:w-[400px] md:h-[65%]   bg-white flex flex-col max-md:pt-28  px-6 py-5 pb-10 md:absolute right-[35%] 2xl:right-[50%]  rounded-md  shadow-xl">
            <h1 className=" text-3xl mb-0 leading-7 max-md:flex-col text-center mt-0 md:mt-4 lg:mt-0 font-semibold  text-orange ">
              Login <br />{" "}
            </h1>
            <p className="text-sm text-center mt-3 text-softtext ">
              (Only Admin can Login this Dashboard)
            </p>
            <form
              onSubmit={handleFormSubmit}
              className=" w-full mt-8 md:mt-12 flex flex-col   gap-4 items-center "
            >
              <div className="   relative  w-full">
                <label className="inputLabel">Email</label>
                <input
                  type="email"
                  className=""
                  name="email"
                  placeholder="Msworld@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="   relative  w-full">
                <label className="inputLabel">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className=""
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 md:top-5 top-3 cursor-pointer text-sm  text-softtext"
                >
                  {showPassword ? <Eye size={17} /> : <EyeOff size={17} />}
                  {/*  */}
                </span>
              </div>
              {error && (
                <p className="bg-red-100 text-center text-red-500 rounded-md w-full mt-3">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className=" flex items-center gap-x-5 px-11 py-2 w-full mt-3 rounded-full shadow-lg text-white font-semibold justify-center bg-green-400"
              >
                Login {loading && <HashLoader color="#ffffff" size={23} />}
              </button>

              <div className="flex gap-x-3 max-md:mt-6 items-center">
                <buton className="w-11 h-11 shadow-lg cursor-pointer rounded-full flex justify-center items-center bg-green-400 text-white">
                  <FaGoogle />
                </buton>
                <buton className="w-11 h-11 shadow-lg cursor-pointer rounded-full flex justify-center items-center text-2xl bg-black/40 text-white">
                  <FaGithub />
                </buton>
                <buton className="w-11 h-11 shadow-lg cursor-pointer rounded-full flex justify-center items-center text-2xl bg-sky-500 text-white">
                  <FaFacebook />
                </buton>
              </div>
            </form>
            <p className="absolute bottom-20  text-center w-[85%] text-sm text-softtext md:hidden">
              Developed by Shahzaib
            </p>
            <Toaster />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
