import { authOptions } from "@/app/api";
import { getServerSession } from "next-auth";

export const getServerSessionWrapper = () => getServerSession(authOptions);
