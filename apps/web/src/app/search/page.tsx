/*
 * Search Page
 *
 * Performs REAL search against existing article data from the backend.
 * Fetches all articles from GET /api/articles and filters client-side (server component)
 * by matching the query string against each article's title (case-insensitive substring match).
 */

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
  excerpt?: string;
}

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

async function getAllArticles(): Promise<Article[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
  }

  const res = await fetch(`${apiUrl}/api/articles`, {
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch articles: ${res.status}`);
  }

  return res.json();
}

function generateThumbnailLabel(title: string): string {
  // Take first 2-3 words, lowercase
  const words = title.toLowerCase().split(' ').slice(0, 2);
  return words.join(' ');
}

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = params.q?.trim() || '';

  let articles: Article[] = [];
  let results: Article[] = [];

  if (query) {
    articles = await getAllArticles();
    // Filter articles where title contains the query (case-insensitive)
    results = articles.filter(article =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  return (
    <div className="min-h-screen bg-bg-light">
      <Header />

      <main className="mx-4 sm:mx-8 lg:mx-[64px] my-8">
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-2">Search</h1>
          <p className="text-sm text-gray-600">
            Find news, videos, programmes, schemes and guides
          </p>
        </div>

        {/* Search Bar */}
        <form action="/search" method="GET" className="mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search articles..."
              className="flex-1 px-4 py-3 text-[16px] text-gray-900 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="px-8 py-3 text-sm font-bold text-white bg-dark-green rounded-xl hover:bg-primary-green transition-colors shadow-sm hover:shadow-md"
            >
              Search
            </button>
          </div>
        </form>

        {/* Results Count */}
        {query && (
          <p className="text-sm text-gray-500 mb-6">
            {results.length} {results.length === 1 ? 'result' : 'results'}
          </p>
        )}

        {/* Results or Empty States */}
        {!query ? (
          <div className="bg-white rounded-2xl soft-card p-12 text-center border border-gray-100">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">Enter a search term above</p>
          </div>
        ) : results.length === 0 ? (
          <div className="bg-white rounded-2xl soft-card p-12 text-center border border-gray-100">
            <div className="text-5xl mb-4">😔</div>
            <p className="text-gray-500 text-lg">
              No results found for &apos;{query}&apos;
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((article) => {
              const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              });

              const thumbnailLabel = generateThumbnailLabel(article.title);

              return (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="bg-white rounded-2xl soft-card card-hover overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 block"
                >
                  <div className="flex gap-4 p-3">
                    {/* Light green thumbnail with label */}
                    <div className="w-28 h-28 bg-[#D9E8DD] rounded shrink-0 flex items-center justify-center">
                      <span className="text-xs text-gray-600 text-center px-2 leading-tight">
                        {thumbnailLabel}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {article.category} • {formattedDate}
                      </p>
                      <span className="text-sm font-semibold text-dark-green hover:text-primary-green hover:opacity-90">
                        Read more →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
