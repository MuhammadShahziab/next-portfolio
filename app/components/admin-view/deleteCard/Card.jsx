import { deleteData } from "@/app/(services)/services";
import React from "react";

const DeleteCard = ({
  deleteId,
  deletedName,
  setDeletedName,
  routeName,
  extractAllData,
  deleteLoading,
  setDeleteLoading,
  category,
}) => {
  const handleCancelDelete = () => {
    // Reset deletedName to null
    setDeletedName(null);
  };

  const deleteProject = async () => {
    setDeleteLoading(true);
    try {
      const response = await deleteData(routeName, deleteId);
      if (response.success) {
        setDeletedName(null);
        setDeleteLoading(false);
      }
    } catch (error) {
      setDeletedName(null);
      setDeleteLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center z-10 bg-gray-400 bg-opacity-50 px-6">
      <div className="w-[400px] h-[200px] px-6 py-4 rounded-md bg-slate-50">
        <div className="flex justify-center items-center flex-col  h-full w-full">
          <p className="text-lg  text-center">
            Are you sure you want to delete this{" "}
            <span className="font-bold">&quot;{deletedName}&quot;</span>{" "}
            {category}
          </p>
          <div className="mt-4 flex justify-center">
            <button
              onClick={deleteProject}
              className={` ${
                deleteLoading ? "cursor-not-allowed bg-red-200" : "bg-red-500"
              } text-white px-4 py-2 rounded-md mr-4`}
            >
              yes
            </button>
            <button
              onClick={handleCancelDelete}
              className="bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCard;
