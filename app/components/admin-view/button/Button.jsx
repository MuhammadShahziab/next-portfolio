import React from "react";
import { HashLoader } from "react-spinners";

const Button = ({ saveData, loading, update }) => {
  const uploadData = () => {
    saveData();
  };

  return (
    <div className=" mt-5 flex justify-center items-center ">
      <button
        onClick={uploadData}
        disabled={loading}
        className="bg-orange text-white rounded-full shadow-md py-2 px-12 text-lg   flex justify-center gap-x-2 items-center"
      >
        {update ? "Update" : "Save"}{" "}
        {loading && <HashLoader color="#ffffff" size={20} />}
      </button>
    </div>
  );
};

export default Button;
