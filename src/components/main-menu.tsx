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
import { cn } from "@/lib/utils";

export function MainMenu() {
  return (
    <NavigationMenu className="font-graffiti text-primary">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-2xl">Курсы</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink asChild className="text-primary text-xl">
              <Link href={"/lessons"}>Уроки</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild className="text-primary text-xl">
              <Link href={"/tracks"}>Разборы</Link>
            </NavigationMenuLink>
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
