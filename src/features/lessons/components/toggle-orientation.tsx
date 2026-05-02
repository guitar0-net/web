// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { HiDotsHorizontal, HiDotsVertical } from "react-icons/hi";

import { Button } from "@/components/ui/button";

interface ToggleOrientationProps {
  orientation: "horizontal" | "vertical";
  onToggle: () => void;
}

export function ToggleOrientation({ orientation, onToggle }: ToggleOrientationProps) {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={onToggle}
      aria-label="toggle orientation"
      className="text-muted-foreground"
    >
      {orientation === "horizontal" ? <HiDotsHorizontal /> : <HiDotsVertical />}
    </Button>
  );
}
