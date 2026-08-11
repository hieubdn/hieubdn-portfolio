import type { StaticImageData } from "next/image";

import { PATH_URL, WORK_PROJECT_LINKS } from "@/config/path";
import optoroLogo from "@/assets/image/about/optoro_logo.jpg";
import hdwebsoftLogo from "@/assets/image/about/hdwebsoft_logo.jpg";
import toyarLogo from "@/assets/image/about/toyar_logo.jpg";
import convosoPoster from "@/assets/image/about/project/Convoso.png";
import cbpoPoster from "@/assets/image/about/project/CBPO.png";
import fidovnPoster from "@/assets/image/about/project/fidovn.jpg";
import fidoboxPoster from "@/assets/image/about/project/fidobox.jpg";

export type CompanyProject = {
  headingKey: string;
  descriptionKey?: string;
  jobKeys: readonly string[];
  image?: StaticImageData;
  video?: string;
  imageAlt: string;
  ctaUrl: string;
};

type DetailedCompanyExperienceBase = {
  variant: "detailed";
  keyPrefix: string;
  logo: StaticImageData;
  logoAlt: string;
  linkUrl: string;
  techLineKeys: readonly string[];
  detailUrl: string;
  noteKey?: string;
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
  detailUrl: string;
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
    detailUrl: PATH_URL.ABOUT_WORK_EXPERIENCE_HDWEBSOFT,
    projects: [
      {
        headingKey: "about.page.experience.hdwebsoft.project.0",
        descriptionKey: "about.page.experience.hdwebsoft.project.0.description",
        jobKeys: [
          "about.page.experience.hdwebsoft.project.job.0",
          "about.page.experience.hdwebsoft.project.job.1",
          "about.page.experience.hdwebsoft.project.job.2",
          "about.page.experience.hdwebsoft.project.job.3",
          "about.page.experience.hdwebsoft.project.job.4",
          "about.page.experience.hdwebsoft.project.job.5",
        ],
        image: convosoPoster,
        imageAlt: "Convoso project",
        ctaUrl: WORK_PROJECT_LINKS.HDWEBSOFT_CONVOSO,
      },
      {
        headingKey: "about.page.experience.hdwebsoft.project.1",
        descriptionKey: "about.page.experience.hdwebsoft.project.1.description",
        jobKeys: [
          "about.page.experience.hdwebsoft.project.job.6",
          "about.page.experience.hdwebsoft.project.job.7",
          "about.page.experience.hdwebsoft.project.job.8",
          "about.page.experience.hdwebsoft.project.job.9",
          "about.page.experience.hdwebsoft.project.job.10",
        ],
        video: "/videos/poppy.mp4",
        imageAlt: "Poppy Flowers project",
        ctaUrl: WORK_PROJECT_LINKS.HDWEBSOFT_POPPY,
      },
      {
        headingKey: "about.page.experience.hdwebsoft.project.2",
        descriptionKey: "about.page.experience.hdwebsoft.project.2.description",
        jobKeys: [
          "about.page.experience.hdwebsoft.project.job.11",
          "about.page.experience.hdwebsoft.project.job.12",
          "about.page.experience.hdwebsoft.project.job.13",
          "about.page.experience.hdwebsoft.project.job.14",
          "about.page.experience.hdwebsoft.project.job.15",
          "about.page.experience.hdwebsoft.project.job.16",
          "about.page.experience.hdwebsoft.project.job.17",
        ],
        image: cbpoPoster,
        imageAlt: "2D Transit project",
        ctaUrl: WORK_PROJECT_LINKS.HDWEBSOFT_2D_TRANSIT,
      },
    ],
    noteKey: "about.page.experience.hdwebsoft.project.3",
    techLineKeys: ["about.page.experience.hdwebsoft.tech.tech"],
  },
  toyar: {
    variant: "detailed",
    keyPrefix: "about.page.experience.toyar",
    logo: toyarLogo,
    logoAlt: "Toyar logo",
    linkUrl: "https://www.linkedin.com/company/toyarinc/",
    detailUrl: PATH_URL.ABOUT_WORK_EXPERIENCE_TOYAR,
    projects: [
      {
        headingKey: "about.page.experience.toyar.project.1",
        descriptionKey: "about.page.experience.toyar.project.1.description",
        jobKeys: [
          "about.page.experience.toyar.project.job.6",
          "about.page.experience.toyar.project.job.7",
          "about.page.experience.toyar.project.job.8",
          "about.page.experience.toyar.project.job.9",
          "about.page.experience.toyar.project.job.10",
          "about.page.experience.toyar.project.job.11",
          "about.page.experience.toyar.project.job.12",
        ],
        image: fidovnPoster,
        imageAlt: "FidoVN project",
        ctaUrl: WORK_PROJECT_LINKS.TOYAR_FIDOVN,
      },
      {
        headingKey: "about.page.experience.toyar.project.0",
        descriptionKey: "about.page.experience.toyar.project.0.description",
        jobKeys: [
          "about.page.experience.toyar.project.job.0",
          "about.page.experience.toyar.project.job.1",
          "about.page.experience.toyar.project.job.2",
          "about.page.experience.toyar.project.job.3",
          "about.page.experience.toyar.project.job.4",
          "about.page.experience.toyar.project.job.5",
        ],
        image: fidoboxPoster,
        imageAlt: "FidoBox project",
        ctaUrl: WORK_PROJECT_LINKS.TOYAR_FIDOBOX,
      },
    ],
    techLineKeys: ["about.page.experience.toyar.tech"],
  },
  optoro: {
    variant: "detailed",
    keyPrefix: "about.page.experience.optoro",
    logo: optoroLogo,
    logoAlt: "optoro logo",
    linkUrl: "https://www.linkedin.com/company/optoro-/",
    detailUrl: PATH_URL.ABOUT_WORK_EXPERIENCE_OPTORO,
    responsibilityKeys: [
      "about.page.experience.optoro.responsibility.0",
      "about.page.experience.optoro.responsibility.1",
      "about.page.experience.optoro.responsibility.2",
      "about.page.experience.optoro.responsibility.3",
    ],
    techLineKeys: ["about.page.experience.optoro.tech"],
  },
  mindx: {
    variant: "simple",
    keyPrefix: "about.page.experience.mindx",
    detailUrl: PATH_URL.ABOUT_OTHER_EXPERIENCE_MINDX,
    responsibilityKeys: [
      "about.page.experience.mindx.responsibility.0",
      "about.page.experience.mindx.responsibility.1",
    ],
  },
} as const satisfies Record<string, CompanyExperienceEntry>;

export function getCompanyExperienceBySlug(
  basePath: string,
  slug: string,
): CompanyExperienceEntry | undefined {
  return Object.values(COMPANY_EXPERIENCES).find(
    (company) => company.detailUrl === `${basePath}/${slug}`,
  );
}

export function getCompanyExperienceSlugsFor(basePath: string): string[] {
  return Object.values(COMPANY_EXPERIENCES)
    .filter((company) => company.detailUrl.startsWith(`${basePath}/`))
    .map((company) => company.detailUrl.slice(basePath.length + 1));
}
