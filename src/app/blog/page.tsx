import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen pt-32 pb-24 px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <header className="mb-20">
          <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter text-on-background mb-6">
            Insights & <span className="text-gradient">Artifacts</span>
          </h1>
          <p className="text-on-surface-variant text-xl max-w-2xl leading-relaxed">
            A collection of thoughts on product building, leadership, life,
            travel, finance, and everything in between.
          </p>
        </header>

        <div className="grid gap-12">
          {posts.map((post) => (
            <article key={post.slug} className="group relative">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  {/* Featured Image */}
                  <div className="relative w-full lg:w-48 h-48 lg:h-32 rounded-2xl overflow-hidden bg-surface-container border border-outline-variant shrink-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 flex flex-col md:flex-row gap-8">
                    {/* Date/Meta */}
                    <div className="md:w-32 pt-2 shrink-0">
                      <div className="flex items-center gap-2 text-on-surface-variant/40 font-label text-[10px] uppercase tracking-widest">
                        <Calendar size={12} />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-label uppercase tracking-widest text-primary font-bold">{post.readingTime}</span>
                        <div className="h-1 w-1 rounded-full bg-outline-variant" />
                        <span className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant/60">{post.tags[0]}</span>
                      </div>
                      <h2 className="text-3xl font-headline font-bold text-on-background group-hover:text-primary transition-colors duration-300 mb-4 leading-tight">
                        {post.title}
                      </h2>
                      <p className="text-on-surface-variant leading-relaxed mb-6 font-body text-lg">
                        {post.description}
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                          {post.tags.slice(1).map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-surface-container-high border border-outline-variant rounded-full text-[10px] font-label text-on-surface-variant/60 uppercase tracking-tighter"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="ml-auto flex items-center gap-2 text-primary font-label text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                          Read More <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Underline Effect */}
                <div className="absolute -bottom-6 left-0 right-0 h-px bg-outline-variant group-hover:bg-primary/20 transition-colors duration-300" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
