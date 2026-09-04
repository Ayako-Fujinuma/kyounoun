import Link from "next/link";

export default function BackHomeLink() {
  return (
    <div className="mb-6 text-center">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 rounded-full border border-accent/50 bg-card-bg px-4 py-1.5 text-sm text-accent transition hover:bg-accent hover:text-slate-900"
      >
        <span aria-hidden>🔮</span>
        総合運ガチャに戻る
      </Link>
    </div>
  );
}
