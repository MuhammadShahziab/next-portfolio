"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
import { HashLoader } from "react-spinners";
import { addData } from "@/app/(services)/services";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const session = useSession();

  const router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = { email, password };
    try {
      setLoading(true);
      if (!email || !password) {
        setError("please Fill all Fields!");
        return;
      }

      const response = await addData("register", formData);

      if (!response.success) {
        setError(response.message);
      } else {
        router.push("/login");
        setError("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Try Again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="min-h-screen ">
      <div className=" md:grid grid-cols-3">
        <div className="hidden md:flex col-span-2  items-center   bg-white">
          <div className=" padding-l padding-r   flex justify-center items-center ">
            <Image
              src="/assets/login/login1.jpeg"
              width={450}
              height={450}
              alt="login "
              className="object-contain  2xl:h-[550px] 2xl:w-[550px] "
            ></Image>
          </div>
        </div>
        <div className="bg-orange flex flex-col md:justify-center  items-center   w-full h-screen md:relative">
          <h1 className="font-semibold flex justify-center   md:hidden  text-white text-2xl text-center mt-11">
            <span className="text-[40px]">P</span>ortfolio
          </h1>
          <div className="bg-white mt-11 md:mt-0 rounded-md w-[300px] sm:w-[400px] 2xl:top-48  flex flex-col  h-[500px]   px-6     shadow-xl md:absolute -left-24 2xl:-left-32">
            <h1 className=" text-3xl mb-0 leading-7 max-md:flex-col font-bold mt-6 text-orange ">
              Register <br />{" "}
              <span className="text-sm text-gray-400 ">
                (Only Admin can Login this Dashboard)
              </span>
            </h1>

            <div className=" w-full mt-12 flex flex-col   gap-4 items-center ">
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
                  className="absolute right-6 md:top-5 top-3 cursor-pointer   text-softtext"
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                  {/*  */}
                </span>
              </div>

              <span className="bg-red-200  text-center text-red-500 rounded-md w-full  mt-4">
                {error && error}
              </span>
              <button
                onClick={handleFormSubmit}
                className="bg-orange px-11 py-2 w-full flex justify-center items-center  rounded-lg shadow-lg text-white"
              >
                {loading ? (
                  <HashLoader color="#ffffff" size={25} />
                ) : (
                  "Register"
                )}
              </button>
            </div>

            <Toaster />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
