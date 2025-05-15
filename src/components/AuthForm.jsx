"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import ReusableInput from "./ui/ReusableInput";
import ReusableButton from "./ui/ReusableButton";
import { LoginSchema, SignUpSchema } from "lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { displayErrorMessage } from "@/utils/displayError";
import { GithubSignInButton, GoogleSignInButton } from "./AuthButtons";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const AuthForm = ({ isSignUp }) => {
  const router = useRouter();
  const [signUpLoading, setSignUpLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(isSignUp ? SignUpSchema : LoginSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function handleLogin(data) {
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (res && res.error) {
      displayErrorMessage(res.error);
    } else if (res.ok) {
      toast.success("Login successful");
      form.reset();
      router.push("/dashboard");
    }
  }

  const onSubmit = async (formData) => {
    setSignUpLoading(true);
    try {
      if (isSignUp) {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok) {
          toast.success(data.message);
          await handleLogin({
            email: formData.email,
            password: formData.password,
          });
        } else {
          throw new Error(data.error);
        }
      } else {
        const { name, ...signInData } = formData;
        await handleLogin(signInData);
      }
    } catch (error) {
      displayErrorMessage(error);
    } finally {
      setSignUpLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-4">
          {isSignUp && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Name</FormLabel>
                  <FormControl>
                    <ReusableInput
                      {...field}
                      type="name"
                      placeholder="Enter your name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
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
          // disabled={signUpLoading}
          isLoading={signUpLoading}
          title={!isSignUp ? "Log in to account" : "Create account"}
        />
      </form>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border my-6">
        <span className="relative z-10 px-2 text-muted-foreground">Or</span>
      </div>
      <div className="flex flex-col gap-4">
        <GoogleSignInButton />
        <GithubSignInButton />
      </div>
    </Form>
  );
};

export default AuthForm;
