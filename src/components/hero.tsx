import { RippleButton } from "@/components/ripple-button";

export function Hero() {
  return (
    <section className="bg-dot-grid min-h-main -mt-20 mb-20 flex flex-col justify-center">
      <div className="layout flex flex-col items-center gap-10 md:flex-row md:items-center">
        <div className="flex-1">
          <h2 className="animate-fade-in-up text-2xl font-bold md:text-4xl 2xl:text-5xl" style={{ animationDelay: "0ms" }}>
            Hi!👋
          </h2>
          <h1
            className="animate-fade-in-up mt-1 text-3xl font-bold md:text-5xl 2xl:text-6xl"
            style={{ animationDelay: "120ms" }}
          >
            I&apos;m{" "}
            <span className="inline-block bg-gradient-to-tr from-primary-300/40 via-primary-300/40 to-primary-400/40 transition-colors animate-float dark:from-primary-300 dark:to-primary-400 dark:bg-clip-text dark:text-transparent">
              Bai
            </span>
          </h1>
          <p
            className="animate-fade-in-up mt-4 max-w-4xl text-gray-700 dark:text-gray-200 md:mt-6 md:text-lg 2xl:text-xl"
            style={{ animationDelay: "240ms" }}
          >
            An ordinary person driven by interest😎
          </p>

          <div
            className="animate-fade-in-up mt-8 flex flex-wrap gap-4 md:text-lg"
            style={{ animationDelay: "360ms" }}
          >
            <div className="group relative">
              <div className="absolute -inset-0.5 animate-glow-pulse rounded-xl bg-gradient-to-r from-primary-300 to-primary-400 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200 dark:from-primary-200 dark:via-primary-300" />
              <RippleButton
                href="/blog"
                className="relative inline-flex scale-100 rounded-lg border border-gray-300 bg-white px-4 py-2 font-bold text-gray-800 shadow-sm transition duration-100 hover:scale-[1.03] active:scale-[0.97] motion-safe:transform-gpu motion-reduce:hover:scale-100 motion-reduce:hover:brightness-90 focus:outline-none focus-visible:ring focus-visible:ring-primary-300 dark:border-gray-600 dark:bg-dark dark:text-gray-100"
              >
                My Blog
              </RippleButton>
            </div>

            <div className="group relative">
              <div className="absolute -inset-0.5 animate-glow-pulse rounded-xl bg-gradient-to-r from-primary-300/60 to-primary-400/60 opacity-0 blur transition duration-500 group-hover:opacity-60 dark:from-primary-200/40 dark:via-primary-300/40" style={{ animationDelay: "500ms" }} />
              <RippleButton
                href="/app"
                className="relative inline-flex scale-100 rounded-lg border border-gray-300 bg-white px-4 py-2 font-bold text-gray-800 shadow-sm transition duration-100 hover:scale-[1.03] active:scale-[0.97] motion-safe:transform-gpu motion-reduce:hover:scale-100 motion-reduce:hover:brightness-90 focus:outline-none focus-visible:ring focus-visible:ring-primary-300 dark:border-gray-600 dark:bg-dark dark:text-gray-100"
              >
                Apps
              </RippleButton>
            </div>
          </div>

        </div>

        <div className="animate-fade-in-up shrink-0" style={{ animationDelay: "180ms" }}>
          <div className="group relative">
            <div className="absolute -inset-3 animate-glow-pulse rounded-full bg-gradient-to-r from-primary-300 to-primary-400 opacity-40 blur-xl transition duration-1000 group-hover:opacity-70" />
            <div className="relative h-40 w-40 overflow-hidden rounded-full border-[3px] border-white shadow-xl transition-transform duration-500 group-hover:scale-[1.03] dark:border-gray-600 md:h-56 md:w-56">
              <img
                src="/images/avatar.jpg"
                alt="Bai"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
