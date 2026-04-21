import { type ReactNode } from "react";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";
import MainContent from "@/components/layout/main-content/main-content";
import layoutStyles from "./layout.module.scss";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className={`${layoutStyles.shell} ${layoutStyles.mainApp}`}>
      <Header />
      <MainContent className={layoutStyles.main}>{children}</MainContent>
      <Footer />
    </div>
  );
}
