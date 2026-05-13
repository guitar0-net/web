// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import { type CourseMenuItem } from "./types";

type Props = {
  courses: CourseMenuItem[] | null;
};

export function MainMenuInline({ courses }: Props) {
  return (
    <NavigationMenu className="text-primary">
      <NavigationMenuList className="gap-1">
        {!!courses &&
          courses.map((course) => (
            <NavigationMenuItem key={course.uuid}>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "font-graffiti text-xl md:text-2xl",
                )}
                asChild
              >
                <Link href={`/courses/${course.uuid}`}>{course.title}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        <NavigationMenuItem>
          <NavigationMenuLink
            className={cn(
              navigationMenuTriggerStyle(),
              "font-graffiti text-xl md:text-2xl",
            )}
            asChild
          >
            <Link href="/chords">Аккорды</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
