// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Pin, PinOff } from "lucide-react";

import { Button } from "@/components/ui/button";

interface TogglePinProps {
  pinned: boolean;
  onToggle: () => void;
}

export function TogglePin({ pinned, onToggle }: TogglePinProps) {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={onToggle}
      aria-label={pinned ? "unpin" : "pin"}
      className="text-muted-foreground"
    >
      {pinned ? <Pin /> : <PinOff />}
    </Button>
  );
}
