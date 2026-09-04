import FortuneGacha from "@/components/FortuneGacha";
import { rankMeanings } from "@/lib/fortune";

const faq = [
  {
    q: "1日に何回引けますか?",
    a: "何回でも引き直せます。ただし「今日の運勢」として端末に保存されるのは最後に引いた結果です。おみくじのように、最初の1回だけを信じるのもおすすめです。",
  },
  {
    q: "毎日結果は変わりますか?",
    a: "はい。日付が変わると保存されている結果はリセットされ、新しい日の運勢を引けるようになります。",
  },
  {
    q: "登録や料金は必要ですか?",
    a: "不要です。今日の運勢ガチャは会員登録なし・完全無料でご利用いただけます。",
  },
];

export default function Home() {
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
    mainEntity: faq.map((item) => ({
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

      <section className="text-center">
        <p className="text-xl font-bold text-accent sm:text-2xl">
          {dateLabel}の運勢
        </p>
        <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
          今日の運勢占い｜無料の運勢ガチャ
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

      <section className="mt-10">
        <h2 className="text-lg font-bold text-foreground">運勢ランクの意味</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-card-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-card-bg text-foreground-muted">
              <tr>
                <th className="px-4 py-2 font-medium">ランク</th>
                <th className="px-4 py-2 font-medium">読み方</th>
                <th className="px-4 py-2 font-medium">意味</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border">
              {rankMeanings().map((rank) => (
                <tr key={rank.key}>
                  <td className="px-4 py-2 font-bold text-accent">{rank.key}</td>
                  <td className="px-4 py-2 text-foreground-muted">{rank.reading}</td>
                  <td className="px-4 py-2 text-foreground-muted">{rank.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-foreground">よくある質問</h2>
        <dl className="mt-4 space-y-4 text-sm">
          {faq.map((item) => (
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
