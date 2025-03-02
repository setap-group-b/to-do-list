"use client";
import { TodoForm } from "@/components";
import { createTodo } from "@/app/actions/todo";

const getDates = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  // getting time units for later use in notification timers etc
  const hour = date.getHours();
  const minute = date.getMinutes() % 10;
  //return (`${year}-${month}-${day}`);
  return (`${day}-${month}-${year}`);
}
  
export default function UserTodoAdd() {
  return (
    <TodoForm
      formAction={createTodo}
      initialData={{
        title: "",
        content: "",
        priority: "",
        deadline: { getDates },
      }}
    />
  );
}
