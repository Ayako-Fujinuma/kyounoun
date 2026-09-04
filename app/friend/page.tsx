import type { Metadata } from "next";
import Link from "next/link";
import NameFortuneGacha from "@/components/NameFortuneGacha";
import BackHomeLink from "@/components/BackHomeLink";

export const metadata: Metadata = {
  title: "あの人の今日の運勢占い｜名前を入れて無料でわかる",
  description:
    "頭に浮かんだあの人の今日の運勢を、名前を入れるだけでこっそり占えます。本人には内緒で、無料でのぞいてみませんか?",
  alternates: {
    canonical: "/friend",
  },
};

export default function FriendPage() {
  const today = new Date();
  const dateLabel = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(today);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <BackHomeLink />

      <section className="text-center">
        <p className="text-xl font-bold text-accent sm:text-2xl">
          {dateLabel}の運勢
        </p>
        <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
          占いババァが占う｜あの人の今日の運勢
        </h1>
        <p className="mt-3 text-sm text-foreground-muted">
          今、頭に浮かんだその人の名前を入れてみてください。ばあばがこっそり教えてくれます。
        </p>
      </section>

      <section className="mt-10">
        <NameFortuneGacha />
      </section>

      <section className="mt-16 space-y-4 text-sm leading-relaxed text-foreground-muted">
        <h2 className="text-lg font-bold text-foreground">
          あの人の今日の運勢占いとは
        </h2>
        <p>
          「あの人の今日の運勢占い」は、名前を入力するだけでその人の今日の運勢をこっそりのぞける無料ガチャです。友達や家族はもちろん、気になっているあの人、ちょっと苦手なあの人まで、本人に知られることなく占えます。同じ名前であれば今日は何度占っても同じ結果が表示されます。自分自身の運勢を占いたい方は、
          <Link href="/" className="text-accent hover:underline">
            今日の運勢ガチャ(トップページ)
          </Link>
          をご利用ください。
        </p>
      </section>

      <section className="mt-10 text-center">
        <Link href="/faq" className="text-sm text-accent hover:underline">
          よくある質問はこちら →
        </Link>
      </section>
    </div>
  );
}
