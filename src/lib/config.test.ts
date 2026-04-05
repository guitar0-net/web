// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { config } from "./config";

describe("config apiUrl", () => {
  it("returns the value of NEXT_PUBLIC_API_URL", () => {
    const url = `http://локалхост-${Math.random().toString(36)}.test`;
    process.env.NEXT_PUBLIC_API_URL = url;
    expect(config.apiUrl).toBe(url);
  });

  it("throws when NEXT_PUBLIC_API_URL is not set", () => {
    delete process.env.NEXT_PUBLIC_API_URL;
    expect(() => config.apiUrl).toThrow();
  });
});

describe("config adminEmail", () => {
  it("return the value of NEXT_PUBLIC_ADMIN_EMAIL", () => {
    const email = `почта@${Math.random().toString(36)}.test`;
    process.env.NEXT_PUBLIC_ADMIN_EMAIL = email;
    expect(config.adminEmail).toBe(email);
  });
  it("throws when NEXT_PUBLIC_ADMIN_EMAIL is not set", () => {
    delete process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    expect(() => config.adminEmail).toThrow();
  });
});
