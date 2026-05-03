// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

interface LessonHeaderProps {
  title: string;
  description?: string;
}

export function LessonHeader({ title, description }: LessonHeaderProps) {
  return (
    <div className="bg-accent mb-2">
      <div className="container mx-auto px-2 py-8">
        <div className="mb-4 flex items-center gap-2">
          <div className="border-primary w-10 border-t"></div>
          <span className="text-primary text-sm">Урок</span>
        </div>
        <h1 className="mb-4 text-3xl font-medium">{title}</h1>
        {description && (
          <p data-testid="lesson-description" className="text-muted-foreground text-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
