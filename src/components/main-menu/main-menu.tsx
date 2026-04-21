// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import { CourseMenuItemLink } from "./course-menu-item";

export type CourseMenuItem = {
  uuid: string;
  title: string;
  description?: string;
  lessons_count: number;
};

type Props = {
  courses: CourseMenuItem[] | null;
};

export function MainMenu({ courses }: Props) {
  return (
    <NavigationMenu className="text-primary">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-graffiti text-2xl">
            Курсы
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            {courses === null ? (
              <p className="text-muted-foreground min-w-64 px-4 py-3 text-sm">
                Сервер недоступен
              </p>
            ) : (
              <ul className="w-72 p-1">
                {courses.map((course) => (
                  <li key={course.uuid}>
                    <CourseMenuItemLink course={course} />
                  </li>
                ))}
              </ul>
            )}
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={cn(navigationMenuTriggerStyle(), "font-graffiti text-2xl")}
            asChild
          >
            <Link href="/chords">Аккорды</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
