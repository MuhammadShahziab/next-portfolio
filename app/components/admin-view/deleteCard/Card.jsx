import { deleteData } from "@/app/(services)/services";
import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
        extractAllData();
        setDeletedName(null);
        setDeleteLoading(false);
      }
    } catch (error) {
      setDeletedName(null);
      setDeleteLoading(false);
    }
  };

  return (
    <AlertDialog open={deletedName} onOpenChange={() => setDeletedName(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {" "}
            Are you sure you want to delete this{" "}
            <span className="font-bold">&quot;{deletedName}&quot;</span>{" "}
            {category}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancelDelete}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="bg-orange" onClick={deleteProject}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCard;
