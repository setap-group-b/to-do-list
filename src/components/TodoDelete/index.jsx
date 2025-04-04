"use client";

// import { deleteTodo } from "@/app/actions/todo";
import ReusableButton from "../ui/ReusableButton";

export const TodoDelete = ({ id, listId }) => {
  <ReusableButton
    variant="destructive"
    title={"Delete"}
    onClick={(e) => {
      e.preventDefault(); // Prevent the form from being submitted in the traditional way.
      // deleteTodo(id, listId);
    }}
  />;
};
