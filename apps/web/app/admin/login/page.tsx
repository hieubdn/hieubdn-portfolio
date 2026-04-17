import type { Metadata } from "next";
import Login from "@/components/layout/login/login";

export const metadata: Metadata = {
  title: "Admin Login",
};

export default function AdminLoginPage() {
  return <Login />;
}
