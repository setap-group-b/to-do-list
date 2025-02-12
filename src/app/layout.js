import { Roboto } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { NavMenu, SessionWrapper } from "@/components";
import "./globals.css";

const roboto = Roboto({
  weight: ["100", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  preload: false,
});

export const metadata = {
  title: "team-b-to-list",
  description: "A to-do app.",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={roboto.className}>
        <SessionWrapper session={session}>
          <NavMenu />
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
