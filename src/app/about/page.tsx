import type { Metadata } from "next";
import { connection } from "next/server";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About — Le Quoc Anh Tran",
  description:
    "Learn about Le Quoc Anh Tran's career, engineering philosophy, and technical background.",
};

export default async function AboutPage() {
  await connection();
  return <AboutClient />;
}