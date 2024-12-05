import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import HeadBar from "./components/head-bar";
import Sidebar from "./components/head-bar/sidebar";
import AuthProvider from "./components/auth-provider";
import Loading from "@/app/components/loading";

export const metadata: Metadata = {
  title: "연투밋",
  description: "연세인을 위한 시간 약속 조합 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko" className={"bg-neutral-50 w-screen overflow-y-hidden"}>
      <body>
        <AuthProvider>
          <HeadBar />
          <Sidebar />
          {children}
          <Loading />
        </AuthProvider>
      </body>
    </html>
  );
}
