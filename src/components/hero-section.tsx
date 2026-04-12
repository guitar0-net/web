// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import Link from "next/link";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center py-16 md:py-24">
      <div className="container px-4">
        <h1 className="mb-4 flex flex-col items-start text-5xl font-bold tracking-tight md:text-7xl">
          <span className="block md:inline">Научись</span>{" "}
          <span className="text-primary">играть на гитаре</span>
        </h1>
        <p className="text-muted-foreground mb-6 text-3xl md:text-4xl">
          Бесплатно. С нуля. Для любого уровня.
        </p>
        <p className="text-muted-foreground mb-10 max-w-2xl text-lg md:text-xl">
          Структурированные уроки для начинающих. Смотри видео-уроки и выполняй задания.
          50 уроков от профессионального музыканта.
        </p>
        <Button asChild size="lg" className="h-12 px-8 text-lg">
          <Link href="/courses">Начать обучение</Link>
        </Button>
      </div>
    </section>
  );
}
