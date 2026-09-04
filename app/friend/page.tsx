import type { Metadata } from "next";
import Link from "next/link";
import NameFortuneGacha from "@/components/NameFortuneGacha";
import BackHomeLink from "@/components/BackHomeLink";

export const metadata: Metadata = {
  title: "だれかの今日の運勢占い｜名前を入れて無料でわかる",
  description:
    "気になるあの人や友達の今日の運勢を、名前を入れるだけで無料で占えます。同じ名前なら今日は同じ結果が出る、名前占いガチャです。",
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
          だれかの今日の運勢占い｜名前占いガチャ
        </h1>
        <p className="mt-3 text-sm text-foreground-muted">
          自分だけでなく、気になるあの人や友達の今日の運勢も名前を入れるだけで占えます。
        </p>
      </section>

      <section className="mt-10">
        <NameFortuneGacha />
      </section>

      <section className="mt-16 space-y-4 text-sm leading-relaxed text-foreground-muted">
        <h2 className="text-lg font-bold text-foreground">
          だれかの今日の運勢占いとは
        </h2>
        <p>
          「だれかの今日の運勢占い」は、名前を入力するだけでその人の今日の運勢を占える無料ガチャです。同じ名前であれば今日は何度占っても同じ結果が表示されるので、友達や家族、気になるあの人の運勢をこっそりチェックするのに使えます。自分自身の運勢を占いたい方は、
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
