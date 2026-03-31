import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact | Anthony Contreras",
  description:
    "Get in touch with Anthony Contreras for internships, freelance work, or full-time opportunities. Email, social links, and resume download.",
  openGraph: {
    title: "Contact | Anthony Contreras",
    description:
      "Get in touch with Anthony Contreras for internships, freelance work, or full-time opportunities. Email, social links, and resume download.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Anthony Contreras",
    description:
      "Get in touch with Anthony Contreras for internships, freelance work, or full-time opportunities. Email, social links, and resume download.",
  },
};

export default function Page() {
  return <ContactClient />;
}
