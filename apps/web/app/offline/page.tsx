import type { Metadata } from "next";
import { OfflinePageClient } from "./offline-page-client";

export const metadata: Metadata = {
  title: "Offline | hieubdn",
};

export default function OfflinePage() {
  return <OfflinePageClient />;
}
