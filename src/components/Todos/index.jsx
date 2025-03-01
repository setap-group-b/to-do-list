import { Todo } from "@/components";
import { getServerSessionWrapper, getUserTodos } from "@/utils";

export const Todos = async () => {
  const session = await getServerSessionWrapper();

  if (!session) {
    return <section>Please sign in to see your To-do list!</section>;
  }

  const userTodos = await getUserTodos(session?.user);

  if (!userTodos) {
    return <>Create a To-do to get started!</>;
  }

  return (
    <>
      {userTodos.map((todo) => (
        <div key={todo.id}>
          <Todo todo={todo} />
        </div>
      ))}
    </>
  );
};
