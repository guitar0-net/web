// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export function unwrap<T>(res: { data?: T }, schemaPath: string): T {
  if (res.data === undefined) {
    throw new Error(`Response contained no data — ${schemaPath}`);
  }
  return res.data;
}
