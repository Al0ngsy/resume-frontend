import type { Metadata } from "next";
import { connection } from "next/server";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects — Lê Quốc Anh Trần",
  description:
    "Explore projects by Lê Quốc Anh Trần, including backend systems, APIs, and cloud infrastructure.",
};

export default async function ProjectsPage() {
  await connection();
  return <ProjectsClient />;
}
