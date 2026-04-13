import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User } from "lucide-react";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-24 px-8 bg-background">
      <article className="max-w-3xl mx-auto">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-on-surface-variant/60 hover:text-primary transition-colors duration-300 font-label text-xs uppercase tracking-widest mb-12 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Artifacts
        </Link>

        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-on-surface-variant/40 font-label text-[10px] uppercase tracking-widest">
              <Calendar size={12} />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant/40 font-label text-[10px] uppercase tracking-widest border-l border-outline-variant pl-6">
              <User size={12} />
              {post.author}
            </div>
            <div className="flex items-center gap-2 text-primary font-label text-[10px] uppercase tracking-widest border-l border-outline-variant pl-6">
              <Calendar size={12} />
              {post.readingTime}
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tighter text-on-background mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-4 py-1.5 bg-surface-container-high border border-outline-variant rounded-full text-[10px] font-label text-primary uppercase tracking-tighter"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[32px] overflow-hidden mb-16 border border-white/5">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* MDX Content */}
        <div className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-headline prose-headings:tracking-tighter prose-headings:font-black prose-headings:text-on-background prose-strong:text-on-background prose-blockquote:text-on-surface-variant prose-blockquote:border-primary prose-li:text-on-surface-variant prose-p:text-on-surface-variant prose-p:leading-relaxed prose-a:text-primary prose-code:text-primary prose-code:bg-surface-container-high prose-code:px-1 prose-code:rounded">
          <MDXRemote source={post.content} />
        </div>

        <footer className="mt-20 pt-12 border-t border-outline-variant">
          <div className="p-8 rounded-3xl bg-surface-container border border-outline-variant flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl overflow-hidden grayscale border border-outline-variant">
              <img src="/me-pro.png" alt="Praful Thapa" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-on-background font-headline font-bold text-lg">Written by {post.author}</h3>
              <p className="text-on-surface-variant text-sm">Product Engineer & Design Strategist. Building the future of fluid interfaces.</p>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}
