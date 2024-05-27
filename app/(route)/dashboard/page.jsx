"use client";
import { getData } from "@/app/(services)/services";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const AdminPage = () => {
  const [projects, setProjects] = useState([]);
  console.log(projects, "check projects");
  const session = useSession();

  const extractAllData = async () => {
    try {
      const data = await getData("projects");
      console.log(data, "check data");
      if (data) {
        setProjects(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    extractAllData();
  }, []);

  return (
    <div className="padding w-full max-md:mt-16">
      <h1 className="text-4xl md:text-center text-black font-bold">
        Wellcome to your <span className="text-orange"> Dashboard </span>
      </h1>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 mt-20">
        <div className=" py-8 rounded-md shadow bg-blue-300 text-center text-white">
          <h2 className="text-xl">Total Projects</h2>
          <h1 className="text-2xl font-semibold mt-2">{projects.length}</h1>
        </div>
        <div className=" py-8 rounded-md shadow bg-yellow-300 text-center text-white">
          <h2 className="text-xl">On Working Projects</h2>
          <h1 className="text-2xl font-semibold mt-2">4</h1>
        </div>
        <div className=" py-8 rounded-md shadow bg-red-300 text-center text-white">
          <h2 className="text-xl">Pending projects</h2>
          <h1 className="text-2xl font-semibold mt-2">2</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
