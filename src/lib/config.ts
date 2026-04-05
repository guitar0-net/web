// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

export const config = {
  get apiUrl(): string {
    return requireEnv("NEXT_PUBLIC_API_URL");
  },
  get adminEmail(): string {
    return requireEnv("NEXT_PUBLIC_ADMIN_EMAIL");
  },
};
