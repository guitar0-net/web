// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Stars } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { AnnouncementsListItem } from "../api";

interface AnnouncementCardProps {
  announcement: AnnouncementsListItem;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  return (
    <Card className="border-2 transition-all hover:-translate-y-1 hover:shadow-lg">
      <CardHeader>
        <div className="flex justify-between">
          <Stars className="text-primary bg-accent rounded-sm" />
          {announcement.product_version && (
            <Badge variant={"secondary"}>{announcement.product_version}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="mb-2 text-base leading-snug font-medium">
          {announcement.title}
        </h3>
        {announcement.published_at && (
          <p className="text-muted-foreground">
            <time dateTime={announcement.published_at}>
              {new Date(announcement.published_at).toLocaleDateString("ru-RU")}
            </time>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
