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
    const response = signIn("github");
    console.log({ response });
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

export function CredentialsSignInButton() {
  const handleClick = () => {
    signIn();
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      {/* <Image src={githubLogo} alt="Github Logo" width={20} height={20} /> */}
      <span className="ml-4">Continue with Email</span>
    </button>
  );
}
