import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-card-border/60">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-wide">
          <span aria-hidden>🔮</span>
          <span>今日の運勢ガチャ</span>
        </Link>
        <nav className="flex flex-wrap justify-end gap-x-4 gap-y-1 text-sm text-foreground-muted">
          <Link href="/love" className="hover:text-accent">
            恋愛運占い
          </Link>
          <Link href="/money" className="hover:text-accent">
            金運占い
          </Link>
          <Link href="/work" className="hover:text-accent">
            仕事運占い
          </Link>
          <Link href="/health" className="hover:text-accent">
            健康運占い
          </Link>
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
