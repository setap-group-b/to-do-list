<<<<<<< Updated upstream
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
=======
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { getServerSessionWrapper } from "@/utils";
import Link from "next/link";
import Image from "next/image";

async function LandingPage() {
  const session = await getServerSessionWrapper();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="p-6 md:p-8 flex items-center justify-between">
        <Logo />
        <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity text-white font-medium px-6 py-2 rounded-lg shadow-md">
          {session ? (
            <Link href="/dashboard" className="text-white">Go to Task Board</Link>
          ) : (
            <Link href="/login" className="text-white">Login / Sign up</Link>
          )}
        </Button>
      </header>


      <section className="flex flex-col items-center justify-center py-16 md:py-24 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-bold max-w-3xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Welcome to sorting your life out - the solution to organize what to-do
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-8">
          Streamline your tasks, boost productivity, and stay organized with our intuitive task management platform.
        </p>
        <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity text-white font-medium px-8 py-3 text-lg rounded-lg shadow-lg">
          <Link href={session ? "/dashboard" : "/signup"}>
            Get Started
          </Link>
        </Button>
      </section>

      {/* Divider */}
      <div className="flex justify-center w-full px-8 my-8">
        <div className="h-1 w-full max-w-5xl rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      </div>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 px-6 md:px-12 py-12 max-w-6xl mx-auto">
        <div className="rounded-xl overflow-hidden shadow-lg">
          {/* Use Next.js Image component for better performance */}
          <div className="relative h-64 w-full">
            <Image 
              src="/homepage3.jpg" // Replace with your image path
              alt="Task board dashboard preview"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="p-6 bg-white">
            <h3 className="text-xl font-bold mb-2">Intuitive Task Board</h3>
            <p className="text-gray-700">Organize your tasks with our beautiful drag-and-drop interface</p>
          </div>
        </div>
        
        <div className="rounded-xl overflow-hidden shadow-lg">
          <div className="relative h-64 w-full">
            <Image 
              src="/homepage4.jpg" 
              alt="Task analytics preview"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="p-6 bg-white">
            <h3 className="text-xl font-bold mb-2">Productivity Analytics</h3>
            <p className="text-gray-700">Track your progress and optimize your workflow with detailed reports</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-gray-800">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic text-gray-600 mb-4">"This task management app has completely transformed how I organize my work. The interface is clean and the features are exactly what I needed."</p>
              <p className="font-medium text-gray-800">— Sarah Johnson</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic text-gray-600 mb-4">"I've tried dozens of productivity apps and this one stands out. It's intuitive, beautiful, and helps me stay on track."</p>
              <p className="font-medium text-gray-800">— Michael Chen</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to get organized?</h2>
        <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity text-white font-medium px-8 py-3 text-lg rounded-lg shadow-lg">
          <Link href={session ? "/dashboard" : "/signup"}>
            Start Sorting Your Life Now
          </Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Logo className="text-2xl font-bold text-gray-800" />
          </div>
          <div className="flex space-x-6">
  
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
>>>>>>> Stashed changes
