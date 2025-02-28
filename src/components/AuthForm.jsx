"use client";

import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import ReusableInput from "./ui/ReusableInput";
import ReusableButton from "./ui/ReusableButton";
import { AuthSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { displayErrorMessage } from "@/utils/displayError";
import { GithubSignInButton, GoogleSignInButton } from "./AuthButtons";

const AuthForm = ({ className, authType }) => {
  const form = useForm({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log({ data });
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (response && !response.error) {
    } else {
      displayErrorMessage(response.error);
    }
  };

  console.log({ form });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="email"
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Email</FormLabel>
                <FormControl>
                  <ReusableInput
                    {...field}
                    type="email"
                    placeholder="Enter Email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Password</FormLabel>
                <FormControl>
                  <ReusableInput
                    {...field}
                    type="password"
                    placeholder="Enter Password"
                    toggleVisibility
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <ReusableButton
          type="button"
          children="Forgot password?"
          variant="link"
          className="float-right px-0 "
        />
        <ReusableButton
          type="submit"
          className="w-full mt-4 py-6"
          // disabled={isLoading}
          title={authType === "login" ? "Log in to account" : "Create account"}
        />
      </form>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border my-6">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <GoogleSignInButton />
        <GithubSignInButton />
      </div>
    </Form>
  );
};

export default AuthForm;
