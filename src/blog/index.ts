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
