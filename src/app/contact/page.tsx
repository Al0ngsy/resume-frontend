import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact — Le Quoc Anh Tran",
  description:
    "Get in touch with Le Quoc Anh Tran. Email, GitHub, and LinkedIn.",
};

export default function ContactPage() {
  return <ContactClient />;
}