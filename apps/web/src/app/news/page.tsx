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
}

interface NewsPageProps {
  searchParams: Promise<{ category?: string }>;
}

async function getArticles(category?: string): Promise<Article[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
  }

  let url: string;
  if (!category || category === 'All News') {
    url = `${apiUrl}/api/articles`;
  } else {
    url = `${apiUrl}/api/articles/category/${encodeURIComponent(category)}`;
  }

  const res = await fetch(url, {
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch articles: ${res.status}`);
  }

  return res.json();
}

function generateThumbnailLabel(title: string): string {
  // Take first 2-3 words, lowercase, similar to Figma examples
  const words = title.toLowerCase().split(' ').slice(0, 3);
  return words.join(' ');
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const { category } = await searchParams;
  const activeCategory = category || 'All News';
  const articles = await getArticles(activeCategory);

  const categories = ['All News', 'Agriculture', 'Market', 'Schemes'];

  return (
    <div className="min-h-screen bg-bg-light">
      <Header />

      <main className="mx-[64px] my-8">
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-gray-900 mb-2">Latest News</h1>
          <p className="text-[14px] text-gray-600">Agriculture, markets, government decisions and rural developments</p>
        </div>

        {/* Filter Pills + Sort Row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const href = cat === 'All News' ? '/news' : `/news?category=${cat}`;

              return (
                <Link
                  key={cat}
                  href={href}
                  className={`px-5 py-2 text-[14px] font-bold rounded-full transition-colors ${
                    isActive
                      ? 'bg-primary-green text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-primary-green'
                  }`}
                >
                  {cat.toUpperCase()}
                </Link>
              );
            })}
          </div>

          <div className="text-[14px] text-gray-600">
            Sort: <span className="font-semibold">Latest</span>
          </div>
        </div>

        {/* Articles Grid or Empty State */}
        {articles.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-500 text-lg">No articles in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px]">
            {articles.map((article) => {
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
                  className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="flex gap-4 p-[12px]">
                    {/* Light green thumbnail with label */}
                    <div className="w-28 h-28 bg-[#D9E8DD] rounded flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs text-gray-600 text-center px-2 leading-tight">
                        {thumbnailLabel}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-[18px] font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-[14px] text-gray-500">
                        {formattedDate} • {article.category} News
                      </p>
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
