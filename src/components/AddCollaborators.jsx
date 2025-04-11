"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReusableMultiTextInput from "./ui/ReusableMultiTextInput";
import { Button } from "./ui/button";
import { useActionState, useState } from "react";
import { createGroup, deleteGroup } from "@/app/actions/group";

const AddCollaborators = ({ listId, user, listCollaborators }) => {
  const addCollab = createGroup.bind(null, listId);
  const [formState, action] = useActionState(addCollab, {
    errors: {},
  });
  const [collaborators, setCollaborators] = useState(listCollaborators || []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add collaborators</Button>
      </DialogTrigger>
      <DialogContent className={"flex flex-col gap-7"}>
        <DialogHeader>
          <DialogTitle>Collaborators</DialogTitle>
          <DialogDescription>
            Collaborators will be able to view, edit and delete tasks in this
            list
          </DialogDescription>
        </DialogHeader>

        <form action={action} className="w-full flex flex-col gap-7">
          <section className="flex flex-col gap-2">
            <ReusableMultiTextInput
              label="Add collaborators"
              value={collaborators}
              name="collaborators"
              changeValue={(value) => {
                setCollaborators(value);
              }}
              placeholder={"Type user's email and press enter"}
            />
            <input
              type="hidden"
              name="collaborators"
              value={JSON.stringify(
                collaborators?.filter(
                  (email) => email.toLowerCase() !== user?.email.toLowerCase()
                )
              )}
            />
            {formState.errors.collaborators && (
              <p>{formState.errors.collaborators?.join(", ")}</p>
            )}
          </section>

          <Button className={"p-3 w-full bg-gray-200"}>Save</Button>
        </form>
        <p
          className="text-red-500 text-[0.8rem] text-center cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            deleteGroup(listId);
          }}
        >
          Remove all collaborators{" "}
        </p>
      </DialogContent>
      <DialogFooter></DialogFooter>
    </Dialog>
  );
};

export default AddCollaborators;
