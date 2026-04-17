// scripts/generate-locales.ts
// pnpm generate:locales
import fs from "fs/promises";
import path from "path";

const LOCALES_DIR = path.resolve(process.cwd(), "database/locales");
const SOURCE_FILE = path.join(LOCALES_DIR, "en.json");
const EMAIL = "hieubdn@gmail.com"; // tăng giới hạn lên 10k words/ngày

const TARGET_LANGS = [
  "vi",    // Tiếng Việt
  "ja",    // Tiếng Nhật
  "zh-TW", // Tiếng Trung phồn thể
  "zh-CN", // Tiếng Trung giản thể
  "en-GB", // Tiếng Anh (UK)
  "ko",    // Tiếng Hàn
  "de",    // Tiếng Đức
];

async function readJson(filePath: string): Promise<Record<string, string>> {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf-8"));
  } catch {
    return {};
  }
}

async function translateText(text: string, lang: string): Promise<string> {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${lang}&de=${EMAIL}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.responseStatus !== 200) throw new Error(data.responseDetails);
  return data.responseData.translatedText;
}

async function main() {
  const source = await readJson(SOURCE_FILE);

  // en-GB giống en, copy thẳng không cần dịch
  await fs.writeFile(
    path.join(LOCALES_DIR, "en-GB.json"),
    JSON.stringify(source, null, 2),
    "utf-8"
  );
  console.log("✓ en-GB.json");

  for (const lang of TARGET_LANGS) {
    const targetPath = path.join(LOCALES_DIR, `${lang}.json`);
    const existing = await readJson(targetPath);
    const missingKeys = Object.keys(source).filter((key) => !existing[key]);

    if (missingKeys.length === 0) {
      console.log(`✓ ${lang} — up to date`);
      continue;
    }

    console.log(`Translating ${missingKeys.length} keys → ${lang}`);
    const result = { ...existing };

    for (const key of missingKeys) {
      result[key] = await translateText(source[key], lang);
      await new Promise((r) => setTimeout(r, 1000));
    }

    await fs.writeFile(targetPath, JSON.stringify(result, null, 2), "utf-8");
    console.log(`✓ ${lang}.json`);
  }
}

main().catch(console.error);