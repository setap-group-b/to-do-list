"use client";

import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import ReusableButton from "./ui/ReusableButton";

export function GoogleSignInButton() {
  const handleClick = () => {
    const response = signIn("google");
  };

  return (
    <ReusableButton
      onClick={handleClick}
      variant={"outline"}
      className={"w-full space-x-4"}
    >
      <FcGoogle />
      <p>Continue with Google</p>
    </ReusableButton>
  );
}

export function GithubSignInButton() {
  const handleClick = () => {
    signIn("github");
  };

  return (
    <ReusableButton
      onClick={handleClick}
      variant={"outline"}
      className={"w-full space-x-4"}
    >
      <FaGithub />
      <p>Continue with Github</p>
    </ReusableButton>
  );
}
