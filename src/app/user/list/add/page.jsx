"use client";
import { ListForm } from "@/components";
import { createList } from "@/app/actions/list";

export default function UserTodoAdd() {
  return (
    <ListForm
      formAction={createList}
      initialData={{ title: "", backgroundColour: "" }}
    />
  );
}
