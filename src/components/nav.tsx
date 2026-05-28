"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/app", label: "APPs" },
  { href: "/guestbook", label: "Guestbook" },
];

export function Nav() {
  const pathname = usePathname();
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) setDark(stored === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(dark ? "dark" : "light");
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY > 8;
      setScrolled(s);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next ? "dark" : "light");
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <header className="sticky top-0 z-50">
      <a
        href="#skip-nav"
        className="absolute left-4 top-4 -translate-y-16 rounded-sm bg-white p-2 font-medium text-black transition focus:translate-y-0 focus:outline-none focus:ring focus:ring-primary-300 dark:bg-dark dark:text-white"
      >
        <span className="bg-gradient-to-tr from-primary-300/40 via-primary-300/40 to-primary-400/40 transition-colors dark:from-primary-300 dark:to-primary-400 dark:bg-clip-text dark:text-transparent">
          Skip to main content
        </span>
      </a>
      <div className="h-2 bg-gradient-to-tr from-primary-200 via-primary-300 to-primary-400" />
      <div className={`transition-all duration-300 ${scrolled ? "shadow-sm" : ""}`}>
        <nav className="layout flex items-center justify-between py-4">
          <ul className="flex items-center space-x-3 text-xs md:space-x-4 md:text-base">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group rounded-sm py-2 font-medium text-black transition-colors focus:outline-none focus-visible:ring focus-visible:ring-primary-300 dark:text-white dark:hover:text-primary-300"
                >
                  <span
                    className={`transition-colors ${
                      pathname === link.href
                        ? "bg-gradient-to-tr from-primary-300/40 via-primary-300/40 to-primary-400/40 dark:from-primary-300 dark:to-primary-400 dark:bg-clip-text dark:text-transparent"
                        : "bg-primary-300/0 group-hover:bg-primary-300/20 dark:group-hover:bg-primary-300/0"
                    }`}
                  >
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={toggleTheme}
            className="rounded-md border border-gray-300 bg-gray-50 p-2 text-lg text-gray-600 transition-all duration-300 hover:scale-105 hover:border-primary-300 hover:text-primary-300 focus-visible:border-primary-300 focus-visible:text-primary-300 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-primary-300 dark:hover:text-primary-300 md:p-2.5 md:text-xl"
            aria-label="Toggle theme"
          >
            <span className="flex items-center justify-center transition-transform duration-500" key={String(dark)}>
              {dark ? (
                <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
                  <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                </svg>
              )}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
