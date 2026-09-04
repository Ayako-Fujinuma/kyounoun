"use client";

import { useEffect, useState } from "react";
import {
  generateFortune,
  seedFromString,
  todayKey,
  type FortuneResult,
} from "@/lib/fortune";

interface StoredFortune {
  date: string;
  seed: number;
}

function storageKey() {
  return `kyounoun:${todayKey()}`;
}

export default function FortuneGacha() {
  const [result, setResult] = useState<FortuneResult | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawnToday, setHasDrawnToday] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey());
      if (raw) {
        const stored: StoredFortune = JSON.parse(raw);
        // SSRでは window がないため、マウント後に一度だけ localStorage から復元する
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setResult(generateFortune(stored.seed));
        setHasDrawnToday(true);
      }
    } catch {
      // localStorageが使えない環境では毎回ガチャを引く形にフォールバック
    }
  }, []);

  const draw = () => {
    setIsDrawing(true);
    window.setTimeout(() => {
      const seed = seedFromString(todayKey()) ^ (Date.now() & 0xffffffff);
      const fortune = generateFortune(seed);
      setResult(fortune);
      setHasDrawnToday(true);
      setIsDrawing(false);
      try {
        window.localStorage.setItem(
          storageKey(),
          JSON.stringify({ date: todayKey(), seed } satisfies StoredFortune),
        );
      } catch {
        // 保存できなくても表示上は問題ない
      }
    }, 700);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {!result && (
        <button
          type="button"
          onClick={draw}
          disabled={isDrawing}
          className="group relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-soft text-5xl shadow-[0_0_40px_rgba(244,201,93,0.35)] transition active:scale-95 disabled:opacity-70 sm:h-48 sm:w-48"
        >
          <span className={isDrawing ? "animate-spin" : "group-hover:scale-110 transition"}>
            🔮
          </span>
        </button>
      )}

      {!result && (
        <p className="text-foreground-muted">
          {isDrawing ? "運勢を占っています..." : "タップして今日の運勢を占う"}
        </p>
      )}

      {result && (
        <div className="w-full animate-[fadeIn_0.4s_ease-out]">
          <div
            className={`rounded-3xl border border-card-border bg-gradient-to-br ${result.from} ${result.to} p-6 text-center text-slate-900 shadow-xl sm:p-8`}
          >
            <p className="text-sm font-medium opacity-70">今日の運勢</p>
            <p className="mt-1 text-6xl">{result.emoji}</p>
            <p className="mt-2 text-4xl font-black tracking-wide sm:text-5xl">
              {result.rank}
            </p>
            <p className="mt-4 text-base leading-relaxed sm:text-lg">
              {result.message}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {result.categories.map((category) => (
              <div
                key={category.label}
                className="rounded-2xl border border-card-border bg-card-bg p-3 text-center"
              >
                <p className="text-xs text-foreground-muted">{category.label}</p>
                <p className="mt-1 text-lg text-accent" aria-hidden>
                  {"★".repeat(category.stars)}
                  <span className="text-foreground-muted/40">
                    {"★".repeat(5 - category.stars)}
                  </span>
                </p>
                <p className="mt-1 text-[11px] leading-snug text-foreground-muted">
                  {category.comment}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
            <div className="rounded-2xl border border-card-border bg-card-bg p-3">
              <p className="text-xs text-foreground-muted">ラッキーカラー</p>
              <div className="mt-2 flex items-center justify-center gap-2">
                <span
                  className="h-4 w-4 rounded-full border border-white/30"
                  style={{ backgroundColor: result.luckyColor.hex }}
                  aria-hidden
                />
                <span>{result.luckyColor.name}</span>
              </div>
            </div>
            <div className="rounded-2xl border border-card-border bg-card-bg p-3">
              <p className="text-xs text-foreground-muted">ラッキーアイテム</p>
              <p className="mt-2">{result.luckyItem}</p>
            </div>
            <div className="rounded-2xl border border-card-border bg-card-bg p-3">
              <p className="text-xs text-foreground-muted">ラッキーナンバー</p>
              <p className="mt-2">{result.luckyNumber}</p>
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
              今日引いた運勢はこの端末に保存され、次に開いたときも同じ結果が表示されます。
            </p>
          )}
        </div>
      )}
    </div>
  );
}
