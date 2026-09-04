import type { Metadata } from "next";
import Link from "next/link";
import WorkFortuneGacha from "@/components/WorkFortuneGacha";
import BackHomeLink from "@/components/BackHomeLink";

export const metadata: Metadata = {
  title: "今日の仕事運占い｜無料ガチャで今日の仕事運がわかる",
  description:
    "今日の仕事運を無料のガチャ形式で診断。集中力のヒント・人間関係・チャンスをつかむためのアドバイス付きで、毎日無料で楽しめる仕事運占いです。",
  alternates: {
    canonical: "/work",
  },
};

const workFaq = [
  {
    q: "総合運の「今日の運勢ガチャ」との違いは?",
    a: "トップページの「今日の運勢ガチャ」は総合運・恋愛運・仕事運・金運・健康運をまとめて占うのに対し、このページは仕事運だけをより詳しく占います。",
  },
  {
    q: "転職や大事な商談の判断に使えますか?",
    a: "当サイトの結果はエンタメを目的としたものです。重要な判断はご自身の状況をよく確認したうえで慎重に行ってください。",
  },
];

export default function WorkPage() {
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
    mainEntity: workFaq.map((item) => ({
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
          {dateLabel}の仕事運
        </p>
        <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
          今日の仕事運占い｜無料の仕事運ガチャ
        </h1>
        <p className="mt-3 text-sm text-foreground-muted">
          集中力のヒント・人間関係・チャンスをつかむためのアドバイス付きで今日の仕事運がわかります。
        </p>
      </section>

      <section className="mt-10">
        <WorkFortuneGacha />
      </section>

      <section className="mt-16 space-y-4 text-sm leading-relaxed text-foreground-muted">
        <h2 className="text-lg font-bold text-foreground">
          今日の仕事運占いとは
        </h2>
        <p>
          「今日の仕事運占い」は、今日の仕事運だけにフォーカスした無料の占いガチャです。総合運・恋愛運・金運・健康運もまとめて知りたい方は、
          <Link href="/" className="text-accent hover:underline">
            今日の運勢ガチャ(トップページ)
          </Link>
          もあわせてチェックしてみてください。
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-foreground">よくある質問</h2>
        <dl className="mt-4 space-y-4 text-sm">
          {workFaq.map((item) => (
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
