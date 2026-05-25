import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Bai",
};

const posts = [
  { title: "Hello NextJS", date: "2023-09-09", tags: ["NextJS"], slug: "hello-nextjs", desc: "" },
];

function PostCard({ post }: { post: typeof posts[number] }) {
  return (
    <article className="group relative rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary-300/50 hover:shadow-lg hover:shadow-primary-300/10 dark:border-gray-700 dark:bg-dark/50 dark:hover:border-primary-300/30 dark:hover:shadow-primary-300/5">
      <a href={`/blog/${post.slug}`} className="block">
        <h2 className="text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-primary-300 dark:text-gray-100">
          {post.title}
        </h2>
        <div className="mt-2 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <time>{post.date}</time>
          <span className="flex gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                {tag}
              </span>
            ))}
          </span>
        </div>
      </a>
    </article>
  );
}

export default function BlogPage() {
  return (
    <>
      <Nav />
      <div id="skip-nav">
        <main>
          <section className="layout py-20">
            <h1>
              <span className="bg-gradient-to-tr from-primary-300/40 via-primary-300/40 to-primary-400/40 dark:from-primary-300 dark:to-primary-400 dark:bg-clip-text dark:text-transparent">
                Blog
              </span>
            </h1>
            <p className="mt-2 text-gray-700 dark:text-gray-200">
              Thoughts, mental models, and tutorials about front-end development.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={i * 80}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
