import Navbar from "@/app/components/admin-view/AdminNavbar/Navbar";
import React from "react";
const layout = ({ children }) => {
  return (
    <>
      <div>
        <Navbar />
        <div className="flex max-container  min-h-screen   md:padding-l ">
          {children}{" "}
        </div>
      </div>
    </>
  );
};

export default layout;
