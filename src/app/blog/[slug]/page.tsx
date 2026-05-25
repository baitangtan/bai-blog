import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getPost } from "@/blog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.title} - Bai` };
}

function renderMarkdown(md: string) {
  const lines = md.split("\n");
  const nodes: { type: string; content: string; lang?: string }[] = [];
  let inCode = false;
  let codeLang = "";
  let codeBuf: string[] = [];

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCode) {
        nodes.push({ type: "code", content: codeBuf.join("\n"), lang: codeLang });
        codeBuf = [];
        inCode = false;
      } else {
        inCode = true;
        codeLang = line.slice(3).trim();
      }
      continue;
    }
    if (inCode) { codeBuf.push(line); continue; }
    if (line.startsWith("## ")) { nodes.push({ type: "h2", content: line.slice(3) }); continue; }
    if (line.startsWith("### ")) { nodes.push({ type: "h3", content: line.slice(4) }); continue; }
    if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") || line.startsWith("4. ")) {
      nodes.push({ type: "li", content: line.slice(3) }); continue;
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      nodes.push({ type: "li", content: line.slice(2) }); continue;
    }
    if (line.trim() === "") { nodes.push({ type: "empty", content: "" }); continue; }
    nodes.push({ type: "p", content: line });
  }
  if (inCode) nodes.push({ type: "code", content: codeBuf.join("\n"), lang: codeLang });

  return nodes.map((node, i) => {
    switch (node.type) {
      case "h2": return <h2 key={i} className="mt-10 mb-4 text-xl font-bold md:text-2xl">{node.content}</h2>;
      case "h3": return <h3 key={i} className="mt-8 mb-3 text-lg font-semibold md:text-xl">{node.content}</h3>;
      case "li": return <li key={i} className="ml-6 list-disc text-gray-700 dark:text-gray-200">{node.content}</li>;
      case "code": return (
        <pre key={i} className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm dark:bg-gray-800">
          <code>{node.content}</code>
        </pre>
      );
      case "empty": return <div key={i} className="h-4" />;
      default: {
        // inline code in paragraphs
        const html = (node.content as string).replace(/`([^`]+)`/g, "<code class='rounded bg-gray-100 px-1.5 py-0.5 text-sm dark:bg-gray-800'>$1</code>");
        return <p key={i} className="text-gray-700 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: html }} />;
      }
    }
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <div id="skip-nav">
        <main>
          <article className="layout py-20">
            <header className="mb-10">
              <h1 className="text-2xl font-bold md:text-4xl">{post.title}</h1>
              <div className="mt-3 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <time>{post.date}</time>
                <span className="flex gap-1.5">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                      {tag}
                    </span>
                  ))}
                </span>
              </div>
            </header>
            <div className="prose-custom max-w-3xl leading-relaxed">
              {renderMarkdown(post.content)}
            </div>
          </article>
        </main>
      </div>
      <Footer />
    </>
  );
}
