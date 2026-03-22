// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import Link from "next/link";

import { Logo } from "@/components/logo";
import { MainMenu } from "@/components/main-menu";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <header className="sticky top-0 w-full border-b">
        <div className="container mx-auto flex items-center justify-between">
          <Link href={"/"}>
            <Logo />
          </Link>
          <MainMenu />
          <div />
        </div>
      </header>
      <main className="flex-1"></main>
      <footer className="flex justify-end p-1">
        <ThemeSwitcher />
      </footer>
    </div>
  );
}
