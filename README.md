<!--
SPDX-FileCopyrightText: 2025-2026 Andrey Kotlyar <guitar0.app@gmail.com>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

# Guitar0 web

[![CI](https://github.com/guitar0-net/web/actions/workflows/ci.yml/badge.svg)](https://github.com/guitar0-net/web/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/guitar0-net/web/graph/badge.svg?token=eXFhL1tyvs)](https://codecov.io/gh/guitar0-net/web)
[![Node](https://img.shields.io/badge/node-24-blue.svg)](https://nodejs.org)
![Next.js](https://img.shields.io/badge/next-16-blue)
[![License](https://img.shields.io/badge/license-AGPL--3.0--or--later-green.svg)](./LICENSES/AGPL-3.0-or-later.txt)
[![REUSE status](https://api.reuse.software/badge/github.com/guitar0-net/web)](https://api.reuse.software/info/github.com/guitar0-net/web)

Next.js web client for the [Guitar0](https://guitar0.net) guitar education platform.

## Tech Stack

| Layer      | Technology                        |
| ---------- | --------------------------------- |
| Language   | TypeScript 5                      |
| Framework  | Next.js 16 · React 19             |
| Styling    | Tailwind CSS 4 · shadcn/ui        |
| API client | openapi-fetch (typed via OpenAPI) |
| State      | Zustand                           |
| Analytics  | PostHog                           |
| Testing    | Vitest · Playwright               |
| Linting    | ESLint · Prettier · tsc           |
| Packaging  | npm                               |

## Prerequisites

- Node.js 24+

## Quick Start

```bash
cp .env.example .env
npm ci
make dev
```

App is available at `http://localhost:3000`.

## Development Commands

```
make help        list all available commands

make lint        ESLint
make typecheck   TypeScript type check
make test        Vitest with coverage report
make ci          lint + format + typecheck + test

make dev         start development server
make build       production build

make e2e         run Playwright E2E tests
                 first run: npx playwright install chromium
```

## API Contract

`src/types/api.d.ts` is auto-generated from `schemas/openapi.yaml`. Run `npm run api:generate` to regenerate after backend changes; CI verifies the committed file stays in sync with the live schema at `api.staging.guitar0.net`.

## Project Structure

```
src/app/          Next.js App Router pages and layouts
src/components/   reusable UI components; ui/ contains shadcn/ui primitives
src/features/     feature modules (chords, courses, lessons, …)
src/lib/          API client, analytics, shared utilities
src/store/        Zustand stores
src/types/        shared TypeScript types
e2e/              Playwright E2E tests
schemas/          OpenAPI schema
```

## License

[GNU Affero General Public License v3.0 or later](./LICENSES/AGPL-3.0-or-later.txt).
All source files carry SPDX headers and are [REUSE compliant](https://reuse.software).
