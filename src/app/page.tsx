import type { Metadata } from "next";
import { connection } from "next/server";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Le Quoc Anh Tran — Backend Software Engineer",
  description:
    "Portfolio of Le Quoc Anh Tran, a Backend Software Engineer specializing in Node.js, PostgreSQL, and cloud infrastructure.",
};

export default async function HomePage() {
  await connection();
  return <HomeClient />;
}