"use client";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { useState } from "react";

export default function GuestbookPage() {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
    setMessage("");
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
                  感谢你的留言！ 🎉
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <form onSubmit={handleSubmit} className="mt-8 max-w-lg">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="写下你想说的..."
                  rows={4}
                  className="w-full rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-300/20 dark:border-gray-700 dark:bg-dark dark:text-gray-100 dark:placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="mt-3 inline-flex rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:scale-[1.02] hover:border-primary-300 hover:text-primary-300 focus:outline-none focus-visible:ring focus-visible:ring-primary-300 active:scale-[0.98] dark:border-gray-600 dark:bg-dark dark:text-gray-100 dark:hover:border-primary-300 dark:hover:text-primary-300"
                >
                  发送
                </button>
                </form>
                </Reveal>
              )}

            <div className="mt-8 flex flex-col items-start gap-4 md:flex-row-reverse md:justify-between">
              <a
                href="/"
                className="animated-underline inline-flex items-center border-b border-dotted border-dark font-medium hover:border-black/0 focus:outline-none focus-visible:ring focus-visible:ring-primary-300 dark:border-gray-400"
              >
                <span className="dark:bg-gradient-to-tr dark:from-primary-300 dark:to-primary-400 dark:bg-clip-text dark:text-transparent">
                  ← Back to Home
                </span>
              </a>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
