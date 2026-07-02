import type { Metadata } from "next";
import ResumeClient from "./ResumeClient";

export const metadata: Metadata = {
  title: "Resume — Le Quoc Anh Tran",
  description:
    "Professional experience and resume of Le Quoc Anh Tran, Backend Software Engineer.",
};

export default function ResumePage() {
  return <ResumeClient />;
}