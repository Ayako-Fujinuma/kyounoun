// 今日の運勢ガチャ: 運勢データとロジック

export type RankKey =
  | "大吉"
  | "中吉"
  | "小吉"
  | "吉"
  | "末吉"
  | "凶"
  | "大凶";

interface RankInfo {
  key: RankKey;
  weight: number;
  emoji: string;
  from: string;
  to: string;
  reading: string;
  summary: string;
  messages: string[];
}

export interface CategoryResult {
  label: string;
  stars: number;
  comment: string;
}

export interface FortuneResult {
  rank: RankKey;
  emoji: string;
  from: string;
  to: string;
  message: string;
  categories: CategoryResult[];
  luckyColor: { name: string; hex: string };
  luckyItem: string;
  luckyNumber: number;
}

const RANKS: RankInfo[] = [
  {
    key: "大吉",
    weight: 8,
    emoji: "🌟",
    from: "from-amber-300",
    to: "to-yellow-100",
    reading: "だいきち",
    summary: "最高の運勢。何をしても上手くいく一日。",
    messages: [
      "何をやってもうまくいく、絶好調の一日。積極的に動いてみて。",
      "運気は最高潮!新しいことを始めるのに最適なタイミングです。",
      "迷っていたことがあるなら、今日決断すると吉。追い風が吹いています。",
    ],
  },
  {
    key: "中吉",
    weight: 15,
    emoji: "✨",
    from: "from-orange-300",
    to: "to-amber-100",
    reading: "ちゅうきち",
    summary: "良い運勢。前向きな行動が実を結ぶ日。",
    messages: [
      "コツコツ続けてきたことに、良い結果が見え始めそう。",
      "周りの人との会話がヒントをくれる一日。素直に耳を傾けて。",
      "小さな幸運が重なりやすい日。気になったことは試してみて。",
    ],
  },
  {
    key: "小吉",
    weight: 20,
    emoji: "🍀",
    from: "from-lime-300",
    to: "to-green-100",
    reading: "しょうきち",
    summary: "穏やかな運勢。無理をしなければ平和に過ごせる日。",
    messages: [
      "特別なことはなくても、穏やかで心地よい一日になりそう。",
      "いつも通りのペースを大事にすると、うまく回る日。",
      "小さな「ありがとう」を伝えると、良い流れが生まれそう。",
    ],
  },
  {
    key: "吉",
    weight: 25,
    emoji: "🌤️",
    from: "from-sky-300",
    to: "to-cyan-100",
    reading: "きち",
    summary: "まずまずの運勢。落ち着いて過ごせば問題なし。",
    messages: [
      "可もなく不可もなく、安定した一日。いつも通りで大丈夫。",
      "地味だけど着実。今日の積み重ねが後で効いてきます。",
      "焦らずマイペースに過ごすのがちょうど良い日。",
    ],
  },
  {
    key: "末吉",
    weight: 17,
    emoji: "🌥️",
    from: "from-slate-300",
    to: "to-blue-100",
    reading: "すえきち",
    summary: "後半に運気が上向く日。夕方以降に期待。",
    messages: [
      "朝はイマイチでも、夕方以降に運気が上向きそう。焦らずに。",
      "最初は小さなつまずきがあっても、最後には笑って終われそう。",
      "今日は「待つ」がキーワード。焦って動くより流れに乗って。",
    ],
  },
  {
    key: "凶",
    weight: 10,
    emoji: "🌧️",
    from: "from-indigo-300",
    to: "to-slate-200",
    reading: "きょう",
    summary: "注意が必要な運勢。無理せず守りの一日を。",
    messages: [
      "少し慎重に。無理は禁物、今日は守りの一日を。",
      "小さなトラブルに注意。深呼吸してゆっくり過ごしましょう。",
      "急ぎの判断は避けて、今日は一呼吸置いてから動くと吉。",
    ],
  },
  {
    key: "大凶",
    weight: 5,
    emoji: "⛈️",
    from: "from-violet-400",
    to: "to-indigo-200",
    reading: "だいきょう",
    summary: "波乱含みの運勢。今日は静かに過ごすのが一番。",
    messages: [
      "今日は無理せず、静かに過ごすのが吉。焦らず自分のペースで。",
      "何事も慎重に。今日は「動かない」が最善の一手かも。",
      "凶が出た日は明日への準備日。ゆっくり休んで英気を養って。",
    ],
  },
];

const CATEGORY_COMMENTS: Record<string, string[]> = {
  恋愛運: [
    "今日は無理せずマイペースに。自分磨きの時間に充てて。",
    "気になる人とは、まず挨拶や短い会話から始めてみて。",
    "素直な気持ちを伝えると、思った以上に良い反応がありそう。",
    "運命的な出会いが近いかも。アンテナを高く張っておいて。",
    "パートナーとの時間を大切にすると、絆が深まる一日。",
  ],
  仕事運: [
    "今日は無理な予定を詰め込みすぎないのが吉。",
    "ルーティンをこなすと、着実に信頼が積み上がる日。",
    "新しいアイデアが浮かびやすい日。メモしておくと後で役立つかも。",
    "周囲との連携がうまくいきやすい日。相談してみて。",
    "大きなチャンスが舞い込むかも。準備を怠らずに。",
  ],
  金運: [
    "衝動買いには要注意。今日は財布のひもを締めて。",
    "普段通りの金銭管理を続けるのが安心な一日。",
    "臨時収入やお得な情報が舞い込むかも。アンテナを張って。",
    "欲しかったものを手に入れるのに良いタイミング。",
    "貯金や投資について見直すと、良い発見がありそう。",
  ],
  健康運: [
    "今日は無理せず、早めの休息を心がけて。",
    "いつも通りの生活リズムを守るのが一番。",
    "軽い運動やストレッチが、気分をすっきりさせてくれそう。",
    "睡眠の質を意識すると、一日のパフォーマンスが上がりそう。",
    "体調は良好。新しいことにチャレンジするのに向いている日。",
  ],
};

const LUCKY_COLORS: { name: string; hex: string }[] = [
  { name: "紅色", hex: "#C93756" },
  { name: "藍色", hex: "#2E4C6D" },
  { name: "山吹色", hex: "#F8B500" },
  { name: "若草色", hex: "#8FC31F" },
  { name: "空色", hex: "#7EC3E8" },
  { name: "桜色", hex: "#FDEEF4" },
  { name: "金色", hex: "#D4AF37" },
  { name: "白", hex: "#FAFAFA" },
  { name: "紫色", hex: "#7B4B94" },
  { name: "橙色", hex: "#F08300" },
  { name: "深緑", hex: "#2E5339" },
  { name: "銀鼠", hex: "#AFAFB0" },
];

const LUCKY_ITEMS: string[] = [
  "万年筆",
  "白いハンカチ",
  "観葉植物",
  "アロマキャンドル",
  "お気に入りの手帳",
  "スマホケース",
  "お守り",
  "腕時計",
  "小さなぬいぐるみ",
  "マグカップ",
  "折りたたみ傘",
  "しおり",
  "星形のアクセサリー",
  "手作りのお菓子",
  "新しい靴下",
  "読みかけの本",
  "推し活グッズ",
  "淹れたてのコーヒー",
];

// mulberry32: 軽量な決定論的擬似乱数生成器
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickWeighted<T extends { weight: number }>(
  items: T[],
  rng: () => number,
): T {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let r = rng() * total;
  for (const item of items) {
    r -= item.weight;
    if (r <= 0) return item;
  }
  return items[items.length - 1];
}

function pick<T>(items: T[], rng: () => number): T {
  return items[Math.floor(rng() * items.length)];
}

export function seedFromString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (Math.imul(31, hash) + input.charCodeAt(i)) | 0;
  }
  return hash;
}

export function todayKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function generateFortune(seed: number): FortuneResult {
  const rng = mulberry32(seed);
  const rank = pickWeighted(RANKS, rng);
  const message = pick(rank.messages, rng);

  const categories: CategoryResult[] = Object.entries(CATEGORY_COMMENTS).map(
    ([label, comments]) => ({
      label,
      stars: Math.max(1, Math.min(5, Math.floor(rng() * 5) + 1)),
      comment: pick(comments, rng),
    }),
  );

  return {
    rank: rank.key,
    emoji: rank.emoji,
    from: rank.from,
    to: rank.to,
    message,
    categories,
    luckyColor: pick(LUCKY_COLORS, rng),
    luckyItem: pick(LUCKY_ITEMS, rng),
    luckyNumber: Math.floor(rng() * 99) + 1,
  };
}

export function rankMeanings(): { key: RankKey; reading: string; summary: string }[] {
  return RANKS.map(({ key, reading, summary }) => ({ key, reading, summary }));
}

// 恋愛運専用ガチャ

export interface LoveFortuneResult {
  rank: RankKey;
  emoji: string;
  from: string;
  to: string;
  message: string;
  adviceFree: string;
  adviceCouple: string;
  adviceCrush: string;
}

const LOVE_MESSAGES: Record<RankKey, string[]> = {
  大吉: [
    "恋愛運は最高潮。運命的な出会いや告白の成功など、うれしい出来事が起こりやすい一日です。",
    "気持ちを伝えるなら今日が絶好のタイミング。積極的な行動が良い結果につながります。",
  ],
  中吉: [
    "恋愛面で嬉しい進展がありそうな日。相手からの連絡や誘いにアンテナを張っておいて。",
    "自然体でいることが魅力につながる一日。無理に飾らず、素直な自分で過ごして。",
  ],
  小吉: [
    "穏やかな愛情運。派手な展開はなくても、じんわり関係が温まる一日です。",
    "普段のコミュニケーションを大切にすると、じわじわ距離が縮まりそう。",
  ],
  吉: [
    "恋愛運は安定モード。焦らずいつも通りに過ごすのが一番の吉です。",
    "特別なことがなくても、今日の積み重ねが後々良い縁につながりそう。",
  ],
  末吉: [
    "最初は進展が薄くても、夕方以降に恋のチャンスが巡ってきそうな日。",
    "今日は「待つ」のが吉。焦って動くより、自然な流れに身をまかせて。",
  ],
  凶: [
    "すれ違いが起きやすい日。感情的にならず、一呼吸置いてから言葉を選んで。",
    "今日は無理に距離を詰めようとせず、自分の時間を大切にして。",
  ],
  大凶: [
    "恋愛面では波乱含みの一日。大事な話や決断は今日を避けるのが無難です。",
    "今日は恋愛よりも自分自身をいたわる日に。焦らず静かに過ごして。",
  ],
};

const ADVICE_FREE = [
  "新しい場所やコミュニティに顔を出すと、思わぬ出会いがあるかも。",
  "自分磨きに時間を使うと、後で良い縁を引き寄せやすくなりそう。",
  "友人からの紹介話には、軽い気持ちで乗ってみると良さそう。",
  "SNSでの何気ないやり取りが、意外なきっかけになるかも。",
];

const ADVICE_COUPLE = [
  "感謝の言葉を伝えると、二人の距離がぐっと縮まりそう。",
  "小さな記念日やサプライズを用意すると喜ばれる一日。",
  "相手の話にじっくり耳を傾けると、絆が深まりそう。",
  "たまには予定のない時間を一緒に過ごすのがおすすめ。",
];

const ADVICE_CRUSH = [
  "共通の話題を見つけて、自然な会話のきっかけを作ってみて。",
  "焦らず、まずは挨拶や短いやり取りの回数を増やしてみて。",
  "SNSの反応など、小さなサインを見逃さないようにして。",
  "思い切って二人だけで話せる機会を作ってみるのも良さそう。",
];

export function generateLoveFortune(seed: number): LoveFortuneResult {
  const rng = mulberry32(seed);
  const rank = pickWeighted(RANKS, rng);
  const message = pick(LOVE_MESSAGES[rank.key], rng);

  return {
    rank: rank.key,
    emoji: rank.emoji,
    from: rank.from,
    to: rank.to,
    message,
    adviceFree: pick(ADVICE_FREE, rng),
    adviceCouple: pick(ADVICE_COUPLE, rng),
    adviceCrush: pick(ADVICE_CRUSH, rng),
  };
}
