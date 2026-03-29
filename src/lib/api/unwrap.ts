// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export function unwrap<T>(res: { data?: T }): T {
  if (res.data === undefined) throw new Error("Response contained no data");
  return res.data;
}
