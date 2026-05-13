// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ZoomIn, ZoomOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Size } from "@/types/ui";

interface SizeControlProps {
  value: Size;
  onDecrease: () => void;
  onIncrease: () => void;
}

export function SizeControl({ value, onDecrease, onIncrease }: SizeControlProps) {
  return (
    <div className="flex gap-1">
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="decrease"
        disabled={value === 1}
        onClick={onDecrease}
        className="text-muted-foreground"
      >
        <ZoomOut />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="increase"
        disabled={value === 5}
        onClick={onIncrease}
        className="text-muted-foreground"
      >
        <ZoomIn />
      </Button>
    </div>
  );
}
