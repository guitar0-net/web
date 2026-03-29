// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import Link from "next/link";

import type { CoursesList } from "@/features/courses";

import { Logo } from "./logo";
import { MainMenu } from "./main-menu";

type Props = {
  courses: CoursesList;
};

export function Header({ courses }: Props) {
  return (
    <header className="sticky top-0 w-full border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Link href={"/"}>
          <Logo />
        </Link>
        <MainMenu courses={courses} />
        <div />
      </div>
    </header>
  );
}
