import type { Metadata } from "next";
import { connection } from "next/server";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Lê Quốc Anh Trần — Backend Software Engineer",
  description:
    "Portfolio of Lê Quốc Anh Trần, a Backend Software Engineer specializing in Node.js, PostgreSQL, and cloud infrastructure.",
};

export default async function HomePage() {
  await connection();
  return <HomeClient />;
}
