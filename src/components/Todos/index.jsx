import { Accordion } from "@/components/ui/accordion";

import { Todo } from "@/components";
import { getServerSessionWrapper, getUserTodos } from "@/utils";
import { priorityObject } from "@/utils/constants";

export const Todos = async ({ type = "list", listId }) => {
  const session = await getServerSessionWrapper();

  if (!session) {
    return <section>Please sign in to see your To-do list!</section>;
  }

  const getCachedUserTodos = async () => {
    "use cache";
    const todos = await getUserTodos(session?.user, listId);
    return todos;
  };

  const userTodos = await getCachedUserTodos();

  if (!userTodos) {
    return <p>Create a To-do to get started!</p>;
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {userTodos.length ? (
        <div className="flex-1 flex flex-col gap-6 justify-between overflow-hidden">
          <div className="flex-1 flex flex-col overflow-y-auto">
            <Accordion
              type="single"
              collapsible
              className="flex-1 flex flex-col gap-4"
            >
              {userTodos.map((todo) => (
                <Todo key={todo.id} type={type} task={todo} listId={listId} />
              ))}
            </Accordion>
          </div>

          <div className="flex justify-center items-center space-x-4">
            {Object.values(priorityObject).map((item, idx) => {
              const colorVar = `--${item
                .split(" ")[0]
                ?.toLowerCase?.()}-priority`;
              return (
                <div className="flex items-center gap-2" key={idx}>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: `oklch(var(${colorVar}))`,
                    }}
                  ></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="m-auto"> No tasks yet </p>
      )}
    </div>
  );
};
