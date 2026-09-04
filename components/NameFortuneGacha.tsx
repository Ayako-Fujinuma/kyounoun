"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import GrandmaComment from "@/components/GrandmaComment";
import ShareButton from "@/components/ShareButton";
import {
  generateFortune,
  seedFromString,
  todayKey,
  type FortuneResult,
} from "@/lib/fortune";

const CATEGORY_DETAIL_LINKS: Record<string, string> = {
  恋愛運: "/love",
  仕事運: "/work",
  金運: "/money",
  健康運: "/health",
};

export default function NameFortuneGacha() {
  const [name, setName] = useState("");
  const [revealedName, setRevealedName] = useState("");
  const [result, setResult] = useState<FortuneResult | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const canDraw = name.trim().length > 0;

  const draw = () => {
    const trimmed = name.trim();
    if (!trimmed || isDrawing) return;
    setIsDrawing(true);
    setResult(null);
    window.setTimeout(() => {
      const seed = seedFromString(`friend:${trimmed}:${todayKey()}`);
      setResult(generateFortune(seed));
      setRevealedName(trimmed);
      setIsDrawing(false);
    }, 2600);
  };

  const reset = () => {
    setResult(null);
    setName("");
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {!result && (
        <>
          <div className="w-full max-w-xs">
            <label htmlFor="friend-name" className="text-sm text-foreground-muted">
              気になるあの人の名前
            </label>
            <input
              id="friend-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && draw()}
              placeholder="頭に浮かんだ名前を…"
              maxLength={20}
              className="mt-1 w-full rounded-xl border border-card-border bg-card-bg px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>

          <button
            type="button"
            onClick={draw}
            disabled={isDrawing || !canDraw}
            className="group relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full shadow-[0_0_40px_rgba(244,201,93,0.35)] transition active:scale-95 disabled:opacity-40 sm:h-48 sm:w-48"
          >
            <span
              className={`absolute inset-0 ${isDrawing ? "animate-[spin_1.2s_linear_infinite]" : "group-hover:scale-110"} transition`}
            >
              <Image
                src="/images/icons/overall.jpg"
                alt="名前を入れて占う"
                fill
                sizes="(min-width: 640px) 192px, 160px"
                className="object-cover"
              />
            </span>
          </button>

          <p className="text-foreground-muted">
            {isDrawing ? "そっとのぞいています..." : "名前を入れてタップ"}
          </p>
        </>
      )}

      {result && (
        <div className="w-full animate-[fadeIn_0.4s_ease-out]">
          <div
            className={`rounded-3xl border border-card-border bg-gradient-to-br ${result.from} ${result.to} p-6 text-center text-slate-900 shadow-xl sm:p-8`}
          >
            <GrandmaComment image={result.grandmaImage} />

            <p className="mt-4 text-sm font-medium opacity-70">
              {revealedName}さんの今日の運勢
            </p>
            <p className="mt-1 text-4xl font-black tracking-wide sm:text-5xl">
              {result.rank}
            </p>
            <p className="mt-4 text-base leading-relaxed sm:text-lg">
              {result.message}
            </p>
            <p className="mt-4 text-xl font-black leading-snug sm:text-2xl">
              「{result.grandmaLine}」
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {result.categories.map((category) => (
              <div
                key={category.label}
                className="relative rounded-2xl border border-card-border bg-card-bg p-3 text-center"
              >
                {CATEGORY_DETAIL_LINKS[category.label] && (
                  <Link
                    href={CATEGORY_DETAIL_LINKS[category.label]}
                    className="absolute top-2 right-2 text-[10px] text-accent hover:underline"
                  >
                    詳しく見る›
                  </Link>
                )}
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

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="rounded-full border border-accent/60 px-6 py-2 text-sm text-accent transition hover:bg-accent hover:text-slate-900"
            >
              別の人を占う
            </button>
            <ShareButton
              text={`${revealedName}さんの今日の運勢は「${result.rank}」でした!占いババァいわく「${result.grandmaLine}」`}
            />
          </div>

          <p className="mt-3 text-center text-xs text-foreground-muted">
            同じ名前で今日もう一度占うと、同じ結果が表示されます。
          </p>
        </div>
      )}
    </div>
  );
}
