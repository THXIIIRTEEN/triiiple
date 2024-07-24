"use client"

import { useEffect } from "react";
import "./globals.css";
import { usePathname } from "next/navigation";
import { useStore } from "./authorization/data-utils/zustand-functions";

export default function RootLayout({ children }) {

  const pathname = usePathname();
  const store = useStore();

  useEffect(() => {
    store.auth()
  }, [])

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${pathname === "/login" || pathname === "/registration" ? 'background-authorisation' : 'background'}`}>{children}</body>
    </html>
  );
}
