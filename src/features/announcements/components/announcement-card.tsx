// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

"use client";

import { Stars } from "lucide-react";

import { Markdown } from "@/components/markdown";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import type { AnnouncementsListItem } from "../api";

const PREVIEW_LIMIT = 150;

function truncateMarkdown(content: string): { text: string; truncated: boolean } {
  if (content.length <= PREVIEW_LIMIT) {
    return { text: content, truncated: false };
  }

  const slice = content.slice(0, PREVIEW_LIMIT);
  const lastParagraphBreak = slice.lastIndexOf("\n\n");

  if (lastParagraphBreak > 0) {
    return { text: `${slice.slice(0, lastParagraphBreak)}...`, truncated: true };
  }

  const lastSpace = slice.lastIndexOf(" ");
  if (lastSpace > 0) {
    return { text: `${slice.slice(0, lastSpace)}...`, truncated: true };
  }

  return { text: `${slice}...`, truncated: true };
}

interface AnnouncementCardProps {
  announcement: AnnouncementsListItem;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const { text: previewText } = truncateMarkdown(announcement.content);
  const publishedDate = announcement.published_at
    ? new Date(announcement.published_at).toLocaleDateString("ru-RU")
    : null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer border-2 transition-all hover:-translate-y-1 hover:shadow-lg">
          <CardHeader>
            <div className="flex justify-between">
              <Stars className="text-primary bg-accent rounded-sm" />
              {announcement.product_version && (
                <Badge variant="secondary">{announcement.product_version}</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="mb-2 text-base leading-snug font-medium">
              {announcement.title}
            </h3>
            {publishedDate && (
              <p className="text-muted-foreground">
                <time dateTime={announcement.published_at ?? ""}>{publishedDate}</time>
              </p>
            )}
            {announcement.content && (
              <Markdown className="text-muted-foreground mt-2 text-sm">
                {previewText}
              </Markdown>
            )}
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2">
            <DialogTitle>{announcement.title}</DialogTitle>
            {announcement.product_version && (
              <Badge variant="secondary">{announcement.product_version}</Badge>
            )}
          </div>
          {publishedDate && (
            <DialogDescription>
              <time dateTime={announcement.published_at ?? ""}>{publishedDate}</time>
            </DialogDescription>
          )}
        </DialogHeader>
        <Markdown className="text-sm">{announcement.content}</Markdown>
      </DialogContent>
    </Dialog>
  );
}
