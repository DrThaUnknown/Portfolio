import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About | Anthony Contreras",
  description:
    "Learn about Anthony Contreras - Mercy University CS student building dependable, human-centered web experiences.",
  openGraph: {
    title: "About | Anthony Contreras",
    description:
      "Learn about Anthony Contreras - Mercy University CS student building dependable, human-centered web experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Anthony Contreras",
    description:
      "Learn about Anthony Contreras - Mercy University CS student building dependable, human-centered web experiences.",
  },
};

export default function Page() {
  return <AboutClient />;
}
