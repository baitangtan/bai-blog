import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apps - Bai",
};

const apps: { title: string; desc: string; url: string }[] = [
  { title: "六爻", desc: "六爻占卜，起卦解卦", url: "/liuyao/" },
  { title: "大六壬", desc: "大六壬占卜，时空推算", url: "/liuren/" },
  { title: "奇门遁甲", desc: "奇门遁甲，排盘预测", url: "/qimen/" },
  { title: "太乙神数", desc: "太乙神数，命理推算", url: "/taiyi/" },
];

export default function AppsPage() {
  return (
    <>
      <Nav />
      <div id="skip-nav">
        <main>
          <section className="layout py-20">
            <h1>
              <span className="bg-gradient-to-tr from-primary-300/40 via-primary-300/40 to-primary-400/40 dark:from-primary-300 dark:to-primary-400 dark:bg-clip-text dark:text-transparent">
                Apps
              </span>
            </h1>
            <p className="mt-2 text-gray-700 dark:text-gray-200">My Apps.</p>
            <div className="mt-8">
              {apps.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center dark:border-gray-600">
                  <p className="text-gray-500 dark:text-gray-400">Coming soon...</p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {apps.map((app, i) => (
                    <Reveal key={app.title} delay={i * 60}>
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary-300/50 hover:shadow-lg hover:shadow-primary-300/10 dark:border-gray-700 dark:bg-dark/50 dark:hover:border-primary-300/30 dark:hover:shadow-primary-300/5"
                      >
                        <h2 className="text-base font-semibold text-gray-900 transition-colors group-hover:text-primary-300 dark:text-gray-100">
                          {app.title}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{app.desc}</p>
                      </a>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
