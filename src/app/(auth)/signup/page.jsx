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

const Register = () => {
  return (
    <Card className={"w-[min(28rem,_95%)]"}>
      <CardHeader>
        <CardTitle className="text-xl text-center">Welcome</CardTitle>
        <CardDescription className={"text-center"}>
          Enter your details below to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm isSignUp />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500 text-center w-full">
          Already have an account?{" "}
          <Link className="hover:underline" href={"/login"}>
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Register;
