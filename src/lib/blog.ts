import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
  content: string;
  readingTime: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  const posts = files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(BLOG_DIR, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      
      // Calculate reading time
      const words = content.split(/\s+/).length;
      const readingTime = Math.ceil(words / 200);

      return {
        ...data,
        slug: file.replace(/\.(mdx|md)$/, ""),
        content,
        readingTime: `${readingTime} min read`,
      } as BlogPost;
    });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const mdFilePath = path.join(BLOG_DIR, `${slug}.md`);
  
  let finalPath = "";
  if (fs.existsSync(filePath)) {
    finalPath = filePath;
  } else if (fs.existsSync(mdFilePath)) {
    finalPath = mdFilePath;
  } else {
    return null;
  }

  const fileContent = fs.readFileSync(finalPath, "utf-8");
  const { data, content } = matter(fileContent);

  // Calculate reading time
  const words = content.split(/\s+/).length;
  const readingTime = Math.ceil(words / 200);

  return {
    ...data,
    slug,
    content,
    readingTime: `${readingTime} min read`,
  } as BlogPost;
}
