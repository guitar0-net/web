// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

interface ApiErrorInit {
  status: number;
  reason: string;
  schemaPath: string;
  requestPath?: string;
  data?: unknown;
}

export type ApiErrorDetails = Omit<ApiErrorInit, "status" | "reason">;

export class ApiError extends Error {
  public readonly status: number;
  public readonly schemaPath: string;
  public readonly requestPath?: string;
  public readonly data?: unknown;

  constructor({ status, reason, schemaPath, requestPath, data }: ApiErrorInit) {
    super(`${reason} — ${schemaPath}`);
    this.name = "ApiError";
    this.status = status;
    this.schemaPath = schemaPath;
    this.requestPath = requestPath;
    this.data = data;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends ApiError {
  constructor(details: ApiErrorDetails) {
    super({ ...details, status: 404, reason: "Not found" });
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends ApiError {
  constructor(details: ApiErrorDetails) {
    super({ ...details, status: 401, reason: "Unauthorized" });
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends ApiError {
  constructor(details: ApiErrorDetails) {
    super({ ...details, status: 403, reason: "Forbidden" });
    this.name = "ForbiddenError";
  }
}

export class ValidationError extends ApiError {
  constructor(details: ApiErrorDetails) {
    super({ ...details, status: 422, reason: "Unprocessable Entity" });
    this.name = "ValidationError";
  }
}
