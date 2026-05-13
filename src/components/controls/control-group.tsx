// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

interface ControlGroupProps {
  children: React.ReactNode;
}

export function ControlGroup({ children }: ControlGroupProps) {
  return <div className="flex items-center gap-1">{children}</div>;
}
