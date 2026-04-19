// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="text-3xl font-semibold">Страница не найдена</h1>

      <p className="text-muted-foreground max-w-md text-sm">
        Возможно, ссылка устарела, страница была удалена или вы ошиблись в адресе.
      </p>

      <div className="mt-2 flex gap-2">
        <Button asChild>
          <Link href="/">На главную</Link>
        </Button>
      </div>

      <p className="text-muted-foreground mt-4 text-xs">Код ошибки: 404</p>
    </div>
  );
}
