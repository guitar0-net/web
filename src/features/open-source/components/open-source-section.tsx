// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import Link from "next/link";
import {
  FaCode,
  FaGithub,
  FaGlobe,
  FaHourglassHalf,
  FaMobileAlt,
  FaPython,
  FaReact,
  FaServer,
} from "react-icons/fa";
import { SiDjango, SiNextdotjs, SiTypescript } from "react-icons/si";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GITHUB_BACKEND_URL, GITHUB_URL, GITHUB_WEB_URL } from "@/lib/constants";

export function OpenSourceSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <Card className="mx-auto max-w-4xl overflow-hidden border-2">
          <div className="grid md:grid-cols-[3fr_2fr]">
            <div className="flex flex-col gap-6 p-8 md:p-12">
              <div className="bg-primary/10 text-primary flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium">
                <FaCode className="size-4" />
                <span>100% Open Source</span>
              </div>

              <div>
                <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                  Открытый исходный код
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                  guitar0.net — полностью открытый проект. Сообщайте об ошибках,
                  предлагайте идеи или помогайте развивать платформу вместе с нами.
                </p>
              </div>

              <Button asChild size="lg" className="w-fit">
                <Link
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <FaGithub className="size-5" />
                  Смотреть на GitHub
                </Link>
              </Button>
            </div>

            <div className="bg-muted/30 flex flex-col justify-center gap-4 p-6 md:p-8">
              <Link href={GITHUB_BACKEND_URL} target="_blank" rel="noopener noreferrer">
                <Card className="hover:border-primary/50 p-4 transition-colors">
                  <div className="flex items-start gap-3">
                    <FaServer className="text-muted-foreground mt-0.5 size-5 shrink-0" />
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium">Backend</p>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge variant="secondary" className="gap-1">
                          <FaPython className="size-3" />
                          Python
                        </Badge>
                        <Badge variant="secondary" className="gap-1">
                          <SiDjango className="size-3" />
                          Django
                        </Badge>
                        <Badge variant="secondary" className="gap-1">
                          <SiDjango className="size-3" />
                          DRF
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link href={GITHUB_WEB_URL} target="_blank" rel="noopener noreferrer">
                <Card className="hover:border-primary/50 p-4 transition-colors">
                  <div className="flex items-start gap-3">
                    <FaGlobe className="text-muted-foreground mt-0.5 size-5 shrink-0" />
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium">Web</p>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge variant="secondary" className="gap-1">
                          <SiTypescript className="size-3" />
                          TypeScript
                        </Badge>
                        <Badge variant="secondary" className="gap-1">
                          <SiNextdotjs className="size-3" />
                          Next.js
                        </Badge>
                        <Badge variant="secondary" className="gap-1">
                          <FaReact className="size-3" />
                          React
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>

              <Card className="p-4">
                <div className="flex items-start gap-3">
                  <FaMobileAlt className="text-muted-foreground mt-0.5 size-5 shrink-0" />
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium">Mobile</p>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant="secondary" className="gap-1">
                        <SiTypescript className="size-3" />
                        TypeScript
                      </Badge>
                      <Badge variant="secondary" className="gap-1">
                        <FaReact className="size-3" />
                        React Native
                      </Badge>
                      <Badge variant="outline" className="text-muted-foreground gap-1">
                        <FaHourglassHalf className="size-3" />
                        Coming soon
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
