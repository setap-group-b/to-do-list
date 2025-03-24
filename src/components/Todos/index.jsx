import { Todo } from "@/components";
import { getServerSessionWrapper, getUserTodos } from "@/utils";

export const Todos = async ({ listId }) => {
  const session = await getServerSessionWrapper();

  if (!session) {
    return <section>Please sign in to see your To-do list!</section>;
  }

  const userTodos = await getUserTodos(session?.user, listId);

  if (!userTodos) {
    return <p>Create a To-do to get started!</p>;
  }

  return (
    <>
      {userTodos.length ? (
        userTodos.map((todo) => (
          <div key={todo.id}>
            <Todo todo={todo} listId={listId} />
          </div>
        ))
      ) : (
        <p className="m-auto"> No tasks yet </p>
      )}
    </>
  );
};
