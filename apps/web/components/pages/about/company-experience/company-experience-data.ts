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
    keyPrefix: "exp.hdwebsoft",
    logo: hdwebsoftLogo,
    logoAlt: "HDWEBSOFT logo",
    linkUrl: "https://www.linkedin.com/company/hdwebsoft/",
    detailUrl: PATH_URL.ABOUT_WORK_EXPERIENCE_HDWEBSOFT,
    projects: [
      {
        titleKey: "exp.hdwebsoft.projects.convoso.title",
        descriptionKey:
          "exp.hdwebsoft.projects.convoso.subtitle",
        teamSizeKey: "exp.hdwebsoft.projects.convoso.teamSize",
        durationKey: "exp.hdwebsoft.projects.convoso.duration",
        highlightKeys: [
          "exp.hdwebsoft.projects.convoso.highlights.0",
          "exp.hdwebsoft.projects.convoso.highlights.1",
          "exp.hdwebsoft.projects.convoso.highlights.2",
          "exp.hdwebsoft.projects.convoso.highlights.3",
          "exp.hdwebsoft.projects.convoso.highlights.4",
          "exp.hdwebsoft.projects.convoso.highlights.5",
        ],
        image: convosoPoster,
        imageAlt: "Convoso project",
        ctaUrl: WORK_PROJECT_LINKS.HDWEBSOFT_CONVOSO,
      },
      {
        titleKey: "exp.hdwebsoft.projects.poppy.title",
        descriptionKey:
          "exp.hdwebsoft.projects.poppy.subtitle",
        teamSizeKey: "exp.hdwebsoft.projects.poppy.teamSize",
        durationKey: "exp.hdwebsoft.projects.poppy.duration",
        highlightKeys: [
          "exp.hdwebsoft.projects.poppy.highlights.0",
          "exp.hdwebsoft.projects.poppy.highlights.1",
          "exp.hdwebsoft.projects.poppy.highlights.2",
          "exp.hdwebsoft.projects.poppy.highlights.3",
          "exp.hdwebsoft.projects.poppy.highlights.4",
        ],
        image: poppyPoster,
        imageAlt: "Poppy Flowers project",
        ctaUrl: WORK_PROJECT_LINKS.HDWEBSOFT_POPPY,
      },
      {
        titleKey: "exp.hdwebsoft.projects.transit.title",
        descriptionKey:
          "exp.hdwebsoft.projects.transit.subtitle",
        teamSizeKey: "exp.hdwebsoft.projects.transit.teamSize",
        durationKey: "exp.hdwebsoft.projects.transit.duration",
        highlightKeys: [
          "exp.hdwebsoft.projects.transit.highlights.0",
          "exp.hdwebsoft.projects.transit.highlights.1",
          "exp.hdwebsoft.projects.transit.highlights.2",
          "exp.hdwebsoft.projects.transit.highlights.3",
          "exp.hdwebsoft.projects.transit.highlights.4",
          "exp.hdwebsoft.projects.transit.highlights.5",
        ],
        image: cbpoPoster,
        imageAlt: "2D Transit project",
        ctaUrl: WORK_PROJECT_LINKS.HDWEBSOFT_2D_TRANSIT,
      },
    ],
    noteKey: "exp.hdwebsoft.note",
    techLineKeys: ["exp.hdwebsoft.tech"],
  },
  toyar: {
    variant: "detailed",
    keyPrefix: "exp.toyar",
    logo: toyarLogo,
    logoAlt: "Toyar logo",
    linkUrl: "https://www.linkedin.com/company/toyarinc/",
    detailUrl: PATH_URL.ABOUT_WORK_EXPERIENCE_TOYAR,
    projects: [
      {
        titleKey: "exp.toyar.projects.fidovn.title",
        descriptionKey:
          "exp.toyar.projects.fidovn.subtitle",
        teamSizeKey: "exp.toyar.projects.fidovn.teamSize",
        durationKey: "exp.toyar.projects.fidovn.duration",
        highlightKeys: [
          "exp.toyar.projects.fidovn.highlights.0",
          "exp.toyar.projects.fidovn.highlights.1",
          "exp.toyar.projects.fidovn.highlights.2",
          "exp.toyar.projects.fidovn.highlights.3",
          "exp.toyar.projects.fidovn.highlights.4",
          "exp.toyar.projects.fidovn.highlights.5",
          "exp.toyar.projects.fidovn.highlights.6",
        ],
        image: fidovnPoster,
        imageAlt: "FidoVN project",
        ctaUrl: WORK_PROJECT_LINKS.TOYAR_FIDOVN,
      },
      {
        titleKey: "exp.toyar.projects.fidobox.title",
        descriptionKey:
          "exp.toyar.projects.fidobox.subtitle",
        teamSizeKey: "exp.toyar.projects.fidobox.teamSize",
        durationKey: "exp.toyar.projects.fidobox.duration",
        highlightKeys: [
          "exp.toyar.projects.fidobox.highlights.0",
          "exp.toyar.projects.fidobox.highlights.1",
          "exp.toyar.projects.fidobox.highlights.2",
          "exp.toyar.projects.fidobox.highlights.3",
          "exp.toyar.projects.fidobox.highlights.4",
          "exp.toyar.projects.fidobox.highlights.5",
        ],
        image: fidoboxPoster,
        imageAlt: "FidoBox project",
        ctaUrl: WORK_PROJECT_LINKS.TOYAR_FIDOBOX,
      },
    ],
    techLineKeys: ["exp.toyar.tech"],
  },
  optoro: {
    variant: "detailed",
    keyPrefix: "exp.optoro",
    logo: optoroLogo,
    logoAlt: "optoro logo",
    linkUrl: "https://www.linkedin.com/company/optoro-/",
    detailUrl: PATH_URL.ABOUT_WORK_EXPERIENCE_OPTORO,
    responsibilityKeys: [
      "exp.optoro.items.0",
      "exp.optoro.items.1",
      "exp.optoro.items.2",
      "exp.optoro.items.3",
    ],
    techLineKeys: ["exp.optoro.tech"],
  },
  mindx: {
    variant: "simple",
    keyPrefix: "exp.mindx",
    detailUrl: PATH_URL.ABOUT_OTHER_EXPERIENCE_MINDX,
    responsibilityKeys: [
      "exp.mindx.items.0",
      "exp.mindx.items.1",
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
