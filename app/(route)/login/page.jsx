"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { HashLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { data, session, status } = useSession();

  console.log(session, status);
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
        toast.success("Login Success");
        setLoading(false);
        router.push(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`);
        setError(null);
      } else if (res.error) {
        setError(res.error); // Set the error state
        toast.error(res.error); // Display error message with toast
        setLoading(false);
      }
    } catch (error) {
      setError("Failed to login"); // Set a generic error message
      toast.error("Failed to login"); // Display generic error message with toast
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen ">
      <div className=" md:grid grid-cols-3 ">
        <div className=" md:flex col-span-2  items-center   ">
          <div className=" padding-l padding-r   hidden md:flex justify-center items-center ">
            <Image
              src="/assets/login/login2.jpeg"
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
          <div className=" w-[300px] sm:w-[400px]  2xl:top-48 bg-white mt-11 md:mt-0 flex flex-col  h-[500px]   px-6   rounded-md  shadow-xl md:absolute -left-24 2xl:-left-32">
            <h1 className=" text-3xl mb-0 leading-7 max-md:flex-col   font-bold mt-8 text-orange ">
              Login <br />{" "}
              <span className="text-sm text-gray-400 ">
                (Only Admin can Login this Dashboard)
              </span>
            </h1>
            <form
              onSubmit={handleFormSubmit}
              className=" w-full mt-12 flex flex-col   gap-4 items-center "
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
                  className="absolute right-6 md:top-5 top-3 cursor-pointer   text-softtext"
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                  {/*  */}
                </span>
              </div>
              {error && (
                <span className="bg-red-200 text-center text-red-500 rounded-md w-full mt-4">
                  {error}
                </span>
              )}
              <button
                type="submit"
                className=" flex items-center gap-x-5 px-11 py-2 w-full mt-7 rounded-lg shadow-lg text-white font-semibold justify-center bg-orange"
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
