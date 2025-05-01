import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { getServerSessionWrapper } from "@/utils";
import Link from "next/link";

async function LandingPage() {
  const session = await getServerSessionWrapper();

  return (
    <div className="h-screen w-screen p-7 space-y-8">
      <div className="flex items-center justify-between gap-4 h-20">
        <Logo />
        <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          {session ? (
            <Link href={"/dashboard"}>Go to Task Board</Link>
          ) : (
            <Link href={"/login"}>Login / Sign up</Link>
          )}
        </Button>
      </div>
      <div className="flex flex col items-center h-200 justify-around ">
        <h1 className="text-4xl font-bold">Welcome to sorting your life out here is the solution to figure out what to-do</h1>
      </div>
      <div className="flex justify-center w-screen">
      <div className="outline min-w-250 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      </div>
      <div>
        <img src="app/homepage1.PNG" alt="" />
        <img src="app/homepage2.PNG" alt="" />
      </div>
      <div>
      </div>
    </div>
  );
}

export default LandingPage;
