import prisma from "lib/prisma";
import { authOptions } from "@/app/api";
import { getServerSession } from "next-auth";

// TODO: check if NextResponse can be used instead of Response
export async function POST(request) {
  const { title, content } = await request.json();

  const session = await getServerSession(authOptions);

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
