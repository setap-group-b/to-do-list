"use client";

import { deleteList } from "@/app/actions/list";

export const ListDelete = ({ listId }) => {
  const deleteAction = (event) => {
    event.preventDefault(); // Prevent the form from being submitted in the traditional way.
    deleteList(listId); // Delete the list with the given ID.
  };

  return (
    <form onSubmit={deleteAction}>
      <button type="submit" className="text-red-500">
        Delete List
      </button>
    </form>
  );
};
