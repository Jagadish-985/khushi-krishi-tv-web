import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  slug: string;
  body: string;
  category: string;
  isBreakingNews: boolean;
  publishedAt: string;
  author: string;
  readTimeMinutes: number;
  excerpt: string;
  tags: string[];
}

async function getArticle(slug: string): Promise<Article> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
  }

  const res = await fetch(`${apiUrl}/api/articles/slug/${slug}`, {
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch article: ${res.status}`);
  }

  return res.json();
}

async function getRelatedArticles(category: string, currentSlug: string): Promise<Article[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return [];
  }

  try {
    const res = await fetch(`${apiUrl}/api/articles/category/${category}`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      return [];
    }

    const articles: Article[] = await res.json();
    return articles.filter(a => a.slug !== currentSlug).slice(0, 3);
  } catch {
    return [];
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  const relatedArticles = await getRelatedArticles(article.category, article.slug);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Split body into paragraphs for better rendering
  const paragraphs = article.body.split('\n').filter(p => p.trim().length > 0);

  return (
    <div className="min-h-screen bg-bg-light">
      <Header />

      <main className="mx-[64px] my-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Content Column */}
          <div className="col-span-2">
            <article className="bg-white rounded-lg p-8">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-bright-green/10 text-dark-green">
                  {article.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {article.title}
              </h1>

              {/* Excerpt */}
              {article.excerpt && (
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {article.excerpt}
                </p>
              )}

              {/* Meta Line */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
                <span>{formattedDate}</span>
                <span>•</span>
                <span>{article.author}</span>
                <span>•</span>
                <span>{article.readTimeMinutes} min read</span>
              </div>

              {/* Hero Image Placeholder */}
              <div className="w-full h-[400px] bg-gray-300 rounded-lg mb-8"></div>

              {/* Article Body */}
              <div className="prose prose-lg max-w-none">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-gray-800 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* "In this story" Card - only show if tags exist */}
            {article.tags && article.tags.length > 0 && (
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">In this story</h3>
                <ul className="space-y-2">
                  {article.tags.map((tag) => (
                    <li key={tag} className="text-sm text-gray-700">
                      <a href="#" className="hover:text-primary-green hover:underline">
                        {tag}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.id}
                      href={`/articles/${related.slug}`}
                      className="block hover:bg-gray-50 p-2 rounded transition-colors"
                    >
                      <span className="inline-block px-2 py-0.5 text-xs font-medium rounded bg-bright-green/10 text-dark-green mb-2">
                        {related.category}
                      </span>
                      <h4 className="text-sm font-semibold text-gray-900 leading-tight mb-1">
                        {related.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {new Date(related.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
