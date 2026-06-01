export type ProjectData = {
  slug: string;
  name: string;
  category: string;
  description: string;
  design: string | string[];
  client: string | string[];
  projectUrl: string;
};

// Order matches the visual grid reading order (left→right, top→bottom):
// walker | khora | tryotel
// flight | poppy | thought
// travel | tapy  | granada
// fidovn
export const PROJECTS_DATA: readonly ProjectData[] = [
  {
    slug: "walkerip",
    name: "Walker IP Pty Ltd",
    category: "Web Development",
    description:
      "Walker IP is an Australian intellectual property law firm website that provides patent, trademark, and industrial design registration services for startups and large enterprises. The firm specializes in engineering, technology, biotechnology, and medical device innovations.",
    design: "Neon Collective",
    client: "Neon Collective",
    projectUrl: "https://www.walkerip.com/",
  },
  {
    slug: "khora",
    name: "Khora – Urban Thinkers Consulting Firm",
    category: "Web Development",
    description:
      "Khora is a Spanish urban consulting company that addresses city development challenges through a creative process of discovery, experimentation, and scaling. Its mission is to build smarter, more sustainable, and better-connected cities.",
    design: "Khora",
    client: "Khora",
    projectUrl: "https://khoraurbanthinkers.es/",
  },
  {
    slug: "tryotel",
    name: "Tryotel Web (B2C)",
    category: "Web & App Development",
    description:
      "Tryotel is a Bangladesh-based B2C travel platform that enables users to book flights, holiday packages, visas, and hotels online. The platform integrates promotional campaigns, multiple payment methods, and cross-platform mobile applications.",
    design: "BLoC pattern",
    client: "Saimon Global",
    projectUrl: "https://tryotel.com/",
  },
  {
    slug: "flightlocal",
    name: "Flight Local (B2B Travel)",
    category: "Web Development",
    description:
      "Flight Local is a B2B travel portal designed for travel agencies, enabling flight, hotel, holiday package, and visa bookings. The platform supports booking queue management, payment processing, markup configuration, and real-time reporting.",
    design: "Saimon Global",
    client: "Flight Local",
    projectUrl: "https://flightlocal.com/",
  },
  {
    slug: "poppy",
    name: "Poppy Flowers",
    category: "Web Development",
    description:
      "Poppy is a wedding floral service platform that allows couples to browse floral products, build custom wedding flower proposals, receive transparent pricing, and book full-service floral design, delivery, and setup for their wedding events.",
    design: ["Leah Haile", "Vineet Gupta"],
    client: "Poppy Flowers",
    projectUrl: "https://www.poppyflowers.com/",
  },
  {
    slug: "thought",
    name: "A Higher Thought",
    category: "Web Development",
    description:
      "A Higher Thought is an online inspiration platform offering motivational videos, memes, articles, and positive products. Users can explore and share content across social media to spread encouragement and uplift communities.",
    design: "Unknown",
    client: "A Higher Thought",
    projectUrl: "https://ahigherthought.com/",
  },
  {
    slug: "travel",
    name: "Tryotel – Cross-Platform Travel App",
    category: "Web Development",
    description:
      "Tryotel Mobile App is a B2C travel application that allows users to search and book flights, hotels, and holiday packages on mobile devices. Built with a clean material design and multi-layer navigation, it is tailored for young, active travelers.",
    design: ["BLoC pattern", "CLEAN architecture"],
    client: "Saimon Global",
    projectUrl: "https://play.google.com/store/apps/details?id=com.saimongroup.tryotelapp",
  },
  {
    slug: "tapy",
    name: "Tapy – Download. Connect. Unlock.",
    category: "Web & App Development",
    description:
      "Tapy is a mobile marketing application for small businesses that increases sales by delivering personalized promotions to existing customers. It achieves engagement rates up to 10x higher than email marketing and 7.2x higher than traditional social media channels.",
    design: "Tapy",
    client: "Tapy",
    projectUrl: "https://tapy.co/",
  },
  {
    slug: "granada",
    name: "AI Lab Granada",
    category: "Web Development",
    description:
      "AI Lab Granada is Spain’s AI innovation hub, providing a collaborative platform that helps medium and large enterprises access AI talent, technologies, and applied research to improve efficiency and drive sustainable growth.",
    design: "AI Lab Granada",
    client: "AI Lab Granada",
    projectUrl: "#",
  },
  {
    slug: "fidovn",
    name: "FidoVN - Employment Platform",
    category: "Web & App Development",
    description:
      "Fido is a pet care platform that connects pet owners with local pet care providers, offering services such as dog walking, pet sitting, and grooming. The platform features user profiles, service listings, booking management, and secure payment processing.",
    design: "FidoVN",
    client: "FidoVN",
    projectUrl: "https://www.fidovn.com/",
  }
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return PROJECTS_DATA.find((p) => p.slug === slug);
}
