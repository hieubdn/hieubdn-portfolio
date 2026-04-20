export const PATH_URL = {
  ROOT: "/",
  ABOUT: "/about",
  PROJECTS: "/projects",
  CONTACT: "/contact",
  ADMIN: "/admin",
  ADMIN_LOGIN: "/admin/login",
} as const;

export const SOCIAL_LINKS = {
  GITHUB: "https://github.com/hieubdn",
  LINKEDIN: "https://www.linkedin.com/in/hieubdn/",
  INSTAGRAM: "https://www.instagram.com/_hiu.bdn/",
  FACEBOOK: "https://www.facebook.com/hieubdn/",
} as const;

/** Trang admin đã đăng nhập (không gồm /admin/login). */
export function isAdminAppPath(pathname: string | null): boolean {
  if (!pathname) return false;
  if (
    pathname === PATH_URL.ADMIN_LOGIN ||
    pathname.startsWith(`${PATH_URL.ADMIN_LOGIN}/`)
  ) {
    return false;
  }
  return pathname === PATH_URL.ADMIN || pathname.startsWith(`${PATH_URL.ADMIN}/`);
}
