import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-card-border/60">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-4 py-6 text-sm text-foreground-muted sm:flex-row sm:justify-between sm:px-6">
        <p>&copy; {new Date().getFullYear()} 今日の運勢ガチャ</p>
        <nav className="flex gap-4">
          <Link href="/faq" className="hover:text-accent">
            よくある質問
          </Link>
          <Link href="/about" className="hover:text-accent">
            運営者情報
          </Link>
          <Link href="/privacy" className="hover:text-accent">
            プライバシーポリシー
          </Link>
          <Link href="/contact" className="hover:text-accent">
            お問い合わせ
          </Link>
        </nav>
      </div>
    </footer>
  );
}
