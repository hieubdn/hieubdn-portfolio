/**
 * Early data-theme only. Do not set document.documentElement.lang here — that must
 * match SSR (cookies + layout) or React 19 hydration will mismatch. Locale
 * `lang` is applied in LocaleProvider; we only mirror localStorage → cookie so the
 * next request can SSR the correct locale.
 *
 * Keys/codes must match:
 * - components/theme/theme-constants.ts (PROFILE_DARK_MODE_STORAGE_KEY)
 * - components/layout/setting/translate/locale-constants.ts
 */
(function () {
  try {
    var dk = "profile-dark-mode";
    var v = localStorage.getItem(dk) || "off";
    var dark =
      v === "on" ||
      (v === "automatic" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light",
    );
    var lk = "profile-locale";
    var codes = ["en", "en-GB", "vi", "ja", "zh-TW", "zh-CN", "ko", "de"];
    var lr = localStorage.getItem(lk);
    if (lr && codes.indexOf(lr) !== -1) {
      var maxAge = 60 * 60 * 24 * 365;
      document.cookie =
        lk +
        "=" +
        encodeURIComponent(lr) +
        ";path=/;max-age=" +
        maxAge +
        ";samesite=lax";
    }
  } catch (e) {
    /* ignore */
  }
})();
