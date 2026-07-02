import type { Metadata } from "next";
import { connection } from "next/server";
import ResumeClient from "./ResumeClient";

export const metadata: Metadata = {
  title: "Resume — Le Quoc Anh Tran",
  description:
    "Professional experience and resume of Le Quoc Anh Tran, Backend Software Engineer.",
};

export default async function ResumePage() {
  await connection();
  return <ResumeClient />;
}