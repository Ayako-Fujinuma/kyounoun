"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  generateWorkFortune,
  seedFromString,
  todayKey,
  type WorkFortuneResult,
} from "@/lib/fortune";

interface StoredWorkFortune {
  date: string;
  seed: number;
}

function storageKey() {
  return `kyounoun:work:${todayKey()}`;
}

export default function WorkFortuneGacha() {
  const [result, setResult] = useState<WorkFortuneResult | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawnToday, setHasDrawnToday] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey());
      if (raw) {
        const stored: StoredWorkFortune = JSON.parse(raw);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setResult(generateWorkFortune(stored.seed));
        setHasDrawnToday(true);
      }
    } catch {
      // localStorageが使えない環境では毎回ガチャを引く形にフォールバック
    }
  }, []);

  const draw = () => {
    setIsDrawing(true);
    setResult(null);
    window.setTimeout(() => {
      const seed =
        seedFromString(`work:${todayKey()}`) ^ (Date.now() & 0xffffffff);
      const fortune = generateWorkFortune(seed);
      setResult(fortune);
      setHasDrawnToday(true);
      setIsDrawing(false);
      try {
        window.localStorage.setItem(
          storageKey(),
          JSON.stringify({ date: todayKey(), seed } satisfies StoredWorkFortune),
        );
      } catch {
        // 保存できなくても表示上は問題ない
      }
    }, 1800);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {!result && (
        <button
          type="button"
          onClick={draw}
          disabled={isDrawing}
          className="group relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full shadow-[0_0_40px_rgba(56,189,248,0.35)] transition active:scale-95 disabled:opacity-70 sm:h-48 sm:w-48"
        >
          <span
            className={`absolute inset-0 ${isDrawing ? "animate-[spin_0.6s_linear_infinite]" : "group-hover:scale-110"} transition`}
          >
            <Image
              src="/images/icons/work.jpeg"
              alt="今日の仕事運を占う"
              fill
              sizes="(min-width: 640px) 192px, 160px"
              className="object-cover"
              priority
            />
          </span>
        </button>
      )}

      {!result && (
        <p className="text-foreground-muted">
          {isDrawing ? "仕事運を占っています..." : "タップして今日の仕事運を占う"}
        </p>
      )}

      {result && (
        <div className="w-full animate-[fadeIn_0.4s_ease-out]">
          <div
            className={`rounded-3xl border border-card-border bg-gradient-to-br ${result.from} ${result.to} p-6 text-center text-slate-900 shadow-xl sm:p-8`}
          >
            <p className="text-sm font-medium opacity-70">今日の仕事運</p>
            <div className="relative mx-auto mt-2 h-24 w-24 overflow-hidden rounded-2xl shadow-lg sm:h-28 sm:w-28">
              <Image
                src={result.image}
                alt={`今日の仕事運: ${result.rank}`}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>
            <p className="mt-2 text-4xl font-black tracking-wide sm:text-5xl">
              {result.rank}
            </p>
            <p className="mt-4 text-base leading-relaxed sm:text-lg">
              {result.message}
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-card-border bg-card-bg p-4">
              <p className="text-xs font-bold text-accent">集中力のヒント</p>
              <p className="mt-2 text-sm text-foreground-muted">{result.adviceFocus}</p>
            </div>
            <div className="rounded-2xl border border-card-border bg-card-bg p-4">
              <p className="text-xs font-bold text-accent">人間関係</p>
              <p className="mt-2 text-sm text-foreground-muted">{result.adviceRelationship}</p>
            </div>
            <div className="rounded-2xl border border-card-border bg-card-bg p-4">
              <p className="text-xs font-bold text-accent">チャンスをつかむ</p>
              <p className="mt-2 text-sm text-foreground-muted">{result.adviceChance}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={draw}
              disabled={isDrawing}
              className="rounded-full border border-accent/60 px-6 py-2 text-sm text-accent transition hover:bg-accent hover:text-slate-900 disabled:opacity-60"
            >
              {isDrawing ? "占い直しています..." : "もう一度引く"}
            </button>
          </div>

          {hasDrawnToday && (
            <p className="mt-3 text-center text-xs text-foreground-muted">
              今日引いた仕事運はこの端末に保存され、次に開いたときも同じ結果が表示されます。
            </p>
          )}
        </div>
      )}
    </div>
  );
}
