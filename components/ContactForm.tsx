const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export default function ContactForm() {
  if (!accessKey) {
    return (
      <p className="rounded-2xl border border-card-border bg-card-bg p-4 text-sm text-foreground-muted">
        フォームの準備中です。Web3Forms（
        <a
          href="https://web3forms.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          web3forms.com
        </a>
        ）でアクセスキーを取得し、環境変数{" "}
        <code className="rounded bg-black/20 px-1">
          NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
        </code>{" "}
        に設定してください。
      </p>
    );
  }

  return (
    <form
      action="https://api.web3forms.com/submit"
      method="POST"
      className="space-y-4"
    >
      <input type="hidden" name="access_key" value={accessKey} />
      <input
        type="hidden"
        name="redirect"
        value="https://kyounoun.com/contact/thanks"
      />

      <div>
        <label htmlFor="name" className="text-sm text-foreground-muted">
          お名前
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded-xl border border-card-border bg-card-bg px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm text-foreground-muted">
          メールアドレス
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-xl border border-card-border bg-card-bg px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm text-foreground-muted">
          お問い合わせ内容
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1 w-full rounded-xl border border-card-border bg-card-bg px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </div>

      <button
        type="submit"
        className="rounded-full bg-accent px-6 py-2 text-sm font-bold text-slate-900 transition hover:bg-accent-soft"
      >
        送信する
      </button>
    </form>
  );
}
