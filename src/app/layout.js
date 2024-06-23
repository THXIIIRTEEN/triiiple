"use client"

import "./globals.css";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {

  const pathname = usePathname();

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${pathname === "/login" || pathname === "/registration" ? 'background-authorisation' : 'background'}`}>{children}</body>
    </html>
  );
}
