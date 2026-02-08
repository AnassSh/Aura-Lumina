import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogPost, getAllBlogSlugs, getRelatedPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

// Generate static params for known slugs (per locale)
export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

// Generate metadata for each post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const post = getBlogPost(slug, locale);
  const t = await getTranslations("blog");

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3, locale);

  return (
    <article className="pt-24 pb-20">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="container-custom pt-4">
        <ol className="flex items-center gap-2 text-sm text-softBlack-400">
          <li>
            <Link href="/" className="hover:text-gold-600 transition-colors">
              {t("home")}
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link href="/blog" className="hover:text-gold-600 transition-colors">
              {t("title")}
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li className="text-softBlack-900 font-medium truncate max-w-[200px]">
            {post.title}
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <header className="relative py-16 bg-gradient-to-b from-beige-100 to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="px-4 py-1 bg-gold-100 text-gold-700 text-sm font-semibold rounded-full">
                {post.category}
              </span>
              <span className="text-softBlack-400">{post.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-softBlack-900 mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-softBlack-500 mb-8">{post.excerpt}</p>

            {/* Author Info */}
            <div className="flex items-center justify-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-beige-200">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-semibold text-softBlack-900">
                  {post.author.name}
                </p>
                <time className="text-sm text-softBlack-400">{post.date}</time>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="container-custom py-8">
        <div className="relative aspect-[21/9] max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          <div
            className="prose prose-lg prose-gold max-w-none
              prose-headings:font-serif prose-headings:text-softBlack-900
              prose-p:text-softBlack-600 prose-p:leading-relaxed
              prose-a:text-gold-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-softBlack-800
              prose-ul:text-softBlack-600
              prose-li:marker:text-gold-500
              [&_.lead]:text-xl [&_.lead]:text-softBlack-500 [&_.lead]:leading-relaxed [&_.lead]:mb-8"
          >
            <MDXRemote source={post.content} />
          </div>

          {/* Share Section */}
          <div className="border-t border-b border-beige-200 py-8 my-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-softBlack-600 font-medium">
                {t("shareArticle")}
              </p>
              <div className="flex items-center gap-4">
                <button className="w-10 h-10 bg-softBlack-900 text-white rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </button>
                <button className="w-10 h-10 bg-softBlack-900 text-white rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </button>
                <button className="w-10 h-10 bg-softBlack-900 text-white rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                </button>
                <button className="w-10 h-10 bg-softBlack-900 text-white rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Author Bio */}
          <div className="bg-beige-50 rounded-3xl p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-beige-200 flex-shrink-0">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <p className="text-sm text-gold-600 font-medium mb-1">
                  {t("writtenBy")}
                </p>
                <h3 className="text-xl font-serif font-semibold text-softBlack-900 mb-2">
                  {post.author.name}
                </h3>
                <p className="text-softBlack-500">{post.author.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-white py-16">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-softBlack-900 text-center mb-12">
              {t("youMayAlsoLike")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block"
                >
                  <article className="card">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <time className="text-sm text-softBlack-400">
                        {relatedPost.date}
                      </time>
                      <h3 className="text-lg font-serif font-semibold text-softBlack-900 mt-2 group-hover:text-gold-600 transition-colors">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Back to Blog */}
            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-softBlack-600 hover:text-gold-600 transition-colors font-medium"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
                {t("backToArticles")}
              </Link>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
