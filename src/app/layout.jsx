import { Roboto } from "next/font/google";
import { getServerSessionWrapper } from "@/utils";

import { Nav, SessionWrapper } from "@/components";

import "./globals.css";

const roboto = Roboto({
  weight: ["100", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  preload: false,
});

export const metadata = {
  title: "Team B To Do List",
  description: "A to-do app.",
};

export default async function RootLayout({ children }) {
  const session = await getServerSessionWrapper();

  return (
    <html lang="en">
      <body className={roboto.className}>
        <SessionWrapper session={session}>
          <Nav />
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
