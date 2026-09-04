# 画像の置き場所

現在、運勢ランクやガチャボタンは絵文字（🌟🔮💘 など）を仮の画像として使っています。
以下の命名規則でファイルを置くと、コードから差し替えやすくなります。

## ランクイラスト(7種、全ページ共通) → `public/images/ranks/`

| ランク | ファイル名 |
|---|---|
| 大吉 | `daikichi.png` |
| 中吉 | `chukichi.png` |
| 小吉 | `shokichi.png` |
| 吉 | `kichi.png` |
| 末吉 | `suekichi.png` |
| 凶 | `kyo.png` |
| 大凶 | `daikyo.png` |

## ガチャボタンのアイコン(5種) → `public/images/icons/`

| ページ | ファイル名 |
|---|---|
| ホーム(総合運) | `overall.png` |
| 恋愛運 | `love.png` |
| 金運 | `money.png` |
| 仕事運 | `work.png` |
| 健康運 | `health.png` |

## その他

- OGP画像(SNSシェア用、1200×630px推奨): `public/images/ogp.png`
- favicon: Next.jsの規約上 `app/` 直下に配置するため、`public/images/` に置いた後で移動する

## 差し替え方

`components/FortuneGacha.tsx` / `LoveFortuneGacha.tsx` / `MoneyFortuneGacha.tsx` /
`WorkFortuneGacha.tsx` / `HealthFortuneGacha.tsx` の絵文字部分を、
`next/image` の `<Image src="/images/..." ... />` に置き換える。
