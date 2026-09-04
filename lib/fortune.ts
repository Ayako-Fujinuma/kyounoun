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
  image: string;
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
  image: string;
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
    image: "/images/ranks/daikichi.jpeg",
    from: "from-amber-300",
    to: "to-yellow-100",
    reading: "だいきち",
    summary: "最高の運勢。何をしても上手くいく一日。",
    messages: [
      "何をやってもうまくいく、絶好調の一日。積極的に動いてみて。",
      "運気は最高潮!新しいことを始めるのに最適なタイミングです。",
      "迷っていたことがあるなら、今日決断すると吉。追い風が吹いています。",
      "思いがけない幸運が舞い込みそうな、特別な一日。",
      "周りからの協力も得やすく、物事がスムーズに進みそう。",
      "直感を信じて動くと、驚くほどうまくいきそうな日。",
    ],
  },
  {
    key: "中吉",
    weight: 15,
    image: "/images/ranks/chukichi.jpeg",
    from: "from-orange-300",
    to: "to-amber-100",
    reading: "ちゅうきち",
    summary: "良い運勢。前向きな行動が実を結ぶ日。",
    messages: [
      "コツコツ続けてきたことに、良い結果が見え始めそう。",
      "周りの人との会話がヒントをくれる一日。素直に耳を傾けて。",
      "小さな幸運が重なりやすい日。気になったことは試してみて。",
      "努力が形になり始める兆し。焦らず続けてみて。",
      "誰かのちょっとした一言が、良いきっかけになりそう。",
      "計画していたことを実行に移すのに向いている日。",
    ],
  },
  {
    key: "小吉",
    weight: 20,
    image: "/images/ranks/shokichi.jpeg",
    from: "from-lime-300",
    to: "to-green-100",
    reading: "しょうきち",
    summary: "穏やかな運勢。無理をしなければ平和に過ごせる日。",
    messages: [
      "特別なことはなくても、穏やかで心地よい一日になりそう。",
      "いつも通りのペースを大事にすると、うまく回る日。",
      "小さな「ありがとう」を伝えると、良い流れが生まれそう。",
      "大きな変化はなくても、心地よい安定感のある一日。",
      "身近な人との時間が、ほっとひと息つかせてくれそう。",
      "焦らずコツコツ、が今日のキーワード。",
    ],
  },
  {
    key: "吉",
    weight: 25,
    image: "/images/ranks/kichi.jpeg",
    from: "from-sky-300",
    to: "to-cyan-100",
    reading: "きち",
    summary: "まずまずの運勢。落ち着いて過ごせば問題なし。",
    messages: [
      "可もなく不可もなく、安定した一日。いつも通りで大丈夫。",
      "地味だけど着実。今日の積み重ねが後で効いてきます。",
      "焦らずマイペースに過ごすのがちょうど良い日。",
      "派手さはなくても、堅実に過ごせる一日になりそう。",
      "いつものルーティンが、意外と心の支えになる日。",
      "無理せず自分のペースを守ると、うまく回りそう。",
    ],
  },
  {
    key: "末吉",
    weight: 17,
    image: "/images/ranks/suekichi.jpeg",
    from: "from-slate-300",
    to: "to-blue-100",
    reading: "すえきち",
    summary: "後半に運気が上向く日。夕方以降に期待。",
    messages: [
      "朝はイマイチでも、夕方以降に運気が上向きそう。焦らずに。",
      "最初は小さなつまずきがあっても、最後には笑って終われそう。",
      "今日は「待つ」がキーワード。焦って動くより流れに乗って。",
      "じわじわと運気が上向いてくる、粘り勝ちの一日。",
      "最初はぱっとしなくても、終わってみれば悪くない一日に。",
      "焦らずコツコツ取り組むと、後から報われそう。",
    ],
  },
  {
    key: "凶",
    weight: 10,
    image: "/images/ranks/kyo.jpeg",
    from: "from-indigo-300",
    to: "to-slate-200",
    reading: "きょう",
    summary: "注意が必要な運勢。無理せず守りの一日を。",
    messages: [
      "少し慎重に。無理は禁物、今日は守りの一日を。",
      "小さなトラブルに注意。深呼吸してゆっくり過ごしましょう。",
      "急ぎの判断は避けて、今日は一呼吸置いてから動くと吉。",
      "今日は目立った行動を控えめに、様子見が吉。",
      "思い込みで判断せず、一度立ち止まって確認して。",
      "予定を詰め込みすぎず、余裕を持って過ごして。",
    ],
  },
  {
    key: "大凶",
    weight: 5,
    image: "/images/ranks/daikyo.jpeg",
    from: "from-violet-400",
    to: "to-indigo-200",
    reading: "だいきょう",
    summary: "波乱含みの運勢。今日は静かに過ごすのが一番。",
    messages: [
      "今日は無理せず、静かに過ごすのが吉。焦らず自分のペースで。",
      "何事も慎重に。今日は「動かない」が最善の一手かも。",
      "凶が出た日は明日への準備日。ゆっくり休んで英気を養って。",
      "今日は大きな決断を避け、いつも通りを心がけて。",
      "周りに頼れるところは頼って、無理をしない一日に。",
      "嵐が過ぎるのを待つように、静かに過ごすのが一番。",
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
    "相手の良いところに目を向けると、気持ちが温かくなりそう。",
    "連絡を取るなら、今日は良いタイミングかも。",
    "ひとりの時間を楽しむことも、魅力を磨く近道。",
    "些細なすれ違いは、素直な言葉で解消できそう。",
  ],
  仕事運: [
    "今日は無理な予定を詰め込みすぎないのが吉。",
    "ルーティンをこなすと、着実に信頼が積み上がる日。",
    "新しいアイデアが浮かびやすい日。メモしておくと後で役立つかも。",
    "周囲との連携がうまくいきやすい日。相談してみて。",
    "大きなチャンスが舞い込むかも。準備を怠らずに。",
    "得意分野で力を発揮しやすい日。自信を持って取り組んで。",
    "後回しにしていたタスクを片付けると、気持ちが軽くなりそう。",
    "周囲からのフィードバックが、成長のヒントになりそう。",
    "少し早めに動き出すと、余裕を持って進められそう。",
  ],
  金運: [
    "衝動買いには要注意。今日は財布のひもを締めて。",
    "普段通りの金銭管理を続けるのが安心な一日。",
    "臨時収入やお得な情報が舞い込むかも。アンテナを張って。",
    "欲しかったものを手に入れるのに良いタイミング。",
    "貯金や投資について見直すと、良い発見がありそう。",
    "日用品の見直しが、思わぬ節約につながりそう。",
    "人との食事や交流にお金を使うと、良い縁につながるかも。",
    "収支を記録してみると、新しい発見がありそう。",
    "小さな贅沢が、明日への活力になりそう。",
  ],
  健康運: [
    "今日は無理せず、早めの休息を心がけて。",
    "いつも通りの生活リズムを守るのが一番。",
    "軽い運動やストレッチが、気分をすっきりさせてくれそう。",
    "睡眠の質を意識すると、一日のパフォーマンスが上がりそう。",
    "体調は良好。新しいことにチャレンジするのに向いている日。",
    "こまめなストレッチが、体の軽さにつながりそう。",
    "食事のバランスを意識すると、調子が整いやすい日。",
    "深呼吸でリラックスすると、気持ちも軽くなりそう。",
    "無理をしない範囲で体を動かすと、気分転換になりそう。",
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
  { name: "茜色", hex: "#B7282E" },
  { name: "浅葱色", hex: "#00A3AF" },
  { name: "亜麻色", hex: "#D9BD94" },
  { name: "瑠璃色", hex: "#1E50A2" },
  { name: "抹茶色", hex: "#7B8B4E" },
  { name: "珊瑚色", hex: "#F2917B" },
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
  "キャンドル",
  "お気に入りのノート",
  "アクセサリーケース",
  "マイタンブラー",
  "小さな観葉植物の鉢",
  "ヘアアクセサリー",
  "香水",
  "手紙",
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
    image: rank.image,
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
  image: string;
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
    "誰かがあなたの魅力に気づきそうな日。自信を持って過ごして。",
    "ときめく出来事が舞い込みそう。心の準備をしておいて。",
  ],
  中吉: [
    "恋愛面で嬉しい進展がありそうな日。相手からの連絡や誘いにアンテナを張っておいて。",
    "自然体でいることが魅力につながる一日。無理に飾らず、素直な自分で過ごして。",
    "気になる人との距離が、少しずつ縮まっていきそう。",
    "笑顔を心がけると、恋のチャンスを引き寄せやすい日。",
  ],
  小吉: [
    "穏やかな愛情運。派手な展開はなくても、じんわり関係が温まる一日です。",
    "普段のコミュニケーションを大切にすると、じわじわ距離が縮まりそう。",
    "無理に動かなくても、自然な形で縁がつながっていきそう。",
    "リラックスして過ごすことが、良い雰囲気につながりそう。",
  ],
  吉: [
    "恋愛運は安定モード。焦らずいつも通りに過ごすのが一番の吉です。",
    "特別なことがなくても、今日の積み重ねが後々良い縁につながりそう。",
    "落ち着いた関係作りが、後の安心感につながりそう。",
    "無理せず自分らしくいることが、一番の魅力になる日。",
  ],
  末吉: [
    "最初は進展が薄くても、夕方以降に恋のチャンスが巡ってきそうな日。",
    "今日は「待つ」のが吉。焦って動くより、自然な流れに身をまかせて。",
    "地道な関わりが、後になって実を結びそうな予感。",
    "焦らずゆっくり関係を育てるのに向いている日。",
  ],
  凶: [
    "すれ違いが起きやすい日。感情的にならず、一呼吸置いてから言葉を選んで。",
    "今日は無理に距離を詰めようとせず、自分の時間を大切にして。",
    "誤解が生まれやすい日。言葉選びは丁寧に。",
    "無理に答えを急がず、少し時間を置くのが良さそう。",
  ],
  大凶: [
    "恋愛面では波乱含みの一日。大事な話や決断は今日を避けるのが無難です。",
    "今日は恋愛よりも自分自身をいたわる日に。焦らず静かに過ごして。",
    "気持ちが揺れやすい日。大きな判断は先送りにして。",
    "今日は距離を置くくらいがちょうど良さそう。",
  ],
};

const ADVICE_FREE = [
  "新しい場所やコミュニティに顔を出すと、思わぬ出会いがあるかも。",
  "自分磨きに時間を使うと、後で良い縁を引き寄せやすくなりそう。",
  "友人からの紹介話には、軽い気持ちで乗ってみると良さそう。",
  "SNSでの何気ないやり取りが、意外なきっかけになるかも。",
  "趣味の集まりに参加すると、気の合う人に出会えそう。",
  "久しぶりの友人に連絡してみると、新しいご縁につながるかも。",
  "自分の「好き」を大事にしていると、自然と人を惹きつけそう。",
];

const ADVICE_COUPLE = [
  "感謝の言葉を伝えると、二人の距離がぐっと縮まりそう。",
  "小さな記念日やサプライズを用意すると喜ばれる一日。",
  "相手の話にじっくり耳を傾けると、絆が深まりそう。",
  "たまには予定のない時間を一緒に過ごすのがおすすめ。",
  "一緒に新しいことに挑戦すると、関係がより深まりそう。",
  "素直に「会いたい」と伝えると、良い反応がありそう。",
  "お互いのペースを尊重すると、心地よい関係が続きそう。",
];

const ADVICE_CRUSH = [
  "共通の話題を見つけて、自然な会話のきっかけを作ってみて。",
  "焦らず、まずは挨拶や短いやり取りの回数を増やしてみて。",
  "SNSの反応など、小さなサインを見逃さないようにして。",
  "思い切って二人だけで話せる機会を作ってみるのも良さそう。",
  "笑顔でいることを意識すると、印象がぐっと良くなりそう。",
  "無理に距離を詰めず、自然な関わりを積み重ねてみて。",
  "相手の好きなものについて聞いてみると、会話が弾みそう。",
];

export function generateLoveFortune(seed: number): LoveFortuneResult {
  const rng = mulberry32(seed);
  const rank = pickWeighted(RANKS, rng);
  const message = pick(LOVE_MESSAGES[rank.key], rng);

  return {
    rank: rank.key,
    image: rank.image,
    from: rank.from,
    to: rank.to,
    message,
    adviceFree: pick(ADVICE_FREE, rng),
    adviceCouple: pick(ADVICE_COUPLE, rng),
    adviceCrush: pick(ADVICE_CRUSH, rng),
  };
}

// 金運専用ガチャ

export interface MoneyFortuneResult {
  rank: RankKey;
  image: string;
  from: string;
  to: string;
  message: string;
  adviceSpending: string;
  adviceSaving: string;
  adviceWindfall: string;
}

const MONEY_MESSAGES: Record<RankKey, string[]> = {
  大吉: [
    "金運は絶好調。臨時収入やお得な話が舞い込みやすい一日です。",
    "欲しかったものを手に入れるのに最適なタイミング。良い買い物ができそう。",
    "投資や資産形成について、良いヒントが得られそうな日。",
    "お財布に嬉しい出来事が重なりそうな一日。",
  ],
  中吉: [
    "金運は好調。堅実な判断がそのまま良い結果につながりそうです。",
    "お得な情報が入ってきやすい日。アンテナを張っておくと良いことがあるかも。",
    "計画的なお金の使い方が、後で良い結果につながりそう。",
    "ちょっとした工夫が、お財布に優しい一日をもたらしそう。",
  ],
  小吉: [
    "穏やかな金運。大きな動きはなくても、無駄遣いが減りやすい一日です。",
    "家計を見直すと、小さな発見がありそうな日。",
    "無理のない範囲でのお金の使い方が、安心感につながりそう。",
    "コツコツ貯めてきたことが、じわじわ実を結びそうな日。",
  ],
  吉: [
    "金運は安定モード。いつも通りの金銭感覚で過ごせば問題なし。",
    "大きな出入りはなく、落ち着いてお金と向き合える一日です。",
    "堅実な金銭感覚が、今日も安心を運んでくれそう。",
    "特別なことはなくても、平穏な金運が続きそうな日。",
  ],
  末吉: [
    "最初は財布のひもが固くても、後半に嬉しい出費や収入がありそう。",
    "今日は無理に動かず、様子を見るのが吉。焦って使わないように。",
    "地道な節約が、後になって効いてきそうな一日。",
    "焦らず様子を見ることで、良いタイミングを掴めそう。",
  ],
  凶: [
    "衝動買いに注意。今日の大きな買い物は先延ばしにするのが無難です。",
    "お金の貸し借りやリスクの高い判断は避けたほうが良さそうな日。",
    "今日は財布の中身をよく確認してから動くのが安心。",
    "思わぬ出費に注意。予定外の買い物は控えめに。",
  ],
  大凶: [
    "金運は波乱含み。契約や大きな支払いは今日を避けるのが安心です。",
    "今日は財布を締めて、静かに過ごすのが一番。無理な出費はNG。",
    "大きな金銭の動きは、今日を避けたほうが無難そう。",
    "今日は現状維持を心がけ、無理な出費は控えて。",
  ],
};

const ADVICE_SPENDING = [
  "本当に必要なものかどうか、一晩考えてから購入すると安心。",
  "セールやポイント還元のタイミングを狙うと得しやすい日。",
  "外食や買い物は予算を決めてから出かけると失敗が少なそう。",
  "「欲しい」より「必要」を基準に選ぶと後悔が少なそう。",
  "クーポンやポイントの使い忘れがないか、確認してみて。",
  "誰かと一緒の買い物は、冷静な判断の助けになりそう。",
  "現金派・キャッシュレス派どちらでも、記録を残すのがおすすめ。",
];

const ADVICE_SAVING = [
  "家計簿やアプリで支出を見直すと、良い発見がありそう。",
  "少額からでも貯蓄や積立を始めるのに向いている日。",
  "サブスクなど固定費の見直しをすると節約につながりそう。",
  "将来の目標を思い出しながらお金の使い方を見直してみて。",
  "小さな貯金箱やチャレンジ貯金を始めるのに良いタイミング。",
  "使っていないサービスを解約すると、すっきりしそう。",
  "先取り貯蓄の仕組みを作ると、後が楽になりそう。",
];

const ADVICE_WINDFALL = [
  "思わぬ形で臨時収入やプレゼントが舞い込むかも。",
  "懸賞やポイント還元など、小さなラッキーに気づきやすい日。",
  "誰かにご馳走してもらえるなど、嬉しい出来事があるかも。",
  "フリマアプリなどで思わぬ収入が入るきっかけがありそう。",
  "キャンペーンやクーポンなど、お得な情報に出会えそう。",
  "誰かへの気遣いが、思わぬ形で返ってきそうな日。",
  "忘れていたポイントやお釣りを見つけるかも。",
];

export function generateMoneyFortune(seed: number): MoneyFortuneResult {
  const rng = mulberry32(seed);
  const rank = pickWeighted(RANKS, rng);
  const message = pick(MONEY_MESSAGES[rank.key], rng);

  return {
    rank: rank.key,
    image: rank.image,
    from: rank.from,
    to: rank.to,
    message,
    adviceSpending: pick(ADVICE_SPENDING, rng),
    adviceSaving: pick(ADVICE_SAVING, rng),
    adviceWindfall: pick(ADVICE_WINDFALL, rng),
  };
}

// 仕事運専用ガチャ

export interface WorkFortuneResult {
  rank: RankKey;
  image: string;
  from: string;
  to: string;
  message: string;
  adviceFocus: string;
  adviceRelationship: string;
  adviceChance: string;
}

const WORK_MESSAGES: Record<RankKey, string[]> = {
  大吉: [
    "仕事運は絶好調。大きなチャンスが舞い込みやすく、評価にもつながりそうな一日です。",
    "アイデアが次々に浮かびそうな日。積極的に発言・提案すると良い流れに乗れそう。",
    "これまでの頑張りが、しっかり形になって返ってきそうな日。",
    "重要な場面で実力を発揮しやすい、絶好のタイミング。",
  ],
  中吉: [
    "仕事運は好調。コツコツ続けてきたことに、良い結果が見え始めそうです。",
    "周囲との連携がスムーズにいきやすい日。相談すると良いヒントがもらえそう。",
    "新しい視点が、仕事の突破口になりそうな一日。",
    "周りからの信頼を、じわじわ実感できそうな日。",
  ],
  小吉: [
    "穏やかな仕事運。目立った動きはなくても、着実に信頼が積み上がる一日です。",
    "ルーティンをこなすことが、後で評価につながりそうな日。",
    "地道な作業が、じっくり成果につながっていきそう。",
    "無理のないペースで進めると、うまく回りそうな日。",
  ],
  吉: [
    "仕事運は安定モード。いつも通りのペースで取り組めば問題なし。",
    "地味だけど着実。今日の積み重ねが後で効いてきそうです。",
    "普段通りの取り組みが、安定した成果につながりそう。",
    "特別なことをしなくても、着実に前進できそうな日。",
  ],
  末吉: [
    "最初は伸び悩んでも、午後以降に流れが変わりそうな一日。",
    "焦って結果を求めず、丁寧に一つずつ進めるのが吉。",
    "小さな積み重ねが、後になって力を発揮しそうな日。",
    "地道な努力が、少し先で報われそうな予感。",
  ],
  凶: [
    "予定外のトラブルに注意。ダブルチェックを心がけると安心です。",
    "大きな決断や新しい挑戦は、今日は見送るのが無難そう。",
    "急ぎの案件ほど、慎重な確認を心がけて。",
    "今日は目立つ動きより、丁寧な仕事を優先して。",
  ],
  大凶: [
    "仕事運は波乱含み。重要な判断や契約は今日を避けるのが安心です。",
    "今日は無理をせず、守りの姿勢で丁寧に業務をこなして。",
    "大きな決断は先送りにして、今日はできることを着実に。",
    "無理に前へ進まず、体制を整える日と捉えて。",
  ],
};

const ADVICE_FOCUS = [
  "タスクを小さく分けて取り組むと、集中力が続きやすい日。",
  "作業前に机まわりを片付けると、頭も整理されそう。",
  "一番大事なタスクから先に手をつけると、うまく回りそう。",
  "こまめな休憩を挟むと、後半も集中力を保てそう。",
  "スマホを視界から外すと、集中力が続きやすそう。",
  "タイマーを使って区切ると、作業がはかどりそう。",
  "朝一番に重要な作業を片付けると、一日が楽になりそう。",
];

const ADVICE_RELATIONSHIP = [
  "何気ない雑談が、良いヒントやチャンスにつながるかも。",
  "感謝の一言を伝えると、チームの空気が良くなりそう。",
  "意見が食い違ったら、まず相手の話をじっくり聞いてみて。",
  "困ったときは一人で抱え込まず、早めに相談すると吉。",
  "挨拶やちょっとした声かけが、良い関係づくりにつながりそう。",
  "後輩や同僚のサポートが、思わぬ形で返ってきそうな日。",
  "報連相を丁寧にすると、信頼関係が深まりそう。",
];

const ADVICE_CHANCE = [
  "普段と違う仕事にも、思い切って手を挙げてみると良さそう。",
  "小さな実績でも、まわりにアピールしておくと後で活きそう。",
  "誰かの手伝いを買って出ると、思わぬ評価につながるかも。",
  "気になっていた勉強や資格の情報収集を始めるのに良い日。",
  "苦手だと思っていた分野に、あえて挑戦してみると発見がありそう。",
  "人脈を広げる小さな一歩が、将来のチャンスにつながりそう。",
  "自分の強みを言葉にしておくと、機会をつかみやすくなりそう。",
];

export function generateWorkFortune(seed: number): WorkFortuneResult {
  const rng = mulberry32(seed);
  const rank = pickWeighted(RANKS, rng);
  const message = pick(WORK_MESSAGES[rank.key], rng);

  return {
    rank: rank.key,
    image: rank.image,
    from: rank.from,
    to: rank.to,
    message,
    adviceFocus: pick(ADVICE_FOCUS, rng),
    adviceRelationship: pick(ADVICE_RELATIONSHIP, rng),
    adviceChance: pick(ADVICE_CHANCE, rng),
  };
}

// 健康運専用ガチャ

export interface HealthFortuneResult {
  rank: RankKey;
  image: string;
  from: string;
  to: string;
  message: string;
  adviceBody: string;
  adviceLifestyle: string;
  adviceRefresh: string;
}

const HEALTH_MESSAGES: Record<RankKey, string[]> = {
  大吉: [
    "健康運は絶好調。心身ともに軽やかで、新しいことにも挑戦しやすい一日です。",
    "体調がすこぶる良さそうな日。この調子を保つ習慣を意識してみて。",
    "エネルギーに満ちた一日。体を動かすと、より調子が上がりそう。",
    "心も体も絶好調。新しい習慣を始めるのにも良いタイミング。",
  ],
  中吉: [
    "健康運は良好。いつもより体が軽く感じられそうな一日です。",
    "軽い運動やストレッチが、気分をすっきりさせてくれそう。",
    "体調の良さを感じやすい日。無理のない範囲で楽しんで。",
    "気持ちも前向きになりやすく、行動力が高まりそうな日。",
  ],
  小吉: [
    "穏やかな健康運。無理をしなければ、快適に過ごせる一日です。",
    "いつも通りの生活リズムを守ると、調子を保ちやすい日。",
    "特別なことをしなくても、心地よく過ごせそうな一日。",
    "ゆったりとしたペースが、体にも心にも良さそうな日。",
  ],
  吉: [
    "健康運は安定モード。特に問題なく過ごせそうな一日です。",
    "体調は普段通り。無理のない範囲で過ごすのがちょうど良さそう。",
    "いつものリズムを大事にすると、安定して過ごせそう。",
    "大きな変化はなくても、穏やかに過ごせる一日。",
  ],
  末吉: [
    "朝は少し重だるくても、夕方以降に調子が上がってきそうな日。",
    "今日は無理せず、体の声を聞きながら過ごして。",
    "調子の波がある日。無理せずペース配分を意識して。",
    "焦らず休みながら過ごすと、後半楽になりそう。",
  ],
  凶: [
    "疲れがたまりやすい日。今日は早めの休息を心がけて。",
    "無理な予定は詰め込みすぎず、体を労わる一日にして。",
    "体調の変化に気づきやすい日。無理せず様子を見て。",
    "今日は頑張りすぎず、体を休ませることを優先して。",
  ],
  大凶: [
    "体調を崩しやすい日。今日は予定を詰め込まず、静かに過ごして。",
    "無理は禁物。今日は「休む」ことを最優先にして。",
    "今日は無理な外出や予定を控え、体を休めるのが一番。",
    "心身ともに休息を必要としている日。ゆっくり過ごして。",
  ],
};

const ADVICE_BODY = [
  "軽いストレッチで体をほぐすと、動きやすくなりそう。",
  "こまめな水分補給を意識すると、調子が整いやすい日。",
  "姿勢を意識するだけでも、体の軽さが変わってきそう。",
  "少し早めに休むと、翌日のコンディションが良くなりそう。",
  "肩や首をゆっくり回すと、こわばりがほぐれそう。",
  "階段を使うなど、小さな運動を取り入れてみて。",
  "体を冷やさないよう、羽織るものを一枚持っておくと安心。",
];

const ADVICE_LIFESTYLE = [
  "野菜を多めに取り入れると、体が喜びそうな一日。",
  "寝る前のスマホを少し控えると、眠りの質が上がりそう。",
  "温かい飲み物でひと息つくと、体の巡りが良くなりそう。",
  "食事の時間を規則正しくすると、調子が整いやすい日。",
  "よく噛んで食べることを意識すると、体が軽く感じられそう。",
  "間食を控えめにすると、体調が整いやすい日。",
  "朝の光を浴びると、生活リズムが整いやすくなりそう。",
];

const ADVICE_REFRESH = [
  "外の空気を吸いに、少し散歩してみると気分転換になりそう。",
  "好きな音楽を聴く時間を作ると、心が軽くなりそう。",
  "深呼吸を意識すると、頭がすっきりしやすい一日。",
  "湯船にゆっくり浸かると、疲れがほぐれやすそう。",
  "好きな香りでリラックスすると、気持ちが落ち着きそう。",
  "何もしない時間をあえて作ると、心が整いそう。",
  "気の合う人との会話が、良い気分転換になりそう。",
];

export function generateHealthFortune(seed: number): HealthFortuneResult {
  const rng = mulberry32(seed);
  const rank = pickWeighted(RANKS, rng);
  const message = pick(HEALTH_MESSAGES[rank.key], rng);

  return {
    rank: rank.key,
    image: rank.image,
    from: rank.from,
    to: rank.to,
    message,
    adviceBody: pick(ADVICE_BODY, rng),
    adviceLifestyle: pick(ADVICE_LIFESTYLE, rng),
    adviceRefresh: pick(ADVICE_REFRESH, rng),
  };
}
