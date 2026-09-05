"use client";

import { useState } from "react";

interface ShareButtonProps {
  text: string;
  imageUrl: string;
  rank: string;
  hashtags: string[];
}

function shareUrlWithRank(rank: string) {
  const url = new URL(window.location.href);
  url.searchParams.set("rank", rank);
  return url.toString();
}

export default function ShareButton({
  text,
  imageUrl,
  rank,
  hashtags,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareToX = () => {
    const params = new URLSearchParams({
      text,
      url: shareUrlWithRank(rank),
      hashtags: hashtags.join(","),
    });
    window.open(
      `https://twitter.com/intent/tweet?${params.toString()}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const shareToThreads = () => {
    const params = new URLSearchParams({
      text: `${text} ${hashtags.map((tag) => `#${tag}`).join(" ")}`,
      url: shareUrlWithRank(rank),
    });
    window.open(
      `https://www.threads.net/intent/post?${params.toString()}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const shareToLine = () => {
    const params = new URLSearchParams({ url: shareUrlWithRank(rank), text });
    window.open(
      `https://social-plugins.line.me/lineit/share?${params.toString()}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleShare = async () => {
    const shareText = `${text}\n${shareUrlWithRank(rank)}`;

    if (navigator.share) {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], "kyounoun.jpg", { type: blob.type });

        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({ text: shareText, files: [file] });
          return;
        }

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
      <button type="button" onClick={shareToThreads} className={buttonClass}>
        Threadsでシェア
      </button>
      <button
        type="button"
        onClick={shareToLine}
        className={`${buttonClass} sm:hidden`}
      >
        LINEでシェア
      </button>
      <button type="button" onClick={handleShare} className={buttonClass}>
        {copied ? "コピーしました!" : "結果をシェアする"}
      </button>
    </div>
  );
}
