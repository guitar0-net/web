// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Eye, EyeClosed } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ToggleVisibilityProps {
  visible: boolean;
  onToggle: () => void;
}

export function ToggleVisibility({ visible, onToggle }: ToggleVisibilityProps) {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={onToggle}
      aria-label={visible ? "hide" : "show"}
      className="text-muted-foreground"
    >
      {visible ? <Eye /> : <EyeClosed />}
    </Button>
  );
}
