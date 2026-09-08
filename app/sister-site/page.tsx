import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "姉妹サイト",
  description: "今日の運勢ガチャの姉妹サイト、今日の運勢イケメン占いをご紹介します。",
};

export default function SisterSitePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-center">姉妹サイト</h1>
      <p className="mt-2 text-center text-sm text-foreground-muted">
        占いババァだけじゃ物足りない?こちらも新しくオープンしました。
      </p>

      <a
        href="https://ikemen.kyounoun.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 block overflow-hidden rounded-3xl border border-card-border bg-card-bg shadow-xl transition hover:scale-[1.01]"
      >
        <div className="relative aspect-[1084/1451] w-full">
          <Image
            src="/images/icons/ikemen-hero.png"
            alt="今日の運勢イケメン占い"
            fill
            sizes="(min-width: 640px) 672px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="space-y-2 p-6">
          <p className="text-xl font-extrabold">今日の運勢イケメン占い</p>
          <p className="text-sm leading-relaxed text-foreground-muted">
            生年月日を入れるだけで、今日のあなたにぴったりのイケメンが応援コメントを届けてくれる無料占いサイト。夜21時からはナイトモードに切り替わり、癒しのコメントをお届けします。
          </p>
          <p className="text-sm font-bold text-accent underline underline-offset-4">
            ikemen.kyounoun.com へ →
          </p>
        </div>
      </a>
    </div>
  );
}
