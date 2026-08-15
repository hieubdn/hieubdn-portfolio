import type { StaticImageData } from "next/image";

import { PATH_URL, WORK_PROJECT_LINKS } from "@/config/path";
import optoroLogo from "@/assets/image/about/optoro_logo.jpg";
import hdwebsoftLogo from "@/assets/image/about/hdwebsoft_logo.jpg";
import toyarLogo from "@/assets/image/about/toyar_logo.jpg";
import mindxLogo from "@/assets/image/about/logoMindx.jpg";
import convosoPoster from "@/assets/image/about/project/Convoso.png";
import poppyPoster from "@/assets/image/about/project/poppy.webp";
import cbpoPoster from "@/assets/image/about/project/CBPO.png";
import fidovnPoster from "@/assets/image/about/project/fidovn.jpg";
import fidoboxPoster from "@/assets/image/about/project/fidobox.jpg";
import mindxLecturerPoster from "@/assets/image/about/project/mindx01.jpg";
import mindxManagerPoster from "@/assets/image/about/project/mindx02.jpg";

export type CompanyProject = {
  titleKey: string;
  descriptionKey?: string;
  teamSizeKey?: string;
  durationKey?: string;
  highlightKeys: readonly string[];
  image?: StaticImageData;
  video?: string;
  imageAlt: string;
  ctaUrl?: string;
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
        titleKey: "exp.hdwebsoft.convoso.title",
        descriptionKey:
          "exp.hdwebsoft.convoso.subtitle",
        teamSizeKey: "exp.hdwebsoft.convoso.teamSize",
        durationKey: "exp.hdwebsoft.convoso.duration",
        highlightKeys: [
          "exp.hdwebsoft.convoso.highlights.0",
          "exp.hdwebsoft.convoso.highlights.1",
          "exp.hdwebsoft.convoso.highlights.2",
          "exp.hdwebsoft.convoso.highlights.3",
          "exp.hdwebsoft.convoso.highlights.4",
          "exp.hdwebsoft.convoso.highlights.5",
        ],
        image: convosoPoster,
        imageAlt: "Convoso project",
        ctaUrl: WORK_PROJECT_LINKS.CONVOSO,
      },
      {
        titleKey: "exp.hdwebsoft.poppy.title",
        descriptionKey:
          "exp.hdwebsoft.poppy.subtitle",
        teamSizeKey: "exp.hdwebsoft.poppy.teamSize",
        durationKey: "exp.hdwebsoft.poppy.duration",
        highlightKeys: [
          "exp.hdwebsoft.poppy.highlights.0",
          "exp.hdwebsoft.poppy.highlights.1",
          "exp.hdwebsoft.poppy.highlights.2",
          "exp.hdwebsoft.poppy.highlights.3",
          "exp.hdwebsoft.poppy.highlights.4",
        ],
        image: poppyPoster,
        imageAlt: "Poppy Flowers project",
        ctaUrl: WORK_PROJECT_LINKS.POPPY,
      },
      {
        titleKey: "exp.hdwebsoft.transit.title",
        descriptionKey:
          "exp.hdwebsoft.transit.subtitle",
        teamSizeKey: "exp.hdwebsoft.transit.teamSize",
        durationKey: "exp.hdwebsoft.transit.duration",
        highlightKeys: [
          "exp.hdwebsoft.transit.highlights.0",
          "exp.hdwebsoft.transit.highlights.1",
          "exp.hdwebsoft.transit.highlights.2",
          "exp.hdwebsoft.transit.highlights.3",
          "exp.hdwebsoft.transit.highlights.4",
          "exp.hdwebsoft.transit.highlights.5",
        ],
        image: cbpoPoster,
        imageAlt: "2D Transit project",
        ctaUrl: WORK_PROJECT_LINKS.HD_2D_TRANSIT,
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
        titleKey: "exp.toyar.fidovn.title",
        descriptionKey:
          "exp.toyar.fidovn.subtitle",
        teamSizeKey: "exp.toyar.fidovn.teamSize",
        durationKey: "exp.toyar.fidovn.duration",
        highlightKeys: [
          "exp.toyar.fidovn.highlights.0",
          "exp.toyar.fidovn.highlights.1",
          "exp.toyar.fidovn.highlights.2",
          "exp.toyar.fidovn.highlights.3",
          "exp.toyar.fidovn.highlights.4",
          "exp.toyar.fidovn.highlights.5",
          "exp.toyar.fidovn.highlights.6",
        ],
        image: fidovnPoster,
        imageAlt: "FidoVN project",
        ctaUrl: WORK_PROJECT_LINKS.TOYAR_FIDOVN,
      },
      {
        titleKey: "exp.toyar.fidobox.title",
        descriptionKey:
          "exp.toyar.fidobox.subtitle",
        teamSizeKey: "exp.toyar.fidobox.teamSize",
        durationKey: "exp.toyar.fidobox.duration",
        highlightKeys: [
          "exp.toyar.fidobox.highlights.0",
          "exp.toyar.fidobox.highlights.1",
          "exp.toyar.fidobox.highlights.2",
          "exp.toyar.fidobox.highlights.3",
          "exp.toyar.fidobox.highlights.4",
          "exp.toyar.fidobox.highlights.5",
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
    variant: "detailed",
    keyPrefix: "exp.mindx",
    logo: mindxLogo,
    logoAlt: "MindX Technology School logo",
    linkUrl: "https://mindx.edu.vn/",
    detailUrl: PATH_URL.ABOUT_OTHER_EXPERIENCE_MINDX,
    projects: [
      {
        titleKey: "exp.mindx.lecturer.title",
        highlightKeys: [
          "exp.mindx.highlights.1",
          "exp.mindx.highlights.2",
          "exp.mindx.highlights.3",
          "exp.mindx.highlights.4",
        ],
        image: mindxLecturerPoster,
        imageAlt: "Lecturer at MindX Technology School",
      },
      {
        titleKey: "exp.mindx.manager.title",
        highlightKeys: [
          "exp.mindx.highlights.5",
          "exp.mindx.highlights.6",
          "exp.mindx.highlights.7",
          "exp.mindx.highlights.8",
        ],
        image: mindxManagerPoster,
        imageAlt: "Teaching Manager at MindX Technology School",
      },
    ],
    techLineKeys: ["exp.mindx.tech"],
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
