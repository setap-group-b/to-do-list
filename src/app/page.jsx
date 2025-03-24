import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { getServerSessionWrapper } from "@/utils";
import Link from "next/link";

async function LandingPage() {
  const session = await getServerSessionWrapper();

  return (
    <div className="h-screen w-screen p-7 space-y-8">
      <div className="flex items-center justify-between gap-4">
        <Logo />
        <Button>
          {session ? (
            <Link href={"/dashboard"}>Go to Task Board</Link>
          ) : (
            <Link href={"/login"}>Login / Sign up</Link>
          )}
        </Button>
      </div>
      <div>
        <h1>This is the home page</h1>
      </div>
    </div>
  );
}

export default LandingPage;
