// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

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
import type { CoursesList } from "@/features/courses";
import { cn } from "@/lib/utils";

type Props = {
  courses: CoursesList | null;
};

export function MainMenu({ courses }: Props) {
  return (
    <NavigationMenu className="font-graffiti text-primary">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-2xl">Курсы</NavigationMenuTrigger>
          <NavigationMenuContent>
            {courses === null ? (
              <p className="text-muted-foreground min-w-64 px-4 py-3 text-sm">
                Сервер недоступен
              </p>
            ) : (
              <ul className="min-w-64">
                {courses.map((course) => (
                  <NavigationMenuLink
                    asChild
                    key={course.uuid}
                    className="text-primary text-xl"
                  >
                    <Link href={`/course/${course.uuid}`}>{course.title}</Link>
                  </NavigationMenuLink>
                ))}
              </ul>
            )}
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuLink
          className={cn(navigationMenuTriggerStyle(), "text-2xl")}
          asChild
        >
          <Link href="/chords">Аккорды</Link>
        </NavigationMenuLink>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
