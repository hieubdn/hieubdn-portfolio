import type { StaticImageData } from "next/image";

import { PATH_URL, WORK_PROJECT_LINKS } from "@/config/path";
import optoroLogo from "@/assets/image/about/optoro_logo.jpg";
import hdwebsoftLogo from "@/assets/image/about/hdwebsoft_logo.jpg";
import toyarLogo from "@/assets/image/about/toyar_logo.jpg";
import convosoPoster from "@/assets/image/about/project/Convoso.png";
import poppyPoster from "@/assets/image/about/project/poppy.webp";
import cbpoPoster from "@/assets/image/about/project/CBPO.png";
import fidovnPoster from "@/assets/image/about/project/fidovn.jpg";
import fidoboxPoster from "@/assets/image/about/project/fidobox.jpg";

export type CompanyProject = {
  titleKey: string;
  descriptionKey?: string;
  teamSizeKey: string;
  durationKey: string;
  highlightKeys: readonly string[];
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
        titleKey: "about.page.experience.hdwebsoft.projects.convoso.title",
        descriptionKey:
          "about.page.experience.hdwebsoft.projects.convoso.description",
        teamSizeKey: "about.page.experience.hdwebsoft.projects.convoso.teamSize",
        durationKey: "about.page.experience.hdwebsoft.projects.convoso.duration",
        highlightKeys: [
          "about.page.experience.hdwebsoft.projects.convoso.highlights.0",
          "about.page.experience.hdwebsoft.projects.convoso.highlights.1",
          "about.page.experience.hdwebsoft.projects.convoso.highlights.2",
          "about.page.experience.hdwebsoft.projects.convoso.highlights.3",
          "about.page.experience.hdwebsoft.projects.convoso.highlights.4",
          "about.page.experience.hdwebsoft.projects.convoso.highlights.5",
        ],
        image: convosoPoster,
        imageAlt: "Convoso project",
        ctaUrl: WORK_PROJECT_LINKS.HDWEBSOFT_CONVOSO,
      },
      {
        titleKey: "about.page.experience.hdwebsoft.projects.poppy.title",
        descriptionKey:
          "about.page.experience.hdwebsoft.projects.poppy.description",
        teamSizeKey: "about.page.experience.hdwebsoft.projects.poppy.teamSize",
        durationKey: "about.page.experience.hdwebsoft.projects.poppy.duration",
        highlightKeys: [
          "about.page.experience.hdwebsoft.projects.poppy.highlights.0",
          "about.page.experience.hdwebsoft.projects.poppy.highlights.1",
          "about.page.experience.hdwebsoft.projects.poppy.highlights.2",
          "about.page.experience.hdwebsoft.projects.poppy.highlights.3",
          "about.page.experience.hdwebsoft.projects.poppy.highlights.4",
        ],
        image: poppyPoster,
        imageAlt: "Poppy Flowers project",
        ctaUrl: WORK_PROJECT_LINKS.HDWEBSOFT_POPPY,
      },
      {
        titleKey: "about.page.experience.hdwebsoft.projects.transit.title",
        descriptionKey:
          "about.page.experience.hdwebsoft.projects.transit.description",
        teamSizeKey: "about.page.experience.hdwebsoft.projects.transit.teamSize",
        durationKey: "about.page.experience.hdwebsoft.projects.transit.duration",
        highlightKeys: [
          "about.page.experience.hdwebsoft.projects.transit.highlights.0",
          "about.page.experience.hdwebsoft.projects.transit.highlights.1",
          "about.page.experience.hdwebsoft.projects.transit.highlights.2",
          "about.page.experience.hdwebsoft.projects.transit.highlights.3",
          "about.page.experience.hdwebsoft.projects.transit.highlights.4",
          "about.page.experience.hdwebsoft.projects.transit.highlights.5",
          "about.page.experience.hdwebsoft.projects.transit.highlights.6",
        ],
        image: cbpoPoster,
        imageAlt: "2D Transit project",
        ctaUrl: WORK_PROJECT_LINKS.HDWEBSOFT_2D_TRANSIT,
      },
    ],
    noteKey: "about.page.experience.hdwebsoft.additionalNote",
    techLineKeys: ["about.page.experience.hdwebsoft.tech"],
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
        titleKey: "about.page.experience.toyar.projects.fidovn.title",
        descriptionKey:
          "about.page.experience.toyar.projects.fidovn.description",
        teamSizeKey: "about.page.experience.toyar.projects.fidovn.teamSize",
        durationKey: "about.page.experience.toyar.projects.fidovn.duration",
        highlightKeys: [
          "about.page.experience.toyar.projects.fidovn.highlights.0",
          "about.page.experience.toyar.projects.fidovn.highlights.1",
          "about.page.experience.toyar.projects.fidovn.highlights.2",
          "about.page.experience.toyar.projects.fidovn.highlights.3",
          "about.page.experience.toyar.projects.fidovn.highlights.4",
          "about.page.experience.toyar.projects.fidovn.highlights.5",
          "about.page.experience.toyar.projects.fidovn.highlights.6",
        ],
        image: fidovnPoster,
        imageAlt: "FidoVN project",
        ctaUrl: WORK_PROJECT_LINKS.TOYAR_FIDOVN,
      },
      {
        titleKey: "about.page.experience.toyar.projects.fidobox.title",
        descriptionKey:
          "about.page.experience.toyar.projects.fidobox.description",
        teamSizeKey: "about.page.experience.toyar.projects.fidobox.teamSize",
        durationKey: "about.page.experience.toyar.projects.fidobox.duration",
        highlightKeys: [
          "about.page.experience.toyar.projects.fidobox.highlights.0",
          "about.page.experience.toyar.projects.fidobox.highlights.1",
          "about.page.experience.toyar.projects.fidobox.highlights.2",
          "about.page.experience.toyar.projects.fidobox.highlights.3",
          "about.page.experience.toyar.projects.fidobox.highlights.4",
          "about.page.experience.toyar.projects.fidobox.highlights.5",
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
