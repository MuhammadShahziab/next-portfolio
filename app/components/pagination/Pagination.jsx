import React from "react";

const Pagination = ({
  handlePageChange,
  currentPage,
  itemLength,
  pageSize,
}) => {
  const handleClick = (page) => {
    handlePageChange(page);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(itemLength / pageSize); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-8">
      {pageNumbers.map((num, index) => {
        return (
          <button
            key={index}
            onClick={() => handleClick(num)}
            className={`${
              currentPage === num
                ? "bg-orange font-bold text-white"
                : "bg-white"
            } border rounded-xl w-10 h-10 mx-1 flex items-center justify-center`}
          >
            {num}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
