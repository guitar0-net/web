// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

const themes = [
  { value: "system", icon: Monitor, label: "System" },
  { value: "light", icon: Sun, label: "Light" },
  { value: "dark", icon: Moon, label: "Dark" },
] as const;

function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const mounted = useIsMounted();

  if (!mounted) return null;

  return (
    <ButtonGroup aria-label="Theme">
      {themes.map(({ value, icon: Icon, label }) => (
        <Button
          key={value}
          variant={theme === value ? "default" : "outline"}
          size="icon"
          aria-label={label}
          aria-pressed={theme === value}
          onClick={() => setTheme(value)}
        >
          <Icon />
        </Button>
      ))}
    </ButtonGroup>
  );
}
