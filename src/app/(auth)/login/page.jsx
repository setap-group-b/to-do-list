"use client";
import AuthForm from "@/components/AuthForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const Login = () => {
  return (
    <Card className={"w-[min(28rem,_95%)]"}>
      <CardHeader>
        <CardTitle className="text-xl text-center">Welcome Back</CardTitle>
        <CardDescription className={"text-center"}>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm authType={"login"} />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500 text-center w-full">
          Don't have an account?{" "}
          <Link className="hover:underline" href={"/signup"}>
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Login;
