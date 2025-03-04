"use client";

import { deleteTodo } from "@/app/actions/todo";

export const TodoDelete = ({ id, listId }) => {
  const deleteAction = (event) => {
    event.preventDefault(); // Prevent the form from being submitted in the traditional way.
    deleteTodo(id, listId); // Delete the post with the given ID.
  };

  return (
    <form onSubmit={deleteAction}>
      <button type="submit" className="text-sm opacity-30 text-red-500">
        Delete
      </button>
    </form>
  );
};
