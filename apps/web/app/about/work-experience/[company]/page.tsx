import { notFound } from "next/navigation";

import {
  DETAILED_COMPANY_EXPERIENCES,
  getCompanyExperienceBySlug,
} from "@/components/pages/about/company-experience/company-experience-data";
import WorkExperienceDetail from "@/components/pages/about/work-experience-detail/work-experience-detail";
import styles from "@/app/page.module.scss";

export function generateStaticParams() {
  return DETAILED_COMPANY_EXPERIENCES.map((company) => ({
    company: company.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company: slug } = await params;
  const company = getCompanyExperienceBySlug(slug);
  if (!company) return {};
  return {
    title: `${company.displayName} — Work Experience`,
  };
}

export default async function WorkExperienceDetailPage({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company: slug } = await params;
  const company = getCompanyExperienceBySlug(slug);
  if (!company) notFound();

  return (
    <div className={styles.home}>
      <WorkExperienceDetail company={company} />
    </div>
  );
}
