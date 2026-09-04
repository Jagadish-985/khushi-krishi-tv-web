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

async function getSandalwoodArticles(): Promise<Article[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
  }

  const res = await fetch(`${apiUrl}/api/articles/category/Sandalwood`, {
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

const infoCards = [
  {
    title: 'Policy & Regulation',
    description: 'Licensing, rules and government updates'
  },
  {
    title: 'Cultivation Guide',
    description: 'Plantation planning, care and harvesting'
  },
  {
    title: 'Market & Industry',
    description: 'Prices, demand, processing and trade'
  }
];

export default async function SandalwoodPage() {
  const articles = await getSandalwoodArticles();

  return (
    <div className="min-h-screen bg-bg-light">
      <Header />

      <main className="mx-4 sm:mx-8 lg:mx-[64px] my-8">
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-gray-900 mb-2 tracking-tight">Sandalwood</h1>
          <p className="text-[14px] text-gray-600">
            Industry news, cultivation guidance, policy and market intelligence
          </p>
        </div>

        {/* Hero Banner */}
        <div className="relative bg-gradient-to-br from-[#B08A52] via-[#9D7845] to-[#8A6B3D] rounded-2xl p-12 mb-12 overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-white mb-4 max-w-2xl tracking-tight">
              Sandalwood: From Farm to Industry
            </h2>
            <p className="text-[18px] text-white/90">
              Track policy changes, cultivation and market developments.
            </p>
          </div>
          {/* Image placeholder caption */}
          <div className="absolute bottom-4 right-4 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
            Sandalwood plantation hero
          </div>
        </div>

        {/* Three-column info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px] mb-12">
          {infoCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl soft-card card-hover p-6 border border-gray-100"
            >
              <h3 className="text-[18px] font-bold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-[14px] text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>

        {/* Latest Sandalwood News */}
        <div className="mb-12">
          <h2 className="text-[30px] font-bold text-gray-900 mb-6 tracking-tight">Latest Sandalwood News</h2>
          {articles.length === 0 ? (
            <div className="bg-white rounded-2xl soft-card card-hover p-12 text-center border border-gray-100">
              <p className="text-gray-500 text-lg">No articles in this category yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
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
                    className="bg-white rounded-2xl soft-card card-hover overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 block"
                  >
                    <div className="flex gap-4 p-[12px]">
                      {/* Tan/light-brown thumbnail with label */}
                      <div className="w-32 h-24 bg-[#E5D2B8] rounded flex-shrink-0 flex items-center justify-center">
                        <span className="text-xs text-gray-700 text-center px-2 leading-tight font-medium">
                          {thumbnailLabel}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-[18px] font-bold text-gray-900 mb-2 leading-tight">
                          {article.title}
                        </h3>
                        <p className="text-[14px] text-gray-500">
                          {formattedDate} • Sandalwood
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
