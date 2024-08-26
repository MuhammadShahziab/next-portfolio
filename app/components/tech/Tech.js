import React from "react";
import Ball from "../canvas/Ball";

const Tech = ({ techData }) => {
  return (
    <div className="flex justify-center ">
      <div className="grid md:grid-cols-5 h-full gap-x-10  mx-auto grid-cols-2 ">
        {techData?.map((technology) => (
          <div
            className={` flex justify-center  items-center w-[100px] h-[100px] md:w-[130px] md:h-[130px]`}
            key={technology._id}
          >
            <Ball icon={technology.url} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tech;
