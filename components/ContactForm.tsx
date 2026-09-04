"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!accessKey) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      let success = response.ok;
      try {
        const result = await response.json();
        success = result.success ?? response.ok;
      } catch {
        // レスポンスがJSONとして読めない場合も、HTTPステータスが成功なら成功扱いにする
        // (ブラウザ拡張機能やプロキシがレスポンス本文を書き換えるケースへの対策)
      }

      if (success) {
        setStatus("success");
        event.currentTarget.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

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
    <form onSubmit={handleSubmit} className="space-y-4">
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
        disabled={status === "sending"}
        className="rounded-full bg-accent px-6 py-2 text-sm font-bold text-slate-900 transition hover:bg-accent-soft disabled:opacity-60"
      >
        {status === "sending" ? "送信中..." : "送信する"}
      </button>

      {status === "success" && (
        <p className="text-sm text-lime-300">
          送信しました。お問い合わせいただきありがとうございます。
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-rose-300">
          送信に失敗しました。時間をおいて再度お試しください。
        </p>
      )}
    </form>
  );
}
