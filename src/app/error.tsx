// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */
"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error("[Error boundary]", {
      name: error.name,
      message: error.message,
      stack: error.stack,
      digest: error.digest,
    });
  }, [error]);

  const isServerError = !!error.digest;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 py-24 text-center">
      <h2 className="text-2xl font-semibold">
        {isServerError ? "Ошибка на сервере" : "Что-то пошло не так"}
      </h2>
      <p className="text-muted-foreground max-w-sm text-sm">
        {isServerError
          ? "Мы уже знаем о проблеме и работаем над её устранением."
          : "Произошла непредвиденная ошибка. Попробуйте обновить страницу."}
      </p>
      {error.digest && (
        <p className="text-muted-foreground font-mono text-xs">ID: {error.digest}</p>
      )}
      <div className="mt-2 flex gap-2">
        <Button variant="outline" onClick={reset}>
          Попробовать снова
        </Button>
        <Button asChild variant="ghost">
          <Link href="/">На главную</Link>
        </Button>
      </div>
    </div>
  );
}
