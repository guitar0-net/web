# SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
#
# SPDX-License-Identifier: AGPL-3.0-or-later

.PHONY: help install dev build lint format typecheck test ci loc clean

SHELL := /bin/bash

# =============================================================================
# Development
# =============================================================================

help: ## Show all available commands
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-24s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install dependencies
	npm ci

dev: ## Start development server
	npm run dev

build: ## Build for production
	npm run build

lint: ## Run ESLint
	npm run lint

format: ## Run Prettier
	npx prettier --write .

typecheck: ## Run TypeScript type check
	npm run type:check

test: ## Run tests
	npm run test

ci: lint format typecheck test ## Run all checks (lint, format, typecheck, test)

loc: ## Count lines of code vs tests
	@code=$$(find src -type f \( -name '*.ts' -o -name '*.tsx' \) ! -name '*.test.*' ! -name '*.d.ts' | xargs wc -l | tail -n1 | awk '{print $$1}'); \
	tests=$$(find src -type f \( -name '*.test.ts' -o -name '*.test.tsx' \) | xargs wc -l | tail -n1 | awk '{print $$1}'); \
	if [ -z "$$tests" ]; then tests=0; fi; \
	total=$$((code + tests)); \
	ratio=$$(python3 -c "print(round(($$tests / $$total * 100) if $$total else 0, 2))"); \
	echo "Total TS lines: $$total (code: $$code, tests: $$tests, ratio: $$ratio%)"

clean: ## Remove .next and coverage directories
	rm -rf .next coverage
