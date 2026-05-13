// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { defineConfig, devices } from "@playwright/test";

import { API_BASE_URL, APP_PORT } from "./e2e/constants";

export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/*.test.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : [["html", { open: "on-failure" }]],
  use: {
    baseURL: `http://localhost:${APP_PORT}`,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    navigationTimeout: 60_000,
    actionTimeout: 30_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: `npm run dev -- --port ${APP_PORT}`,
    url: `http://localhost:${APP_PORT}`,
    env: {
      NEXT_PUBLIC_API_URL: API_BASE_URL,
    },
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
