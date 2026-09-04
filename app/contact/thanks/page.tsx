import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "送信完了",
  description: "お問い合わせありがとうございました。",
};

export default function ContactThanksPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
      <h1 className="text-2xl font-bold">送信しました</h1>
      <p className="mt-4 text-sm text-foreground-muted">
        お問い合わせいただきありがとうございます。内容を確認のうえ、必要に応じてご連絡いたします。
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full border border-accent/60 px-6 py-2 text-sm text-accent transition hover:bg-accent hover:text-slate-900"
      >
        トップページに戻る
      </Link>
    </div>
  );
}
