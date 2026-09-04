import type { Metadata } from "next";
import Image from "next/image";
import { GRANDMA_NAME } from "@/lib/fortune";

export const metadata: Metadata = {
  title: "運営者情報",
  description: "今日の運勢ガチャの運営者情報について。",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-sm leading-relaxed sm:px-6">
      <h1 className="text-2xl font-bold">運営者情報</h1>

      <div className="mt-6 space-y-6 text-foreground-muted">
        <section>
          <h2 className="text-base font-bold text-foreground">サイト名</h2>
          <p className="mt-1">今日の運勢ガチャ</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground">
            占い担当: {GRANDMA_NAME}
          </h2>
          <div className="relative mt-3 aspect-[1408/768] w-full overflow-hidden rounded-2xl border border-card-border">
            <Image
              src="/images/icons/grandma-group.jpeg"
              alt={GRANDMA_NAME}
              fill
              sizes="(min-width: 640px) 672px, 100vw"
              className="object-cover"
            />
          </div>
          <p className="mt-3">
            このサイトの占いを担当しているのは、ちょっぴり意地悪だけど憎めない「{GRANDMA_NAME}」。運勢のランクによって表情やセリフがコロコロ変わるので、大凶を引いた日は少しだけ覚悟しておいてください。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground">運営者</h2>
          <p className="mt-1">個人（お問い合わせフォームよりご連絡いただけます）</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground">サイトについて</h2>
          <p className="mt-1">
            「今日の運勢ガチャ」は、ボタン一つで今日の運勢を楽しめる無料の占いエンタメサイトです。結果はエンタメ・娯楽を目的としたものであり、当サイトの占い結果によって生じたいかなる損害についても運営者は責任を負いかねます。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground">お問い合わせ</h2>
          <p className="mt-1">
            ご意見・ご要望などは
            <a href="/contact" className="text-accent hover:underline">
              お問い合わせフォーム
            </a>
            よりお願いいたします。
          </p>
        </section>
      </div>
    </div>
  );
}
