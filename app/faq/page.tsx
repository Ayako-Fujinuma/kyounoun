import type { Metadata } from "next";
import Link from "next/link";
import BackHomeLink from "@/components/BackHomeLink";

export const metadata: Metadata = {
  title: "よくある質問",
  description: "今日の運勢ガチャに関するよくある質問と回答をまとめています。",
  alternates: {
    canonical: "/faq",
  },
};

const faqGroups = [
  {
    title: "今日の運勢ガチャ(総合運)について",
    items: [
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
    ],
  },
  {
    title: "恋愛運占いについて",
    link: { href: "/love", label: "恋愛運占いはこちら" },
    items: [
      {
        q: "総合運の「今日の運勢ガチャ」との違いは?",
        a: "トップページの「今日の運勢ガチャ」は総合運・恋愛運・仕事運・金運・健康運をまとめて占うのに対し、恋愛運占いページは恋愛運だけをより詳しく占います。",
      },
      {
        q: "片思い中でも楽しめますか?",
        a: "はい。フリーの方・カップルの方・片思い中の方、それぞれの状況別アドバイスが表示されます。",
      },
    ],
  },
  {
    title: "金運占いについて",
    link: { href: "/money", label: "金運占いはこちら" },
    items: [
      {
        q: "総合運の「今日の運勢ガチャ」との違いは?",
        a: "トップページの「今日の運勢ガチャ」は総合運・恋愛運・仕事運・金運・健康運をまとめて占うのに対し、金運占いページは金運だけをより詳しく占います。",
      },
      {
        q: "買い物や投資の判断に使えますか?",
        a: "当サイトの結果はエンタメを目的としたものです。実際の買い物や投資の判断はご自身の責任で慎重に行ってください。",
      },
    ],
  },
  {
    title: "仕事運占いについて",
    link: { href: "/work", label: "仕事運占いはこちら" },
    items: [
      {
        q: "総合運の「今日の運勢ガチャ」との違いは?",
        a: "トップページの「今日の運勢ガチャ」は総合運・恋愛運・仕事運・金運・健康運をまとめて占うのに対し、仕事運占いページは仕事運だけをより詳しく占います。",
      },
      {
        q: "転職や大事な商談の判断に使えますか?",
        a: "当サイトの結果はエンタメを目的としたものです。重要な判断はご自身の状況をよく確認したうえで慎重に行ってください。",
      },
    ],
  },
  {
    title: "健康運占いについて",
    link: { href: "/health", label: "健康運占いはこちら" },
    items: [
      {
        q: "総合運の「今日の運勢ガチャ」との違いは?",
        a: "トップページの「今日の運勢ガチャ」は総合運・恋愛運・仕事運・金運・健康運をまとめて占うのに対し、健康運占いページは健康運だけをより詳しく占います。",
      },
      {
        q: "体調が悪いときの参考にできますか?",
        a: "当サイトの結果はエンタメを目的としたものです。体調に不安がある場合は、当サイトの結果に関わらず医師や専門機関にご相談ください。",
      },
    ],
  },
  {
    title: "あの人の今日の運勢占いについて",
    link: { href: "/friend", label: "あの人の今日の運勢占いはこちら" },
    items: [
      {
        q: "本人以外の名前を入れても大丈夫ですか?",
        a: "はい。友達や家族、気になっているあの人まで、本人に知られることなく名前を入れて楽しむための機能です。入力した名前はサーバーに送信・保存されず、その場で結果の計算にのみ使われます。",
      },
      {
        q: "同じ名前を何度も入れると結果は変わりますか?",
        a: "同じ日であれば、同じ名前を入力すると同じ結果が表示されます。日付が変わると新しい運勢になります。",
      },
    ],
  },
];

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    ),
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <BackHomeLink />

      <h1 className="text-center text-2xl font-bold sm:text-3xl">
        よくある質問
      </h1>

      <div className="mt-10 space-y-10">
        {faqGroups.map((group) => (
          <section key={group.title}>
            <h2 className="text-lg font-bold text-foreground">{group.title}</h2>
            <dl className="mt-4 space-y-4 text-sm">
              {group.items.map((item) => (
                <div key={item.q}>
                  <dt className="font-bold text-foreground">Q. {item.q}</dt>
                  <dd className="mt-1 text-foreground-muted">A. {item.a}</dd>
                </div>
              ))}
            </dl>
            {group.link && (
              <Link
                href={group.link.href}
                className="mt-4 inline-block text-sm text-accent hover:underline"
              >
                {group.link.label} →
              </Link>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
