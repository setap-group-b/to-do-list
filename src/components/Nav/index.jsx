"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const AuthButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session?.user?.name}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      Not signed in
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export const Nav = () => {
  return (
    <nav>
      <section>
        <Link href="/">Home</Link>
        <Link href="/user/todo">Todo</Link>
      </section>
      <section>
        <AuthButton />
      </section>
    </nav>
  );
};
