import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { getAllBlogPosts, getFeaturedPost, getAllCategories } from "@/lib/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("blog");
  const allPosts = getAllBlogPosts(locale);
  const featuredPost = getFeaturedPost(locale);
  const categories = getAllCategories(locale);
  const regularPosts = allPosts.filter((post) => !post.featured);

  return (
    <div className="pt-24 pb-20">
      <nav aria-label="Breadcrumb" className="container-custom pt-4">
        <ol className="flex items-center gap-2 text-sm text-softBlack-400">
          <li>
            <Link href="/" className="hover:text-gold-600 transition-colors">
              {t("home")}
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li className="text-softBlack-900 font-medium">{t("title")}</li>
        </ol>
      </nav>

      <section className="bg-gradient-to-b from-beige-100 to-white py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-softBlack-900 mb-4">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl text-softBlack-500">
              {t("subtitle")}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "All"
                    ? "bg-softBlack-900 text-beige-50"
                    : "bg-white text-softBlack-700 hover:bg-beige-100 border border-beige-200"
                }`}
              >
                {category === "All" ? t("catAll") : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {featuredPost && (
        <section className="container-custom py-12">
          <Link href={`/blog/${featuredPost.slug}`} className="group block">
            <article className="grid md:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="relative aspect-[4/3] md:aspect-auto">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-rose-500 text-white text-xs font-semibold rounded-full">
                  {t("featured")}
                </span>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-gold-100 text-gold-700 text-xs font-semibold rounded-full">
                    {featuredPost.category}
                  </span>
                  <span className="text-sm text-softBlack-400">
                    {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-softBlack-900 mb-4 group-hover:text-gold-600 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-softBlack-500 mb-6 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <time className="text-sm text-softBlack-400">
                    {featuredPost.date}
                  </time>
                  <span className="inline-flex items-center gap-2 text-softBlack-900 font-medium group-hover:text-gold-600 transition-colors">
                    {t("readArticle")}
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          </Link>
        </section>
      )}

      <section className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <article className="card h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-gold-500 text-softBlack-900 text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <time className="text-sm text-softBlack-400">
                      {post.date}
                    </time>
                    <span className="text-sm text-softBlack-400">•</span>
                    <span className="text-sm text-softBlack-400">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-softBlack-900 mb-3 group-hover:text-gold-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-softBlack-500 text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 mt-4 text-sm text-softBlack-900 font-medium group-hover:text-gold-600 transition-colors">
                    {t("readMore")}
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <button type="button" className="btn-secondary">{t("loadMore")}</button>
        </div>
      </section>
    </div>
  );
}
