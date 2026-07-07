import type { Metadata } from "next";

import AcadifySurvey from "@/components/acadify/acadify-survey";

export const metadata: Metadata = {
  title: "Acadify User Survey",
  description:
    "Acadify User Survey — AI Assistant for Tutors",
};

export default function AcadifySurveyPage() {
  return <AcadifySurvey />;
}
