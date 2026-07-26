import type { Metadata } from "next";
import { connection } from "next/server";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact — Lê Quốc Anh Trần",
  description:
    "Get in touch with Lê Quốc Anh Trần. Email, GitHub, and LinkedIn.",
};

export default async function ContactPage() {
  await connection();
  return <ContactClient />;
}
