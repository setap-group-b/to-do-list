"use client";

import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";

const className =
  "w-full space-x-4 dark:bg-white bg-black text-white dark:text-black hover:dark:bg-white hover:text-white hover:bg-black hover:dark:text-black hover:shadow-none py-5";

export function GoogleSignInButton() {
  const handleClick = () => {
    const response = signIn("google");
  };

  return (
    <Button onClick={handleClick} variant={"outline"} className={className}>
      <FcGoogle />
      <p>Continue with Google</p>
    </Button>
  );
}

export function GithubSignInButton() {
  const handleClick = () => {
    signIn("github");
  };

  return (
    <Button onClick={handleClick} variant={"outline"} className={className}>
      <FaGithub />
      <p>Continue with Github</p>
    </Button>
  );
}
