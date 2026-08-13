import { notFound } from "next/navigation";

import {
  getCompanyExperienceBySlug,
  getCompanyExperienceSlugsFor,
} from "@/components/pages/about/company-experience/company-experience-data";
import WorkExperienceDetail from "@/components/pages/about/work-experience-detail/work-experience-detail";
import { PATH_URL } from "@/config/path";
import { loadLocaleMessages } from "@/lib/i18n/load-messages";

const BASE_PATH = `${PATH_URL.ABOUT}/other-experience`;

export function generateStaticParams() {
  return getCompanyExperienceSlugsFor(BASE_PATH).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = getCompanyExperienceBySlug(BASE_PATH, slug);
  if (!company) return {};

  const messages = await loadLocaleMessages("en");
  return {
    title: messages[`${company.keyPrefix}.position`],
    description: messages[`${company.keyPrefix}.company`],
  };
}

export default async function OtherExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = getCompanyExperienceBySlug(BASE_PATH, slug);
  if (!company) notFound();
  return <WorkExperienceDetail company={company} />;
}
