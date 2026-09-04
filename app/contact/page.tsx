import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "今日の運勢ガチャへのお問い合わせフォームです。",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold">お問い合わせ</h1>
      <p className="mt-3 text-sm text-foreground-muted">
        ご意見・ご要望・不具合の報告などは、以下のフォームよりお気軽にお送りください。
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
