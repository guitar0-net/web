// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export class ApiError extends Error {
  public readonly status: number;
  public readonly data?: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends ApiError {
  constructor(data?: unknown) {
    super(404, "Not found", data);
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends ApiError {
  constructor(data?: unknown) {
    super(401, "Unauthorized", data);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends ApiError {
  constructor(data?: unknown) {
    super(403, "Forbidden", data);
    this.name = "ForbiddenError";
  }
}

export class ValidationError extends ApiError {
  constructor(data?: unknown) {
    super(422, "Unprocessable Entity", data);
    this.name = "ValidationError";
  }
}
