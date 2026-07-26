import type { Metadata } from "next";
import { connection } from "next/server";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About — Lê Quốc Anh Trần",
  description:
    "Learn about Lê Quốc Anh Trần's career, engineering philosophy, and technical background.",
};

export default async function AboutPage() {
  await connection();
  return <AboutClient />;
}
