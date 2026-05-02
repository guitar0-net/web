// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import Link from "next/link";

import { Logo } from "./logo";
import { MainMenuServer } from "./main-menu";

export function Header() {
  return (
    <header className="bg-background/80 sticky top-0 z-20 w-full border-b backdrop-blur-md">
      <div className="container mx-auto grid grid-cols-3 items-center">
        <Link href={"/"}>
          <Logo />
        </Link>
        <div className="flex justify-center">
          <MainMenuServer />
        </div>
      </div>
    </header>
  );
}
