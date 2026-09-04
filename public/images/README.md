# 画像の置き場所

現在、運勢ランクの絵文字（🌟✨🍀 など）を仮の画像として使っています。
フリー画像を用意したら、このフォルダ以下に配置してご利用ください（例: `public/images/hero.jpg` など）。
差し替える際は `components/FortuneGacha.tsx` や `app/page.tsx` の絵文字部分を
`next/image` の `<Image src="/images/xxx.jpg" ... />` に置き換えてください。
