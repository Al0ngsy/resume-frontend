import type { Metadata } from "next";
import { connection } from "next/server";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects — Le Quoc Anh Tran",
  description:
    "Explore projects by Le Quoc Anh Tran, including backend systems, APIs, and cloud infrastructure.",
};

export default async function ProjectsPage() {
  await connection();
  return <ProjectsClient />;
}