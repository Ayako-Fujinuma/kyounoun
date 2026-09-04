import type { Metadata } from "next";
import Link from "next/link";
import HealthFortuneGacha from "@/components/HealthFortuneGacha";
import BackHomeLink from "@/components/BackHomeLink";

export const metadata: Metadata = {
  title: "今日の健康運占い｜占いババァが今日の健康運を無料診断",
  description:
    "今日の健康運を無料のガチャ形式で診断。体調管理・食事や睡眠・リフレッシュ方法のアドバイス付きで、毎日無料で楽しめる健康運占いです。",
  alternates: {
    canonical: "/health",
  },
};

export default function HealthPage() {
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
          {dateLabel}の健康運
        </p>
        <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
          占いババァが占う｜今日の健康運
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

      <section className="mt-10 text-center">
        <Link href="/faq" className="text-sm text-accent hover:underline">
          よくある質問はこちら →
        </Link>
      </section>
    </div>
  );
}
