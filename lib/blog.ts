import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

// Get the blog directory for a specific locale
function getBlogDir(locale: string = "en"): string {
  const localePath = path.join(CONTENT_DIR, locale);
  // Fall back to root blog dir if locale folder doesn't exist (backwards compatibility)
  if (fs.existsSync(localePath)) {
    return localePath;
  }
  return CONTENT_DIR;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

// Get all blog post slugs
export function getAllBlogSlugs(locale: string = "en"): string[] {
  const blogDir = getBlogDir(locale);
  if (!fs.existsSync(blogDir)) {
    return [];
  }
  
  const files = fs.readdirSync(blogDir);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(".mdx", ""));
}

// Get a single blog post by slug
export function getBlogPost(slug: string, locale: string = "en"): BlogPost | null {
  const blogDir = getBlogDir(locale);
  const filePath = path.join(blogDir, `${slug}.mdx`);
  
  // If locale-specific file doesn't exist, try fallback to English
  if (!fs.existsSync(filePath)) {
    if (locale !== "en") {
      const fallbackPath = path.join(getBlogDir("en"), `${slug}.mdx`);
      if (fs.existsSync(fallbackPath)) {
        const fileContent = fs.readFileSync(fallbackPath, "utf-8");
        const { data, content } = matter(fileContent);
        return createBlogPost(slug, data, content);
      }
    }
    return null;
  }
  
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  
  return createBlogPost(slug, data, content);
}

// Helper to create blog post object
function createBlogPost(slug: string, data: Record<string, unknown>, content: string): BlogPost {
  return {
    slug,
    title: data.title as string,
    excerpt: data.excerpt as string,
    content,
    image: data.image as string,
    category: data.category as string,
    date: data.date as string,
    readTime: data.readTime as string,
    featured: (data.featured as boolean) || false,
    author: {
      name: (data.author as { name?: string })?.name || "Aura Lumina Team",
      avatar: (data.author as { avatar?: string })?.avatar || "/images/author-1.svg",
      bio: (data.author as { bio?: string })?.bio || "",
    },
  };
}

// Get all blog posts with metadata (for listing pages)
export function getAllBlogPosts(locale: string = "en"): BlogPostMeta[] {
  const slugs = getAllBlogSlugs(locale);
  
  const posts: BlogPostMeta[] = slugs
    .map((slug) => {
      const post = getBlogPost(slug, locale);
      if (!post) return null;
      
      return {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        image: post.image,
        category: post.category,
        date: post.date,
        readTime: post.readTime,
        featured: post.featured,
      } as BlogPostMeta;
    })
    .filter((post): post is BlogPostMeta => post !== null);
  
  // Sort by date (newest first)
  return posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

// Get featured post
export function getFeaturedPost(locale: string = "en"): BlogPostMeta | null {
  const posts = getAllBlogPosts(locale);
  return posts.find((post) => post.featured) || null;
}

// Get related posts (excluding current post)
export function getRelatedPosts(currentSlug: string, limit: number = 3, locale: string = "en"): BlogPostMeta[] {
  const posts = getAllBlogPosts(locale);
  return posts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, limit);
}

// Get unique categories
export function getAllCategories(locale: string = "en"): string[] {
  const posts = getAllBlogPosts(locale);
  const categories = new Set(posts.map((post) => post.category));
  return ["All", ...Array.from(categories)];
}

