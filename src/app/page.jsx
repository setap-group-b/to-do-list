import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { getServerSessionWrapper } from "@/utils";
import Link from "next/link";
import Image from "next/image";
import { ListChecks, Calendar, Users, BarChart3, Clock, CheckCircle2, Shield, Bell, CheckSquare, AlertCircle } from "lucide-react";

async function LandingPage() {
  const session = await getServerSessionWrapper();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30">
      {/* Header Section */}
      <header className="p-6 md:p-8 flex items-center justify-between backdrop-blur-md bg-white/70 dark:bg-gray-900/70 sticky top-0 z-50 shadow-sm border-b border-indigo-100 dark:border-indigo-900/40">
        <Logo className="transform hover:scale-105 transition-transform duration-300" />
        <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-all duration-300 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5">
          {session ? (
            <Link href="/dashboard" className="text-white">Go to Task Board</Link>
          ) : (
            <Link href="/login" className="text-white">Login / Sign up</Link>
          )}
        </Button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 md:py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 -z-10" />
        <h1 className="text-4xl md:text-6xl font-bold max-w-4xl mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 leading-tight">
          Organize Your Tasks with Smart Priority Management
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mb-12 leading-relaxed">
          Streamline your workflow with our intuitive task management platform featuring smart priorities, deadlines, and real-time collaboration.
        </p>
        <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-all duration-300 text-white font-medium px-10 py-4 text-xl rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1">
          <Link href={session ? "/dashboard" : "/signup"}>
            Get Started
          </Link>
        </Button>
      </section>

      {/* Photo Showcase Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-gray-100">
            See It In Action
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <Image 
                src="/dashboard-preview.jpg"
                alt="Dashboard Preview"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">Intuitive Dashboard</h3>
                  <p className="text-white/80">Get a clear overview of all your tasks and priorities</p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <Image 
                src="/task-management.jpg"
                alt="Task Management Interface"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">Smart Task Management</h3>
                  <p className="text-white/80">Organize and track your tasks with ease</p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <Image 
                src="/priority-management.jpg"
                alt="Priority Management Interface"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">Priority Management</h3>
                  <p className="text-white/80">Easily set and manage task priorities with visual indicators</p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <Image 
                src="/collaboration.jpg"
                alt="Team Collaboration"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">Team Collaboration</h3>
                  <p className="text-white/80">Work together seamlessly with your team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Task Status Management Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-gray-100">
            Smart Task Status Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
              <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6">
                <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Pending Tasks</h3>
              <p className="text-gray-600 dark:text-gray-400">Track tasks that need your attention with clear visual indicators.</p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
              <div className="h-12 w-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mb-6">
                <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">In Progress</h3>
              <p className="text-gray-600 dark:text-gray-400">Monitor ongoing tasks and track their development in real-time.</p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
              <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
                <CheckSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Completed</h3>
              <p className="text-gray-600 dark:text-gray-400">Celebrate your achievements with clear completion tracking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Priority System Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-950/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-gray-100">
            Intelligent Priority System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-red-100 dark:border-red-900/30">
              <div className="h-12 w-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-6">
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">High Priority</h3>
              <p className="text-gray-600 dark:text-gray-400">Urgent tasks that require immediate attention.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-yellow-100 dark:border-yellow-900/30">
              <div className="h-12 w-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mb-6">
                <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Medium Priority</h3>
              <p className="text-gray-600 dark:text-gray-400">Important tasks that need attention soon.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-green-100 dark:border-green-900/30">
              <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Low Priority</h3>
              <p className="text-gray-600 dark:text-gray-400">Tasks that can be addressed when time permits.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="h-12 w-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-6">
                <ListChecks className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">No Priority</h3>
              <p className="text-gray-600 dark:text-gray-400">Tasks without specific priority requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Date Handling Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-gray-100">
            Smart Date Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
              <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6">
                <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Deadline Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400">Set and manage deadlines with intuitive date formatting.</p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
              <div className="h-12 w-12 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-6">
                <Bell className="h-6 w-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Smart Notifications</h3>
              <p className="text-gray-600 dark:text-gray-400">Get notified 1 day, 1 week, or 1 month before deadlines.</p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
              <div className="h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6">
                <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Time Management</h3>
              <p className="text-gray-600 dark:text-gray-400">Track time spent on tasks and optimize your workflow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Experience Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-950/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-gray-100">
            Enhanced User Experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-indigo-100 dark:border-indigo-900/40">
              <div className="h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6">
                <div className="h-6 w-6 text-indigo-600 dark:text-indigo-400">🌓</div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Dark/Light Mode</h3>
              <p className="text-gray-600 dark:text-gray-400">Switch between dark and light themes for comfortable viewing.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-indigo-100 dark:border-indigo-900/40">
              <div className="h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6">
                <div className="h-6 w-6 text-indigo-600 dark:text-indigo-400">📱</div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Responsive Design</h3>
              <p className="text-gray-600 dark:text-gray-400">Access your tasks seamlessly across all devices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Management Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-gray-100">
            Secure Data Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
              <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Secure Storage</h3>
              <p className="text-gray-600 dark:text-gray-400">Your data is securely stored and protected.</p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
              <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">User Isolation</h3>
              <p className="text-gray-600 dark:text-gray-400">Each user's data is completely isolated and private.</p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
              <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Data Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400">Track your productivity with detailed analytics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-950/30">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">Ready to Get Organized?</h2>
        <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-all duration-300 text-white font-medium px-12 py-4 text-xl rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1">
          <Link href={session ? "/dashboard" : "/signup"}>
            Start Your Journey
          </Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <Logo className="text-2xl font-bold text-white" />
          </div>
          <div className="flex space-x-8">
            <Link href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-indigo-400 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;

