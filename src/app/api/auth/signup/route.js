import { hash } from "bcrypt";
import prisma from "lib/prisma";
import { SignUpSchema } from "lib/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, name, password } = SignUpSchema.parse(body);
    const dbUser = await prisma.user.findFirst({
      where: { email },
    });

    if (dbUser) {
      return NextResponse.json(
        {
          error: "User with this email already exists",
        },
        { status: 409 }
      );
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    const { password: p, ...userData } = newUser;
    return NextResponse.json(
      {
        user: userData,
        message: "Account created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
