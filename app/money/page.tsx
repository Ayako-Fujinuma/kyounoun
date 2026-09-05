import type { Metadata } from "next";
import Link from "next/link";
import MoneyFortuneGacha from "@/components/MoneyFortuneGacha";
import BackHomeLink from "@/components/BackHomeLink";
import { grandmaImageForRank } from "@/lib/fortune";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ rank?: string }>;
}): Promise<Metadata> {
  const { rank } = await searchParams;
  const image = grandmaImageForRank(rank);
  const base = {
    alternates: { canonical: "/money" },
  };

  if (!image) {
    return {
      ...base,
      title: "今日の金運占い｜占いババァが今日の金運を無料診断",
      description:
        "今日の金運を無料のガチャ形式で診断。使い方のヒント・貯蓄の見直し・ラッキーな出来事のアドバイス付きで、毎日無料で楽しめる金運占いです。",
    };
  }

  const title = `今日の金運は「${rank}」でした!｜占いババァが占う金運`;
  const description = `占いババァが占った今日の金運は「${rank}」。あなたの金運も無料でチェックできます。`;

  return {
    ...base,
    title,
    description,
    openGraph: { title, description, images: [{ url: image, alt: rank as string }] },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function MoneyPage() {
  const today = new Date();
  const dateLabel = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
    timeZone: "Asia/Tokyo",
  }).format(today);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <BackHomeLink />

      <section className="text-center">
        <p className="text-xl font-bold text-accent sm:text-2xl">
          {dateLabel}の金運
        </p>
        <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
          占いババァが占う｜今日の金運
        </h1>
        <p className="mt-3 text-sm text-foreground-muted">
          使い方のヒント・貯蓄の見直し・ラッキーな出来事のアドバイス付きで今日の金運がわかります。
        </p>
      </section>

      <section className="mt-10">
        <MoneyFortuneGacha />
      </section>

      <section className="mt-16 space-y-4 text-sm leading-relaxed text-foreground-muted">
        <h2 className="text-lg font-bold text-foreground">
          今日の金運占いとは
        </h2>
        <p>
          「今日の金運占い」は、今日の金運だけにフォーカスした無料の占いガチャです。総合運・恋愛運・仕事運・健康運もまとめて知りたい方は、
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
