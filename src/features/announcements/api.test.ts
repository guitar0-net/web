// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { randomUUID } from "crypto";

import type { apiClient } from "@/lib/api";

import { createAnnouncementApi } from "./api";

function makeStub(response: unknown) {
  let capturedPath: string | undefined;
  let capturedParams: unknown;
  const client = {
    GET: async (path: string, opts?: { params?: unknown }) => {
      capturedPath = path;
      capturedParams = opts?.params;
      return { data: response, error: undefined };
    },
  } as unknown as typeof apiClient;
  return {
    client,
    getCapturedPath: () => capturedPath,
    getCapturedParams: () => capturedParams,
  };
}

describe("AnnouncementApi", () => {
  it("fetchAnnouncements calls /api/v1/announcements/", async () => {
    const { client, getCapturedPath } = makeStub([]);
    await createAnnouncementApi(client).fetchAnnouncements();
    expect(getCapturedPath()).toBe("/api/v1/announcements/");
  });

  it("fetchAnnouncement calls /api/v1/announcements/{uuid}/", async () => {
    const { client, getCapturedPath } = makeStub({});
    await createAnnouncementApi(client).fetchAnnouncement(randomUUID());
    expect(getCapturedPath()).toBe("/api/v1/announcements/{uuid}/");
  });

  it("fetchAnnouncement passes uuid in path params", async () => {
    const uuid = randomUUID();
    const { client, getCapturedParams } = makeStub({});
    await createAnnouncementApi(client).fetchAnnouncement(uuid);
    expect(getCapturedParams()).toEqual({ path: { uuid } });
  });
});
