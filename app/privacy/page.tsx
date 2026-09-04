import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "今日の運勢ガチャのプライバシーポリシーです。",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-sm leading-relaxed sm:px-6">
      <h1 className="text-2xl font-bold">プライバシーポリシー</h1>
      <p className="mt-4 text-foreground-muted">
        「今日の運勢ガチャ」（以下、「当サイト」といいます）は、利用者のプライバシーを尊重し、以下の方針に基づき個人情報を取り扱います。
      </p>

      <div className="mt-6 space-y-6 text-foreground-muted">
        <section>
          <h2 className="text-base font-bold text-foreground">1. 取得する情報</h2>
          <p className="mt-1">
            当サイトの占い結果は、お使いの端末のブラウザ（localStorage）にのみ保存され、運営者を含む第三者のサーバーには送信されません。お問い合わせフォームをご利用いただいた場合は、フォームに入力されたお名前・メールアドレス・お問い合わせ内容を取得します。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground">2. 広告配信について</h2>
          <p className="mt-1">
            当サイトでは、第三者配信の広告サービス（Google
            AdSenseなど）を利用する場合があります。これらの広告配信事業者は、利用者の興味に応じた広告を表示するためにCookieを使用することがあります。Cookieを無効にする方法や広告配信の詳細については、
            <a
              href="https://policies.google.com/technologies/ads?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Googleの広告ポリシー
            </a>
            をご確認ください。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground">
            3. アクセス解析について
          </h2>
          <p className="mt-1">
            当サイトでは、サイト改善のためにアクセス解析ツールを利用する場合があります。これらのツールはCookieを使用してデータを収集しますが、個人を特定する情報は含まれません。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground">
            4. 個人情報の管理
          </h2>
          <p className="mt-1">
            お問い合わせにて取得した個人情報は、お問い合わせへの対応以外の目的には使用せず、適切に管理いたします。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground">
            5. プライバシーポリシーの変更
          </h2>
          <p className="mt-1">
            当サイトは、必要に応じて本ポリシーの内容を変更することがあります。変更後の内容は本ページに掲載した時点から効力を生じるものとします。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground">6. お問い合わせ</h2>
          <p className="mt-1">
            本ポリシーに関するお問い合わせは
            <a href="/contact" className="text-accent hover:underline">
              お問い合わせフォーム
            </a>
            よりお願いいたします。
          </p>
        </section>
      </div>
    </div>
  );
}
