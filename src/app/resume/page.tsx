import type { Metadata } from "next";
import { connection } from "next/server";
import ResumeClient from "./ResumeClient";

export const metadata: Metadata = {
  title: "Resume — Lê Quốc Anh Trần",
  description:
    "Professional experience and resume of Lê Quốc Anh Trần, Backend Software Engineer.",
};

export default async function ResumePage() {
  await connection();
  return <ResumeClient />;
}
