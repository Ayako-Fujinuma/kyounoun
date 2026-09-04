import type { Metadata } from "next";
import Link from "next/link";
import LoveFortuneGacha from "@/components/LoveFortuneGacha";
import BackHomeLink from "@/components/BackHomeLink";

export const metadata: Metadata = {
  title: "今日の恋愛運占い｜無料ガチャで今日の恋愛運がわかる",
  description:
    "今日の恋愛運を無料のガチャ形式で診断。フリーの方・カップルの方・片思い中の方それぞれへのアドバイス付きで、毎日無料で楽しめる恋愛運占いです。",
  alternates: {
    canonical: "/love",
  },
};

const loveFaq = [
  {
    q: "総合運の「今日の運勢ガチャ」との違いは?",
    a: "トップページの「今日の運勢ガチャ」は総合運・恋愛運・仕事運・金運・健康運をまとめて占うのに対し、このページは恋愛運だけをより詳しく占います。",
  },
  {
    q: "片思い中でも楽しめますか?",
    a: "はい。フリーの方・カップルの方・片思い中の方、それぞれの状況別アドバイスが表示されます。",
  },
];

export default function LovePage() {
  const today = new Date();
  const dateLabel = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(today);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: loveFaq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <BackHomeLink />

      <section className="text-center">
        <p className="text-xl font-bold text-accent sm:text-2xl">
          {dateLabel}の恋愛運
        </p>
        <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
          今日の恋愛運占い｜無料の恋愛運ガチャ
        </h1>
        <p className="mt-3 text-sm text-foreground-muted">
          フリーの方・カップルの方・片思い中の方、それぞれへのアドバイス付きで今日の恋愛運がわかります。
        </p>
      </section>

      <section className="mt-10">
        <LoveFortuneGacha />
      </section>

      <section className="mt-16 space-y-4 text-sm leading-relaxed text-foreground-muted">
        <h2 className="text-lg font-bold text-foreground">
          今日の恋愛運占いとは
        </h2>
        <p>
          「今日の恋愛運占い」は、今日の恋愛運だけにフォーカスした無料の占いガチャです。総合運・仕事運・金運・健康運もまとめて知りたい方は、
          <Link href="/" className="text-accent hover:underline">
            今日の運勢ガチャ(トップページ)
          </Link>
          もあわせてチェックしてみてください。
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-foreground">よくある質問</h2>
        <dl className="mt-4 space-y-4 text-sm">
          {loveFaq.map((item) => (
            <div key={item.q}>
              <dt className="font-bold text-foreground">Q. {item.q}</dt>
              <dd className="mt-1 text-foreground-muted">A. {item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
