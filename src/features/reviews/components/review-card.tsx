// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Star } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Review } from "../types";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="border-2 transition-all hover:-translate-y-1 hover:shadow-lg">
      <CardHeader className="flex-row items-center gap-4 pb-2">
        <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold uppercase">
          {review.author[0]}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{review.author}</span>
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={`star-${review.id}-${i}`}
                  className={`size-3 ${
                    i < review.rating
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-muted-foreground text-xs">{review.date}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm leading-relaxed">{review.text}</p>
      </CardContent>
    </Card>
  );
}
