"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserTodoAdd() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const submitData = async (e) => {
    // TODO: validate with zod
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch("/api/todo/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      router.push("/user/todo");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={submitData}>
        <h1>New To Do</h1>
        <section>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
        </section>
        <textarea
          cols={50}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={8}
          value={content}
        />
        <section>
          <input disabled={!content || !title} type="submit" value="Add" />
          <a
            className="back"
            href="#"
            onClick={() => router.push("/user/todo")}
          >
            or Cancel
          </a>
        </section>
      </form>
    </div>
  );
}
