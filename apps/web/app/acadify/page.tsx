import type { Metadata } from "next";

import Acadify from "@/components/acadify/acadify";

export const metadata: Metadata = {
  title: "Acadify",
  description:
    "Automated test creation & grading that saves private tutors hours every week.",
};

export default function AcadifyPage() {
  return <Acadify />;
}