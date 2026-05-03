// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Clock } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import type { CourseLessonDetail } from "../api";

interface LessonCardProps {
  lesson: CourseLessonDetail;
  courseId: string;
}

export function LessonCard({ lesson: { order, lesson }, courseId }: LessonCardProps) {
  return (
    <div className="flex items-start gap-4">
      <Card className="flex-1 transition-all hover:-translate-y-1 hover:shadow-lg">
        <CardContent className="flex gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium">
              {order}
            </div>
            <div className="border-muted h-8 border-r-2"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Clock className="text-muted-foreground h-3 w-3" />
              <span className="text-muted-foreground text-xs">12:34</span>
            </div>
            <Link
              href={`/lessons/${lesson.uuid}?course=${courseId}`}
              className="hover:text-primary text-xl font-medium"
            >
              {lesson.title}
            </Link>
            {lesson.description && (
              <p
                data-testid="lesson-description"
                className="text-muted-foreground text-sm"
              >
                {lesson.description}
              </p>
            )}
            {lesson.songs.length > 0 && (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground text-sm">Тексты:</span>
                {lesson.songs.map((song) => (
                  <Badge key={song.id} variant="secondary">
                    {song.title}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
