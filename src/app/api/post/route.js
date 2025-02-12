import { authOptions } from "@/app/api";
import prisma from "lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const { title, content } = await request.json();

  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
  });

  return new Response(JSON.stringify(result), { status: 201 });
}
