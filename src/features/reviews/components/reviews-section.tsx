// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import Link from "next/link";
import { SiGoogleplay } from "react-icons/si";

import { GOOGLE_PLAY_URL } from "@/lib/constants";

import { REVIEWS } from "../constants";
import { ReviewCard } from "./review-card";

export function ReviewsSection() {
  return (
    <section className="bg-accent/30 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-2 flex items-center justify-start gap-2">
          <div className="bg-primary h-2 w-2 rounded-full" />
          <h3 className="text-primary text-sm">Отзывы</h3>
        </div>
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Что говорят ученики</h2>
            <p className="text-muted-foreground mt-2">
              Реальные отзывы пользователей из Google Play
            </p>
          </div>
          <Link
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <SiGoogleplay className="size-4" />
            Все отзывы в Google Play
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
