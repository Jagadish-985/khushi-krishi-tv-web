import ArticleCard from '@/components/ArticleCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Article {
  id: string;
  title: string;
  slug: string;
  body: string;
  category: string;
  isBreakingNews: boolean;
  publishedAt: string;
}

async function getArticles(): Promise<Article[]> {
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

export default async function Home() {
  const articles = await getArticles();

  const breakingNews = articles.find(a => a.isBreakingNews);
  const topStory = articles[0];
  const latestNews = articles.slice(1, 5);

  return (
    <div className="min-h-screen bg-bg-light">
      <Header />

      {/* Breaking News Bar */}
      {breakingNews && (
        <div className="bg-dark-green">
          <div className="mx-[64px] py-3 flex items-center gap-4">
            <span className="px-3 py-1 text-xs font-bold text-white bg-bright-green rounded-full">
              BREAKING NEWS
            </span>
            <p className="text-white font-medium">{breakingNews.title}</p>
          </div>
        </div>
      )}

      {/* Hero + Sidebar Section */}
      <div className="mx-[64px] mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Left: Hero + Top Story */}
        <div className="col-span-2 space-y-6">
          {/* Hero Image Placeholder */}
          <div className="w-full h-[400px] bg-gray-300 rounded-lg"></div>

          {/* Top Story Card */}
          <div className="bg-dark-green text-white p-[12px] rounded-lg">
            <span className="inline-block px-3 py-1 mb-3 text-xs font-bold bg-bright-green text-white rounded-full">
              TOP STORY
            </span>
            <h2 className="text-2xl font-bold mb-2">{topStory?.title}</h2>
            <p className="text-gray-200 mb-4 line-clamp-2">
              {topStory?.body.substring(0, 150)}...
            </p>
            <button className="px-4 py-2 text-sm font-semibold text-dark-green bg-white rounded-lg hover:bg-gray-100">
              Read Full Story →
            </button>
          </div>
        </div>

        {/* Right: Latest News Sidebar */}
        <div className="bg-white p-[12px] rounded-lg h-fit">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Latest News</h3>
            <a href="/news" className="text-sm font-medium text-primary-green hover:underline">
              View All
            </a>
          </div>
          <div className="space-y-0">
            {latestNews.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                slug={article.slug}
                category={article.category}
                publishedAt={article.publishedAt}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Category Shortcuts Row */}
      <div className="mx-[64px] mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[24px]">
          {[
            { num: '1', title: 'Agriculture', desc: 'Latest farming techniques', href: '/news?category=Agriculture' },
            { num: '2', title: 'Sandalwood', desc: 'Cultivation & market', href: '/news?category=Sandalwood' },
            { num: '3', title: 'Market Updates', desc: 'Daily commodity prices', href: '/news?category=Market' },
            { num: '4', title: 'Government Schemes', desc: 'Farmer welfare programs', href: '/news?category=Schemes' },
            { num: '5', title: 'Videos', desc: 'Educational content', href: '/news?category=Videos' },
          ].map((cat) => (
            <a key={cat.num} href={cat.href} className="bg-white p-[12px] rounded-lg border border-gray-200 hover:border-primary-green cursor-pointer block">
              <div className="w-8 h-8 bg-primary-green text-white rounded-full flex items-center justify-center font-bold mb-2">
                {cat.num}
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{cat.title}</h4>
              <p className="text-xs text-gray-600">{cat.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Featured Videos Section */}
      <div className="mx-[64px] mt-12 mb-12">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Videos</h2>
          <p className="text-gray-600">Expert insights and educational content</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden">
              <div className="w-full h-48 bg-gray-300"></div>
              <div className="p-[12px]">
                <h4 className="font-semibold text-gray-900 mb-1">Video Title {i}</h4>
                <p className="text-sm text-gray-600">Brief description of the video content</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
