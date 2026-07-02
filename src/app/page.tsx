import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Le Quoc Anh Tran — Backend Software Engineer",
  description:
    "Portfolio of Le Quoc Anh Tran, a Backend Software Engineer specializing in Node.js, PostgreSQL, and cloud infrastructure.",
};

export default function HomePage() {
  return <HomeClient />;
}