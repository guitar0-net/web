// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  Icon?: LucideIcon;
  title: string;
  ControlGroup?: React.ReactNode;
}

export function SectionHeader({ title, Icon, ControlGroup }: SectionHeaderProps) {
  return (
    <div className="mb-2 flex items-center justify-between gap-2 border-b pb-1">
      <h3 className="flex items-center gap-2 text-base font-medium">
        {Icon && <Icon className="size-4" />}
        {title}
      </h3>
      {ControlGroup}
    </div>
  );
}
