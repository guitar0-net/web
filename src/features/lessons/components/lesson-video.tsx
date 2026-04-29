// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

interface LessonVideoProps {
  videoUrl: string;
}

export function LessonVideo({ videoUrl }: LessonVideoProps) {
  return (
    <div className="container mx-auto px-4">
      <div className="aspect-video">
        <iframe
          src={videoUrl}
          title="Lesson video"
          className="h-full w-full"
          allowFullScreen
        />
      </div>
    </div>
  );
}
