import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-card-border/60">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-wide">
          <span aria-hidden>🔮</span>
          <span>今日の運勢ガチャ</span>
        </Link>
        <nav className="flex gap-4 text-sm text-foreground-muted">
          <Link href="/about" className="hover:text-accent">
            このサイトについて
          </Link>
          <Link href="/contact" className="hover:text-accent">
            お問い合わせ
          </Link>
        </nav>
      </div>
    </header>
  );
}
