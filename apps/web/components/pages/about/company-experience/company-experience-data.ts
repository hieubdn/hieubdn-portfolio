import type { StaticImageData } from "next/image";

import cavaLogo from "@/assets/image/about/cava_logo.jpg";
import hdwebsoftLogo from "@/assets/image/about/hdwebsoft_logo.jpg";
import toyarLogo from "@/assets/image/about/toyar_logo.jpg";

export type CompanyProject = {
  headingKey: string;
  jobKeys: readonly string[];
};

type DetailedCompanyExperienceBase = {
  variant: "detailed";
  keyPrefix: string;
  logo: StaticImageData;
  logoAlt: string;
  linkUrl: string;
  techLineKeys: readonly string[];
  /** hdwebsoft intentionally renders without the 16px root gap. */
  noRootGap?: boolean;
};

export type DetailedCompanyExperience = DetailedCompanyExperienceBase &
  (
    | { projects: readonly CompanyProject[]; responsibilityKeys?: undefined }
    | { projects?: undefined; responsibilityKeys: readonly string[] }
  );

export type SimpleCompanyExperience = {
  variant: "simple";
  keyPrefix: string;
  responsibilityKeys: readonly string[];
};

export type CompanyExperienceEntry =
  | DetailedCompanyExperience
  | SimpleCompanyExperience;

export const COMPANY_EXPERIENCES = {
  hdwebsoft: {
    variant: "detailed",
    keyPrefix: "about.page.experience.hdwebsoft",
    logo: hdwebsoftLogo,
    logoAlt: "HDWEBSOFT logo",
    linkUrl: "https://www.linkedin.com/company/hdwebsoft/",
    noRootGap: true,
    projects: [
      {
        headingKey: "about.page.experience.hdwebsoft.project.0",
        jobKeys: [
          "about.page.experience.hdwebsoft.project.job.0",
          "about.page.experience.hdwebsoft.project.job.1",
          "about.page.experience.hdwebsoft.project.job.2",
          "about.page.experience.hdwebsoft.project.job.3",
        ],
      },
      {
        headingKey: "about.page.experience.hdwebsoft.project.1",
        jobKeys: [
          "about.page.experience.hdwebsoft.project.job.4",
          "about.page.experience.hdwebsoft.project.job.5",
          "about.page.experience.hdwebsoft.project.job.6",
          "about.page.experience.hdwebsoft.project.job.7",
          "about.page.experience.hdwebsoft.project.job.8",
        ],
      },
      {
        headingKey: "about.page.experience.hdwebsoft.project.2",
        jobKeys: [],
      },
    ],
    techLineKeys: ["about.page.experience.hdwebsoft.tech.tech"],
  },
  toyar: {
    variant: "detailed",
    keyPrefix: "about.page.experience.toyar",
    logo: toyarLogo,
    logoAlt: "Toyar logo",
    linkUrl: "https://www.linkedin.com/company/toyarinc/",
    projects: [
      {
        headingKey: "about.page.experience.toyar.project.1",
        jobKeys: [
          "about.page.experience.toyar.project.job.6",
          "about.page.experience.toyar.project.job.7",
          "about.page.experience.toyar.project.job.8",
          "about.page.experience.toyar.project.job.9",
          "about.page.experience.toyar.project.job.10",
          "about.page.experience.toyar.project.job.11",
          "about.page.experience.toyar.project.job.12",
        ],
      },
      {
        headingKey: "about.page.experience.toyar.project.0",
        jobKeys: [
          "about.page.experience.toyar.project.job.0",
          "about.page.experience.toyar.project.job.1",
          "about.page.experience.toyar.project.job.2",
          "about.page.experience.toyar.project.job.3",
          "about.page.experience.toyar.project.job.4",
          "about.page.experience.toyar.project.job.5",
        ],
      },
    ],
    techLineKeys: ["about.page.experience.toyar.tech"],
  },
  cava: {
    variant: "detailed",
    keyPrefix: "about.page.experience.cava",
    logo: cavaLogo,
    logoAlt: "CAVA logo",
    linkUrl: "https://www.linkedin.com/company/cava-/",
    responsibilityKeys: [
      "about.page.experience.cava.responsibility.0",
      "about.page.experience.cava.responsibility.1",
      "about.page.experience.cava.responsibility.2",
      "about.page.experience.cava.responsibility.3",
      "about.page.experience.cava.responsibility.4",
    ],
    techLineKeys: ["about.page.experience.cava.tech"],
  },
  mindx: {
    variant: "simple",
    keyPrefix: "about.page.experience.mindx",
    responsibilityKeys: [
      "about.page.experience.mindx.responsibility.0",
      "about.page.experience.mindx.responsibility.1",
    ],
  },
} as const satisfies Record<string, CompanyExperienceEntry>;
