import React from "react";
import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <HashLoader color="#FFA429" />
    </div>
  );
};

export default Loading;
