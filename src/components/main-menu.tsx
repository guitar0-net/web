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
import { coursesApi, type CoursesList } from "@/features/courses";
import { cn } from "@/lib/utils";

export async function MainMenu() {
  let courses: CoursesList | null = null;
  try {
    courses = await coursesApi.fetchCourses();
  } catch (error) {
    console.error("[MainMenu] Failed to fetch courses:", error);
  }

  return (
    <NavigationMenu className="font-graffiti text-primary">
      <NavigationMenuList>
        <NavigationMenuItem>
          {courses !== null && courses.length > 0 ? (
            <>
              <NavigationMenuTrigger className="text-2xl">Курсы</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="min-w-64">
                  {courses.map((course) => (
                    <li key={course.uuid}>
                      <NavigationMenuLink asChild className="text-primary text-xl">
                        <Link href={`/course/${course.uuid}`}>{course.title}</Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </>
          ) : (
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle(), "text-2xl")}
              asChild
            >
              <Link href="/courses">Курсы</Link>
            </NavigationMenuLink>
          )}
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={cn(navigationMenuTriggerStyle(), "text-2xl")}
            asChild
          >
            <Link href="/chords">Аккорды</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
