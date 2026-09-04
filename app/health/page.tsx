import type { Metadata } from "next";
import Link from "next/link";
import HealthFortuneGacha from "@/components/HealthFortuneGacha";
import BackHomeLink from "@/components/BackHomeLink";

export const metadata: Metadata = {
  title: "今日の健康運占い｜無料ガチャで今日の健康運がわかる",
  description:
    "今日の健康運を無料のガチャ形式で診断。体調管理・食事や睡眠・リフレッシュ方法のアドバイス付きで、毎日無料で楽しめる健康運占いです。",
  alternates: {
    canonical: "/health",
  },
};

const healthFaq = [
  {
    q: "総合運の「今日の運勢ガチャ」との違いは?",
    a: "トップページの「今日の運勢ガチャ」は総合運・恋愛運・仕事運・金運・健康運をまとめて占うのに対し、このページは健康運だけをより詳しく占います。",
  },
  {
    q: "体調が悪いときの参考にできますか?",
    a: "当サイトの結果はエンタメを目的としたものです。体調に不安がある場合は、当サイトの結果に関わらず医師や専門機関にご相談ください。",
  },
];

export default function HealthPage() {
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
    mainEntity: healthFaq.map((item) => ({
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
          {dateLabel}の健康運
        </p>
        <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
          今日の健康運占い｜無料の健康運ガチャ
        </h1>
        <p className="mt-3 text-sm text-foreground-muted">
          体調管理・食事や睡眠・リフレッシュ方法のアドバイス付きで今日の健康運がわかります。
        </p>
      </section>

      <section className="mt-10">
        <HealthFortuneGacha />
      </section>

      <section className="mt-16 space-y-4 text-sm leading-relaxed text-foreground-muted">
        <h2 className="text-lg font-bold text-foreground">
          今日の健康運占いとは
        </h2>
        <p>
          「今日の健康運占い」は、今日の健康運だけにフォーカスした無料の占いガチャです。総合運・恋愛運・仕事運・金運もまとめて知りたい方は、
          <Link href="/" className="text-accent hover:underline">
            今日の運勢ガチャ(トップページ)
          </Link>
          もあわせてチェックしてみてください。
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-foreground">よくある質問</h2>
        <dl className="mt-4 space-y-4 text-sm">
          {healthFaq.map((item) => (
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
