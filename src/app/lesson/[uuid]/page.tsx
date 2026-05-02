// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { lessonsApi } from "@/features/lessons";
import { LessonHeader } from "@/features/lessons/components/lesson-header";
import { LessonVideoSection } from "@/features/lessons/components/lesson-video-section";
import { SongsSection } from "@/features/lessons/components/songs-section";
import { NotFoundError } from "@/lib/api";

interface Props {
  params: Promise<{ uuid: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uuid } = await params;
  try {
    const lesson = await lessonsApi.fetchLesson(uuid);
    return {
      title: `${lesson.title} | guitar0.net`,
      description: lesson.description,
    };
  } catch (err) {
    if (err instanceof NotFoundError) return {};
    throw err;
  }
}

export default async function LessonPage({ params }: Props) {
  const { uuid } = await params;
  let lesson;
  try {
    lesson = await lessonsApi.fetchLesson(uuid);
  } catch (err) {
    if (err instanceof NotFoundError) notFound();
    throw err;
  }
  return (
    <>
      <LessonHeader title={lesson.title} description={lesson.description} />
      <LessonVideoSection videoUrl={lesson.video_url} />
      <SongsSection songs={lesson.songs} />
    </>
  );
}
