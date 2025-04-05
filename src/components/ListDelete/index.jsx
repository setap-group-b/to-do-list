"use client";

import { deleteList } from "@/app/actions/list";
import ReusableButton from "../ui/ReusableButton";

export const ListDelete = ({ listId }) => {
  return (
    <ReusableButton
      variant={"destructive"}
      title={"Delete list"}
      onClick={(e) => {
        e.preventDefault(); // Prevent the form from being submitted in the traditional way.
        deleteList(listId); // Delete the list with the given ID.
      }}
    />
  );
};
