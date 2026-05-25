export interface BlogPost {
  title: string;
  date: string;
  tags: string[];
  content: string; // markdown
}

const posts: Record<string, BlogPost> = {
  "hello-nextjs": {
    title: "Hello NextJS",
    date: "2023-09-09",
    tags: ["NextJS"],
    content: `
## 前言

终于开始尝试 Next.js 了。作为一个 React 开发者，Next.js 的全栈框架理念一直很吸引我。

## 为什么选择 Next.js

1. **文件路由** — 基于文件系统的路由，直观且高效
2. **SSR / SSG** — 服务端渲染和静态生成，SEO 友好
3. **API Routes** — 前后端一体，无需单独搭建后端
4. **React 生态** — 无缝融入 React 生态圈

## 第一个页面

创建一个简单的页面非常简单：

\`\`\`tsx
// app/page.tsx
export default function Home() {
  return <h1>Hello NextJS!</h1>
}
\`\`\`

就这样，一个页面就完成了。

## 总结

Next.js 的学习曲线相对平缓，对于有 React 基础的开发者来说，上手很快。接下来会深入了解更多特性。
`,
  },
  "build-blog-from-scratch": {
    title: "从零搭建个人博客 — Next.js + Tailwind v4 + Vercel 全流程",
    date: "2026-05-25",
    tags: ["Next.js", "Tailwind CSS", "Vercel", "Tutorial"],
    content: `
## 前言

本文记录 Bai Blog 的完整搭建过程。从技术选型到部署上线，每一步都有详细代码解释，你可以完全按照本文手动复刻一个同样的博客。

先看最终效果：**https://bai-blog.cc.cd**

---

## 一、技术栈概览

| 技术 | 用途 |
|---|---|
| **Next.js 16** | React 全栈框架，App Router |
| **Tailwind CSS v4** | 原子化 CSS，oklch 色彩空间 |
| **TypeScript** | 类型安全 |
| **Vercel** | 托管部署，自动 HTTPS |
| **GitHub** | 源码管理，触发自动部署 |

---

## 二、项目初始化

\`\`\`bash
npx create-next-app@latest bai-blog --typescript --tailwind --eslint
cd bai-blog
npm run dev
\`\`\`

这会生成以下关键文件：

\`\`\`
├── src/
│   ├── app/
│   │   ├── layout.tsx    # 根布局
│   │   ├── page.tsx      # 首页
│   │   └── globals.css   # 全局样式
│   └── components/       # 组件目录
├── tailwind.config.ts    # Tailwind 配置
├── next.config.ts        # Next.js 配置
└── tsconfig.json         # TypeScript 配置
\`\`\`

---

## 三、配置 Tailwind v4 主题色

Tailwind v4 使用 CSS 原生定义主题，而不是 JS 配置文件。

\`src/app/globals.css\`：

\`\`\`css
@import "tailwindcss";

@theme {
  --color-primary-200: oklch(0.76 0.18 265);
  --color-primary-300: oklch(0.72 0.24 265);
  --color-primary-400: oklch(0.64 0.28 265);
  --color-dark: oklch(0.12 0.02 265);
}
\`\`\`

**oklch 是什么？** 是一种人眼感知均匀的色彩空间。\`oklch(L C H)\`：
- **L** — 亮度 (0~1)
- **C** — 饱和度
- **H** — 色相角度 (0~360)

我们选了 **265° 紫色系** 作为主色调。\`@theme\` 定义后，Tailwind 自动生成 \`text-primary-300\`、\`bg-primary-400\` 等类。

---

## 四、深色模式

### 4.1 策略选择

Next.js 支持三种深色模式方案：
1. **\`media\`** — 跟随系统
2. **\`class\`** — 手动切换（我们选这个）
3. **\`script\`** — 注入脚本

选择 \`class\` 方案是因为我们要加手动切换按钮。

### 4.2 根布局

\`src/app/layout.tsx\`：

\`\`\`tsx
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
\`\`\`

### 4.3 ThemeProvider

\`src/components/theme-provider.tsx\`：

\`\`\`tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "light", toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  if (!mounted) return <>{children}</>;
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
\`\`\`

**关键逻辑：**
- \`useEffect\` 只在客户端执行，避免 SSR 不匹配
- \`localStorage\` 持久化主题选择
- \`document.documentElement.classList\` 切换 \`.dark\` 类
- 首次加载检查系统偏好 \`prefers-color-scheme\`
- \`mounted\` 状态防止 hydration 闪烁

---

## 五、极光背景 (Aurora Background)

这是博客最有特色的部分。深色和浅色模式各自有一套极光效果。

### 5.1 原理

使用多层 \`radial-gradient\` 叠加 + CSS 动画驱动颜色位移：

\`\`\`css
@keyframes aurora-drift {
  0%, 100% { background-position: 0% 50%, 50% 50%, 100% 50%; }
  33% { background-position: 50% 50%, 100% 50%, 0% 50%; }
  66% { background-position: 100% 50%, 0% 50%, 50% 50%; }
}

@keyframes aurora-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
\`\`\`

### 5.2 深色模式极光

\`\`\`css
.dark .aurora-overlay {
  background:
    radial-gradient(ellipse 80% 60% at 20% 80%, oklch(0.7 0.4 265 / 0.8), transparent),
    radial-gradient(ellipse 60% 50% at 80% 30%, oklch(0.6 0.35 285 / 0.7), transparent),
    radial-gradient(ellipse 70% 40% at 50% 60%, oklch(0.5 0.3 245 / 0.6), transparent);
  background-size: 200% 200%;
  animation: aurora-drift 25s ease-in-out infinite, aurora-pulse 8s ease-in-out infinite;
}
\`\`\`

**解释：**
- 三个不同位置、不同颜色的椭圆形渐变叠加
- \`background-size: 200% 200%\` 让渐变范围超出容器
- \`aurora-drift\` 让三个光斑位置循环移动
- \`aurora-pulse\` 让整体透明度呼吸变化

### 5.3 动态网格

在极光上层叠加网格纹理：

\`\`\`css
@utility bg-dot-grid {
  background-image: radial-gradient(circle, oklch(0.72 0.24 265 / 0.06) 1px, transparent 1px);
  background-size: 24px 24px;
}
\`\`\`

\`@utility\` 是 Tailwind v4 的语法，定义后可直接用 \`class="bg-dot-grid"\`。

### 5.4 Overlay 组件

\`src/components/dark-bg-overlay.tsx\`：

\`\`\`tsx
export function DarkBgOverlay() {
  return (
    <>
      {/* 深色模式 */}
      <div className="fixed inset-0 -z-10 hidden dark:block"
        style={{
          background: \`
            radial-gradient(ellipse 80% 60% at 20% 80%, oklch(0.7 0.4 265 / 0.8), transparent),
            radial-gradient(ellipse 60% 50% at 80% 30%, oklch(0.6 0.35 285 / 0.7), transparent),
            radial-gradient(ellipse 70% 40% at 50% 60%, oklch(0.5 0.3 245 / 0.6), transparent),
            linear-gradient(180deg, oklch(0.08 0.02 265), oklch(0.12 0.02 265))
          \`,
          backgroundSize: "200% 200%",
          animation: "aurora-drift 25s ease-in-out infinite, aurora-pulse 8s ease-in-out infinite",
        }}
      />
      {/* 浅色模式 */}
      <div className="fixed inset-0 -z-10 block dark:hidden"
        style={{
          background: \`
            radial-gradient(ellipse 80% 60% at 20% 80%, oklch(0.7 0.4 265 / 0.35), transparent),
            radial-gradient(ellipse 60% 50% at 80% 30%, oklch(0.6 0.35 285 / 0.3), transparent),
            radial-gradient(ellipse 70% 40% at 50% 60%, oklch(0.5 0.3 245 / 0.2), transparent)
          \`,
          backgroundSize: "200% 200%",
          animation: "aurora-drift 25s ease-in-out infinite",
        }}
      />
    </>
  );
}
\`\`\`

关键区别：深色模式透明度高 (0.8/0.7/0.6)，浅色模式透明度低 (0.35/0.3/0.2) 且无脉冲动画。

---

## 六、导航栏 (Nav)

### 6.1 组件实现

\`src/components/nav.tsx\`：

\`\`\`tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./theme-provider";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/app", label: "APPs" },
  { href: "/guestbook", label: "Guestbook" },
];

export function Nav() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-center border-b border-gray-200/60 dark:border-gray-600/40">
      <div className="flex w-full max-w-4xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold">Bai</Link>

        {/* 导航链接 */}
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href
                ? "text-primary-300"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              }
            >
              {link.label}
            </Link>
          ))}

          {/* 主题切换按钮 */}
          <button onClick={toggle} className="flex items-center justify-center p-1">
            {theme === "light" ? (
              <svg>...月亮图标...</svg>
            ) : (
              <svg>...太阳图标...</svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
\`\`\`

**设计要点：**
- \`fixed top-0\` 固定顶部，z-50 确保最高层级
- \`usePathname()\` 高亮当前页面对应的链接
- 透明背景（glass style），仅底部边框分隔
- 主题切换按钮使用 SVG 图标，不依赖任何图标库

---

## 七、Hero 页面

\`src/components/hero.tsx\`：

\`\`\`tsx
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6">
      {/* 头像 */}
      <Image
        src="/images/avatar.jpg"
        alt="Bai"
        width={96}
        height={96}
        className="rounded-full"
      />
      {/* 名称 + 标语 */}
      <h1 className="text-4xl font-bold">I&apos;m Bai</h1>
      <p className="text-gray-600 dark:text-gray-400">
        An ordinary person driven by interest
      </p>
      {/* CTA 按钮 */}
      <div className="flex gap-4">
        <Link href="/blog" className="rounded-lg bg-primary-300 px-6 py-2 text-white hover:bg-primary-400">
          My Blog
        </Link>
        <Link href="/app" className="rounded-lg border border-gray-300 px-6 py-2 hover:border-primary-300">
          Apps
        </Link>
      </div>
    </section>
  );
}
\`\`\`

---

## 八、阅读进度条 (Reading Progress)

\`src/components/reading-progress.tsx\`：

\`\`\`tsx
"use client";
import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[100] h-[3px] w-full">
      <div
        className="h-full bg-gradient-to-r from-primary-200 to-primary-400 transition-all duration-150"
        style={{ width: \`\${progress}%\` }}
      />
    </div>
  );
}
\`\`\`

**原理：**
- \`scrollY / (scrollHeight - innerHeight)\` 计算滚动百分比
- 3px 高的渐变条固定在视口顶部
- \`z-[100]\` 确保在导航栏之上

---

## 九、涟漪按钮 (Ripple Button)

\`src/components/ripple-button.tsx\`：

\`\`\`tsx
"use client";
import { useRef } from "react";

export function RippleButton({ href, children, className }: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    const rect = btnRef.current!.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = \`
      position: absolute; border-radius: 50%;
      width: \${size}px; height: \${size}px;
      left: \${e.clientX - rect.left - size / 2}px;
      top: \${e.clientY - rect.top - size / 2}px;
      background: rgba(255,255,255,0.4);
      transform: scale(0); animation: ripple 0.6s ease-out;
    \`;
    btnRef.current?.appendChild(ripple);
    ripple.onanimationend = () => ripple.remove();
  };

  return (
    <a ref={btnRef} href={href} className={\`relative overflow-hidden \${className}\`} onClick={handleClick}>
      {children}
    </a>
  );
}
\`\`\`

配合 CSS：

\`\`\`css
@keyframes ripple {
  to { transform: scale(4); opacity: 0; }
}
\`\`\`

点击时在鼠标位置创建一个圆形元素，0.6s 内放大并淡出，模拟水波涟漪效果。

---

## 十、博客文章系统

### 10.1 数据层

\`src/blog/index.ts\`：

\`\`\`tsx
export interface BlogPost {
  title: string;
  date: string;
  tags: string[];
  content: string; // Markdown 文本
}

const posts: Record<string, BlogPost> = {
  "hello-nextjs": {
    title: "Hello NextJS",
    date: "2023-09-09",
    tags: ["NextJS"],
    content: \`...markdown...\`,
  },
};

export function getPost(slug: string): BlogPost | undefined {
  return posts[slug];
}

export function getAllPosts() {
  return Object.entries(posts).map(([slug, post]) => ({
    slug, title: post.title, date: post.date, tags: post.tags,
  }));
}
\`\`\`

文章数据硬编码在代码中，优点是零依赖、构建时静态生成、加载极快。

### 10.2 博客列表页

\`src/app/blog/page.tsx\` 遍历 \`getAllPosts()\` 渲染文章卡片列表。

### 10.3 动态路由

\`src/app/blog/[slug]/page.tsx\`：

\`\`\`tsx
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  // 渲染文章...
}
\`\`\`

Next.js App Router 的 \`[slug]\` 文件夹自动生成动态路由 \`/blog/:slug\`。

### 10.4 Markdown 渲染器

没有用 \`react-markdown\` 等第三方库，而是手写了一个轻量渲染器：

\`\`\`tsx
function renderMarkdown(md: string) {
  const lines = md.split("\\n");
  const nodes: { type: string; content: string; lang?: string }[] = [];
  // 解析代码块、标题、列表、段落...
  return nodes.map((node, i) => {
    switch (node.type) {
      case "h2": return <h2 key={i}>...</h2>;
      case "code": return <pre key={i}><code>{node.content}</code></pre>;
      case "p": return <p key={i} dangerouslySetInnerHTML={{ __html: /* inline code */ }} />;
      // ...
    }
  });
}
\`\`\`

支持：h2/h3、代码块（含语言标记）、行内代码（\` 包裹）、无序/有序列表。

---

## 十一、Footer

最简单的组件，全透明仅保留版权信息：

\`\`\`tsx
export function Footer() {
  return (
    <footer className="border-t border-gray-200/60 py-6 text-center text-sm text-gray-500 dark:border-gray-600/40">
      © Bai 2026
    </footer>
  );
}
\`\`\`

---

## 十二、Guestbook (留言板)

使用 GitTalk 或 Giscus 等评论系统（基于 GitHub Issues）。页面结构简单：

\`\`\`tsx
export default function GuestbookPage() {
  return (
    <section className="layout py-20">
      <h1>Guestbook</h1>
      <p>Leave a message!</p>
      {/* 评论组件 */}
    </section>
  );
}
\`\`\`

---

## 十三、页面路由总览

最终的路由结构：

| 路由 | 文件 | 类型 |
|---|---|---|
| \`/\` | \`src/app/page.tsx\` | 首页 |
| \`/blog\` | \`src/app/blog/page.tsx\` | 博客列表 |
| \`/blog/[slug]\` | \`src/app/blog/[slug]/page.tsx\` | 文章页 |
| \`/app\` | \`src/app/app/page.tsx\` | 工具页 |
| \`/guestbook\` | \`src/app/guestbook/page.tsx\` | 留言板 |

---

## 十四、部署到 Vercel

### 14.1 首次部署

\`\`\`bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel deploy --prod --yes
\`\`\`

首次运行会：
1. 自动检测框架为 Next.js
2. 创建 Vercel 项目
3. 构建并部署
4. 分配 \`*.vercel.app\` 域名

### 14.2 自定义域名

\`\`\`bash
vercel domains add bai-blog.cc.cd
\`\`\`

然后在 DNS 管理后台添加 A 记录：
- **类型**: A
- **主机**: @
- **值**: \`76.76.21.21\`

### 14.3 配置 vercel.json

\`\`\`json
{
  "framework": "nextjs"
}
\`\`\`

---

## 十五、GitHub 自动部署

### 15.1 创建 GitHub 仓库

建一个公开仓库（如 \`bai-blog\`），推送代码：

\`\`\`bash
git remote add origin https://github.com/你的用户名/bai-blog.git
git push -u origin master
\`\`\`

### 15.2 安装 Vercel GitHub App

1. 打开 https://github.com/apps/vercel/installations/new
2. 选择账号和仓库
3. 点击 Install

### 15.3 连接项目

\`\`\`bash
vercel git connect https://github.com/你的用户名/bai-blog
\`\`\`

之后每次 \`git push\`，Vercel 自动拉取、构建、上线。

### 15.4 日常工作流

\`\`\`bash
# 本地开发
npm run dev

# 修改代码后
git add .
git commit -m "做了什么修改"
git push origin master
# Vercel 自动部署 ✅
\`\`\`

同步流程：

> **本地修改** → \`git push\` → **GitHub** → webhook → **Vercel 构建** → **线上更新**

---

## 十六、性能优化

### 使用 Turbopack

Next.js 16 默认开启 Turbopack（开发环境），构建速度比 webpack 快 10 倍以上。

### 静态生成

所有博客页面在构建时预渲染：
- 博客列表页 → 静态 HTML
- 博客文章页 → 静态 HTML（通过 \`generateStaticParams\`）

### 字体优化

使用 next/font 自动优化字体加载，消除布局偏移 (CLS)。

---

## 总结

完整搭建流程：

1. \`create-next-app\` 初始化项目
2. 配置 Tailwind v4 主题色 + 深色模式
3. 实现极光背景动画
4. 编写导航栏、Hero、Footer 组件
5. 加入阅读进度条、涟漪按钮等交互效果
6. 搭建博客文章系统（数据 + 渲染 + 路由）
7. 部署到 Vercel
8. GitHub 仓库托管 + 自动部署

**源码：** https://github.com/baitangtan/bai-blog

整个博客的代码量很小（核心组件不到 2000 行），没有使用任何重型 UI 库或第三方依赖，加载速度快、维护成本低。你可以根据自己的需求随意修改样式或添加功能。
`,
  },
};

export function getPost(slug: string): BlogPost | undefined {
  return posts[slug];
}

export function getAllPosts(): { slug: string; title: string; date: string; tags: string[] }[] {
  return Object.entries(posts).map(([slug, post]) => ({
    slug,
    title: post.title,
    date: post.date,
    tags: post.tags,
  }));
}
