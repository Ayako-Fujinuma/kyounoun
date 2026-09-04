import Link from "next/link";
import FortuneGacha from "@/components/FortuneGacha";

export default function Home() {
  const today = new Date();
  const dateLabel = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(today);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="text-center">
        <p className="text-xl font-bold text-accent sm:text-2xl">
          {dateLabel}の運勢
        </p>
        <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
          占いババァが占う、今日の運勢ガチャ
        </h1>
        <p className="mt-3 text-sm text-foreground-muted">
          ボタンをタップするだけで、総合運・恋愛運・仕事運・金運・健康運がまとめてわかります。
        </p>
      </section>

      <section className="mt-10">
        <FortuneGacha />
      </section>

      <section className="mt-16 space-y-4 text-sm leading-relaxed text-foreground-muted">
        <h2 className="text-lg font-bold text-foreground">
          今日の運勢ガチャとは
        </h2>
        <p>
          「今日の運勢ガチャ」は、おみくじのようにボタン一つで今日の運勢を占える無料占いサイトです。総合運は大吉・中吉・小吉・吉・末吉・凶・大凶の7段階で判定され、あわせて恋愛運・仕事運・金運・健康運の4カテゴリ、ラッキーカラー・ラッキーアイテム・ラッキーナンバーも表示されます。会員登録は不要で、毎日何度でも無料で楽しめます。
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
