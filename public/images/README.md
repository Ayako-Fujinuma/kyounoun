# 画像の置き場所

運勢ランク・ガチャボタン・ヘッダーロゴ・favicon・OGP画像は、すべて実画像に差し替え済みです。
新しい画像に入れ替える場合は、同じファイル名で上書きすればコード側の変更は不要です。

## ランクイラスト(7種、全ページ共通) → `public/images/ranks/`

| ランク | ファイル名 |
|---|---|
| 大吉 | `daikichi.jpeg` |
| 中吉 | `chukichi.jpeg` |
| 小吉 | `shokichi.jpeg` |
| 吉 | `kichi.jpeg` |
| 末吉 | `suekichi.jpeg` |
| 凶 | `kyo.jpeg` |
| 大凶 | `daikyo.jpeg` |

## ガチャボタンのアイコン(5種) → `public/images/icons/`

| ページ | ファイル名 |
|---|---|
| ホーム(総合運・ヘッダーロゴにも使用) | `overall.jpg` |
| 恋愛運 | `love.jpg` |
| 金運 | `money.jpeg` |
| 仕事運 | `work.jpeg` |
| 健康運 | `health.jpeg` |

## その他

- OGP画像(SNSシェア用): `public/images/ogp.jpeg`(`app/layout.tsx` の metadata から参照)
- favicon: `app/icon.jpeg`(Next.jsの規約上 `app/` 直下に配置。`public/images/` には置かない)

## 参照箇所

`lib/fortune.ts` の `RANKS` 配列がランク画像のパスを持ち、
`FortuneGacha.tsx` / `LoveFortuneGacha.tsx` / `MoneyFortuneGacha.tsx` /
`WorkFortuneGacha.tsx` / `HealthFortuneGacha.tsx` がそれぞれ表示する。
ボタンアイコンは各コンポーネント内に直接パスを書いている。
