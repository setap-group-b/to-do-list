import prisma from "lib/prisma";
import { getServerSessionWrapper } from "@/utils";

// TODO: check if NextResponse can be used instead of Response
export async function POST(request) {
  const { title, content } = await request.json();

  const session = await getServerSessionWrapper();

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const result = await prisma.todo.create({
    data: {
      title: title,
      content: content,
      user: { connect: { email: session?.user?.email } },
    },
  });

  return new Response(JSON.stringify(result), { status: 201 });
}
