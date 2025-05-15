"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
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
        <Button className={"cursor-pointer"}>Add collaborators</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">Collaborators</DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
            Collaborators will be able to view, edit and delete tasks in this list
          </DialogDescription>
        </DialogHeader>

        <form action={action} className="w-full space-y-6">
          <section className="space-y-2">
            <ReusableMultiTextInput
              label="Add collaborators"
              value={collaborators}
              name="collaborators"
              changeValue={(value) => {
                setCollaborators(value);
              }}
              placeholder="Type user's email and press enter"
              className="w-full"
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
              <p className="text-sm text-red-500 dark:text-red-400">{formState.errors.collaborators?.join(", ")}</p>
            )}
          </section>

          <div className="flex flex-col gap-3">
            <Button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Save
            </Button>
            <button
              type="button"
              className="text-sm text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                deleteGroup(listId);
              }}
            >
              Remove all collaborators
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCollaborators;
