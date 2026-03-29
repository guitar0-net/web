// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { randomUUID } from "crypto";

import { makeApiStub } from "@/test/helpers/api-stub";

import { createAnnouncementApi } from "./api";

describe("AnnouncementApi", () => {
  it("fetchAnnouncements calls /api/v1/announcements/", async () => {
    const { client, getCapturedPath } = makeApiStub([]);
    await createAnnouncementApi(client).fetchAnnouncements();
    expect(getCapturedPath()).toBe("/api/v1/announcements/");
  });

  it("fetchAnnouncement calls /api/v1/announcements/{uuid}/", async () => {
    const { client, getCapturedPath } = makeApiStub({});
    await createAnnouncementApi(client).fetchAnnouncement(randomUUID());
    expect(getCapturedPath()).toBe("/api/v1/announcements/{uuid}/");
  });

  it("fetchAnnouncement passes uuid in path params", async () => {
    const uuid = randomUUID();
    const { client, getCapturedParams } = makeApiStub({});
    await createAnnouncementApi(client).fetchAnnouncement(uuid);
    expect(getCapturedParams()).toEqual({ path: { uuid } });
  });
});
