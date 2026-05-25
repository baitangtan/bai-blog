import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReadingProgress } from "@/components/reading-progress";
import { DarkBgOverlay } from "@/components/dark-bg-overlay";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bai - Personal Blog",
  description: "Bai的个人博客",
  keywords: ["Bai", "Bai Blog", "个人博客"],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📝</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var d = document.documentElement;
                var c = d.classList;
                c.remove("light", "dark");
                var e = localStorage.getItem("theme");
                if (e) { c.add(e); } else { c.add("dark"); }
                if (e === "light" || e === "dark" || !e) d.style.colorScheme = e || "dark";
              } catch (t) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white transition-colors dark:bg-dark dark:text-white">
        <ReadingProgress />
        <DarkBgOverlay />
        {children}
      </body>
    </html>
  );
}
