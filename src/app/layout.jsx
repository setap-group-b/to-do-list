import { Roboto } from "next/font/google";

import "./globals.css";
import { cn } from "lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeToggle from "@/components/ThemeToogle";
import { Toaster } from "react-hot-toast";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn(roboto.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ThemeToggle />
        </ThemeProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
