import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const siteUrl = "https://kyounoun.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "今日の運勢占い｜無料の運勢ガチャ｜今日のあなたを占いババァが診断します",
    template: "%s｜今日の運勢ガチャ",
  },
  description:
    "今日の運勢を無料のガチャ形式で診断!総合運・恋愛運・仕事運・金運・健康運に加え、ラッキーカラーやラッキーアイテムもわかる毎日更新の運勢占いサイトです。",
  openGraph: {
    title: "今日の運勢占い｜無料の運勢ガチャ｜今日のあなたを占いババァが診断します",
    description:
      "ボタンを押すだけで今日の運勢がわかる無料の占いサイト。恋愛運・仕事運・金運・健康運もまとめてチェック。",
    url: siteUrl,
    siteName: "今日の運勢ガチャ",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/images/icons/grandma-group.jpeg",
        width: 1408,
        height: 768,
        alt: "占いババァ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "今日の運勢占い｜無料の運勢ガチャ｜今日のあなたを占いババァが診断します",
    description:
      "ボタンを押すだけで今日の運勢がわかる無料の占いサイト。恋愛運・仕事運・金運・健康運もまとめてチェック。",
    images: ["/images/icons/grandma-group.jpeg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
      <head>
        {/* AdSenseのクローラーがコードを検出できるよう、next/scriptではなく素の<script>タグで埋め込む */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3246099949879278"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
