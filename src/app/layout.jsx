import { Roboto } from "next/font/google";
import { SessionWrapper } from "@/components";
import { getServerSessionWrapper } from "@/utils";

import "./globals.css";
import { Toaster } from "react-hot-toast";
import { cn } from "@/utils/utils";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeToggle from "@/components/ThemeToogle";

const roboto = Roboto({
  weight: ["100", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  preload: false,
});

export const metadata = {
  title: "To-do List",
  description: "A To-do app.",
};

export default async function RootLayout({ children }) {
  const session = await getServerSessionWrapper();

  return (
    <html lang="en">
      <body className={cn(roboto.className)}>
        <SessionWrapper session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ThemeToggle />
          </ThemeProvider>
        </SessionWrapper>
        {/* <Toaster position="top-right" /> */}
      </body>
    </html>
  );
}
