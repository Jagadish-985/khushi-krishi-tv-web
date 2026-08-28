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

async function getAgricultureArticles(): Promise<Article[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
  }

  const res = await fetch(`${apiUrl}/api/articles/category/Agriculture`, {
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch articles: ${res.status}`);
  }

  return res.json();
}

const cropGuides = [
  { num: 1, name: 'Tomato', meta: 'Crop calendar • Diseases • Market' },
  { num: 2, name: 'Paddy', meta: 'Crop calendar • Diseases • Market' },
  { num: 3, name: 'Maize', meta: 'Crop calendar • Diseases • Market' },
  { num: 4, name: 'Areca Nut', meta: 'Crop calendar • Diseases • Market' },
  { num: 5, name: 'Sugarcane', meta: 'Crop calendar • Diseases • Market' },
  { num: 6, name: 'Ragi', meta: 'Crop calendar • Diseases • Market' },
];

export default async function AgriculturePage() {
  const articles = await getAgricultureArticles();
  const latestStories = articles.slice(0, 4);

  return (
    <div className="min-h-screen bg-bg-light">
      <Header />

      <main className="mx-[64px] my-8">
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-gray-900 mb-2">Agriculture</h1>
          <p className="text-[14px] text-gray-600">
            Practical knowledge, crop guidance and stories from Karnataka farms
          </p>
        </div>

        {/* Hero Banner */}
        <div className="relative bg-[#C8DCC9] rounded-lg p-12 mb-12 overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-[40px] font-bold text-dark-green mb-4 max-w-2xl">
              Farming Knowledge That Works on the Ground
            </h2>
            <p className="text-[18px] text-gray-700">
              Crop guides • Seasonal advice • Expert interviews
            </p>
          </div>
          {/* Image placeholder caption */}
          <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-white/70 px-2 py-1 rounded">
            Agriculture hero — crops, farmer and field
          </div>
        </div>

        {/* Latest Agriculture Stories */}
        <div className="mb-12">
          <h2 className="text-[30px] font-bold text-gray-900 mb-6">Latest Agriculture Stories</h2>
          <div className="grid grid-cols-4 gap-[24px]">
            {latestStories.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow border border-gray-100"
              >
                <span className="inline-block px-3 py-1 mb-3 text-xs font-bold bg-dark-green text-white rounded-full">
                  GUIDE
                </span>
                <h3 className="text-[18px] font-bold text-gray-900 mb-2 leading-tight">
                  {article.title}
                </h3>
                <p className="text-[14px] text-gray-600">
                  {article.excerpt || 'Practical steps, expert tips and field-tested methods'}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Crop Guides */}
        <div className="mb-12">
          <h2 className="text-[30px] font-bold text-gray-900 mb-6">Crop Guides</h2>
          <div className="grid grid-cols-3 gap-[24px]">
            {cropGuides.map((crop) => (
              <div
                key={crop.num}
                className="bg-white rounded-lg p-6 border border-gray-100 hover:border-primary-green transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-dark-green text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {crop.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[18px] font-bold text-gray-900 mb-1">{crop.name}</h3>
                    <p className="text-[14px] text-gray-600">{crop.meta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
