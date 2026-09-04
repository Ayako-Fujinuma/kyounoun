import Image from "next/image";
import Link from "next/link";

const CATEGORY_LINKS = [
  { href: "/", label: "総合運占い", icon: "🔮" },
  { href: "/love", label: "恋愛運占い", icon: "💘" },
  { href: "/money", label: "金運占い", icon: "💰" },
  { href: "/work", label: "仕事運占い", icon: "💼" },
  { href: "/health", label: "健康運占い", icon: "🌿" },
];

export default function Header() {
  return (
    <header className="border-b border-card-border/60">
      <div className="mx-auto max-w-3xl px-4 pt-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-wide">
            <Image
              src="/images/icons/overall.jpg"
              alt=""
              width={28}
              height={28}
              className="rounded-full"
            />
            <span>今日の運勢ガチャ</span>
          </Link>
          <div className="hidden gap-3 text-xs text-foreground-muted sm:flex">
            <Link href="/about" className="hover:text-accent">
              このサイトについて
            </Link>
            <Link href="/contact" className="hover:text-accent">
              お問い合わせ
            </Link>
          </div>
        </div>

        <nav className="mt-3 flex gap-2 overflow-x-auto pb-3 sm:justify-center [&::-webkit-scrollbar]:hidden">
          {CATEGORY_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-card-border bg-card-bg px-3 py-1.5 text-sm text-foreground-muted transition hover:border-accent/60 hover:text-accent"
            >
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
