"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import GrandmaComment from "@/components/GrandmaComment";
import {
  generateMoneyFortune,
  seedFromString,
  todayKey,
  type MoneyFortuneResult,
} from "@/lib/fortune";

interface StoredMoneyFortune {
  date: string;
  seed: number;
}

function storageKey() {
  return `kyounoun:money:${todayKey()}`;
}

export default function MoneyFortuneGacha() {
  const [result, setResult] = useState<MoneyFortuneResult | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawnToday, setHasDrawnToday] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey());
      if (raw) {
        const stored: StoredMoneyFortune = JSON.parse(raw);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setResult(generateMoneyFortune(stored.seed));
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
        seedFromString(`money:${todayKey()}`) ^ (Date.now() & 0xffffffff);
      const fortune = generateMoneyFortune(seed);
      setResult(fortune);
      setHasDrawnToday(true);
      setIsDrawing(false);
      try {
        window.localStorage.setItem(
          storageKey(),
          JSON.stringify({ date: todayKey(), seed } satisfies StoredMoneyFortune),
        );
      } catch {
        // 保存できなくても表示上は問題ない
      }
    }, 2600);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {!result && (
        <button
          type="button"
          onClick={draw}
          disabled={isDrawing}
          className="group relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full shadow-[0_0_40px_rgba(250,204,21,0.35)] transition active:scale-95 disabled:opacity-70 sm:h-48 sm:w-48"
        >
          <span
            className={`absolute inset-0 ${isDrawing ? "animate-[spin_1.2s_linear_infinite]" : "group-hover:scale-110"} transition`}
          >
            <Image
              src="/images/icons/money.jpeg"
              alt="今日の金運を占う"
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
          {isDrawing ? "金運を占っています..." : "タップして今日の金運を占う"}
        </p>
      )}

      {result && (
        <div className="w-full animate-[fadeIn_0.4s_ease-out]">
          <div
            className={`rounded-3xl border border-card-border bg-gradient-to-br ${result.from} ${result.to} p-6 text-center text-slate-900 shadow-xl sm:p-8`}
          >
            <p className="text-sm font-medium opacity-70">今日の金運</p>
            <div className="relative mx-auto mt-2 h-24 w-24 overflow-hidden rounded-full shadow-lg sm:h-28 sm:w-28">
              <Image
                src={result.image}
                alt={`今日の金運: ${result.rank}`}
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

          <GrandmaComment image={result.grandmaImage} line={result.grandmaLine} />

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-card-border bg-card-bg p-4">
              <p className="text-xs font-bold text-accent">使い方のヒント</p>
              <p className="mt-2 text-sm text-foreground-muted">{result.adviceSpending}</p>
            </div>
            <div className="rounded-2xl border border-card-border bg-card-bg p-4">
              <p className="text-xs font-bold text-accent">貯蓄・見直し</p>
              <p className="mt-2 text-sm text-foreground-muted">{result.adviceSaving}</p>
            </div>
            <div className="rounded-2xl border border-card-border bg-card-bg p-4">
              <p className="text-xs font-bold text-accent">ラッキーな出来事</p>
              <p className="mt-2 text-sm text-foreground-muted">{result.adviceWindfall}</p>
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
              今日引いた金運はこの端末に保存され、次に開いたときも同じ結果が表示されます。
            </p>
          )}
        </div>
      )}
    </div>
  );
}
