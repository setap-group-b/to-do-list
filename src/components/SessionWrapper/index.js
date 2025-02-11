// Tell next.js that SessionProvider is a client component
"use client";
import { SessionProvider } from "next-auth/react";
export const SessionWrapper = SessionProvider;
