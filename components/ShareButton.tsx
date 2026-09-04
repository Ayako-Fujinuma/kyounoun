"use client";

import { useState } from "react";

interface ShareButtonProps {
  text: string;
}

export default function ShareButton({ text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ text, url });
      } catch {
        // ユーザーがキャンセルした場合などは何もしない
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // クリップボードが使えない環境では何もしない
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="rounded-full border border-accent/60 px-6 py-2 text-sm text-accent transition hover:bg-accent hover:text-slate-900"
    >
      {copied ? "コピーしました!" : "結果を教える"}
    </button>
  );
}
