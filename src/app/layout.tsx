// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

import { Header } from "@/components/header";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin", "cyrillic"], variable: "--font-sans" });

const debby = localFont({
  src: [{ path: "../../public/fonts/Debby.ttf" }],
  variable: "--font-debby",
});

const graffiti = localFont({
  src: [{ path: "../../public/fonts/SpriteGraffiti.ttf" }],
  variable: "--font-graffiti",
});

export const metadata: Metadata = {
  title: "Гитара с нуля",
  description:
    "Учись играть на гитаре с нуля — уроки для начинающих, аккорды, табулатуры и упражнения.",
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Readonly<Props>) {
  return (
    <html
      suppressHydrationWarning
      lang="ru"
      className={cn("font-sans", geist.variable, debby.variable, graffiti.variable)}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <div className="flex flex-1 flex-col">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
