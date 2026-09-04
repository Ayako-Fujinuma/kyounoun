"use client";

import { useState } from "react";

interface ShareButtonProps {
  text: string;
}

export default function ShareButton({ text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareToX = () => {
    const url = window.location.href;
    const params = new URLSearchParams({ text, url });
    window.open(
      `https://twitter.com/intent/tweet?${params.toString()}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const shareToLine = () => {
    const url = window.location.href;
    const params = new URLSearchParams({ url, text });
    window.open(
      `https://social-plugins.line.me/lineit/share?${params.toString()}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleShare = async () => {
    const shareText = `${text}\n${window.location.href}`;

    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
      } catch {
        // ユーザーがキャンセルした場合などは何もしない
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // クリップボードが使えない環境では何もしない
    }
  };

  const buttonClass =
    "rounded-full border border-accent/60 px-4 py-2 text-sm text-accent transition hover:bg-accent hover:text-slate-900";

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button type="button" onClick={shareToX} className={buttonClass}>
        Xでシェア
      </button>
      <button type="button" onClick={shareToLine} className={buttonClass}>
        LINEでシェア
      </button>
      <button type="button" onClick={handleShare} className={buttonClass}>
        {copied ? "コピーしました!" : "結果をシェアする"}
      </button>
    </div>
  );
}
