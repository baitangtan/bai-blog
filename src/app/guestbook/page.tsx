"use client";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase, type Message } from "@/lib/supabase";

export default function GuestbookPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    supabase
      .from("messages")
      .select("id, nickname, content, created_at")
      .eq("is_approved", true)
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data }) => {
        if (data) setMessages(data as Message[]);
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("messages")
        .insert({ nickname: nickname.trim() || "匿名", content: content.trim(), is_approved: false });
      if (error) throw error;
      setSubmitted(true);
      setContent("");
      // reload messages
      const { data } = await supabase
        .from("messages")
        .select("id, nickname, content, created_at")
        .order("created_at", { ascending: false })
        .limit(50);
      if (data) setMessages(data as Message[]);
    } catch {
      alert("留言失败，请重试");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Nav />
      <div id="skip-nav">
        <main>
          <section className="layout py-20">
            <h1>
              <span className="bg-gradient-to-tr from-primary-300/40 via-primary-300/40 to-primary-400/40 dark:from-primary-300 dark:to-primary-400 dark:bg-clip-text dark:text-transparent">
                Guestbook
              </span>
            </h1>
            <p className="mt-2 text-gray-700 dark:text-gray-200">
              留下想说的话——留言、赞赏、建议。
            </p>

            {submitted ? (
              <Reveal>
                <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-6 text-center text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300">
                  感谢你的留言！
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <form onSubmit={handleSubmit} className="mt-8 max-w-lg space-y-3">
                  <input
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="你的名字（可选，默认匿名）"
                    maxLength={30}
                    className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-300/20 dark:border-gray-700 dark:bg-dark dark:text-gray-100 dark:placeholder-gray-500"
                  />
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="写下你想说的..."
                    rows={4}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-300/20 dark:border-gray-700 dark:bg-dark dark:text-gray-100 dark:placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:scale-[1.02] hover:border-primary-300 hover:text-primary-300 focus:outline-none focus-visible:ring focus-visible:ring-primary-300 active:scale-[0.98] disabled:opacity-50 dark:border-gray-600 dark:bg-dark dark:text-gray-100 dark:hover:border-primary-300 dark:hover:text-primary-300"
                  >
                    {submitting ? "发送中..." : "发送"}
                  </button>
                </form>
              </Reveal>
            )}

            {/* Messages list */}
            <div className="mt-16 space-y-4">
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                留言 ({messages.length})
              </h2>
              {messages.length === 0 ? (
                <p className="text-sm text-gray-400">暂无留言，来做第一个吧。</p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-dark/50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary-400">
                        {msg.nickname}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(msg.created_at).toLocaleDateString("zh-CN")}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="mt-8 flex flex-col items-start gap-4 md:flex-row-reverse md:justify-between">
              <Link
                href="/"
                className="animated-underline inline-flex items-center border-b border-dotted border-dark font-medium hover:border-black/0 focus:outline-none focus-visible:ring focus-visible:ring-primary-300 dark:border-gray-400"
              >
                <span className="dark:bg-gradient-to-tr dark:from-primary-300 dark:to-primary-400 dark:bg-clip-text dark:text-transparent">
                  ← Back to Home
                </span>
              </Link>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
