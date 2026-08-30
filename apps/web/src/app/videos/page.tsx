import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

type Video = { id: string; slug: string; title: string; duration: string; views: string; category: string };

async function getVideos(category?: string): Promise<Video[]> {
  const url = category
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/videos?category=${encodeURIComponent(category)}`
    : `${process.env.NEXT_PUBLIC_API_URL}/api/videos`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  return res.json();
}

export default async function VideosPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams;
  const category = params.category;
  const videos = await getVideos(category);
  const categories = ['All', 'Agriculture', 'Sandalwood', 'Market'];

  return (
    <div className="min-h-screen bg-bg-light">
      <Header />
      <main className="mx-[64px] my-8">
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-gray-900 mb-2">Videos</h1>
          <p className="text-[14px] text-gray-600">Reports, interviews, farming explainers and Kushi Krishi TV programmes</p>
        </div>

        <div className="flex gap-3 mb-8">
          {categories.map((cat) => {
            const isActive = cat === 'All' ? !category : category === cat;
            const href = cat === 'All' ? '/videos' : `/videos?category=${cat}`;
            return (
              <Link key={cat} href={href} className={`px-6 py-2 text-sm font-bold rounded-full transition-colors ${isActive ? 'bg-dark-green text-white' : 'bg-white text-gray-700 border border-gray-300 hover:border-dark-green'}`}>
                {cat.toUpperCase()}
              </Link>
            );
          })}
        </div>

        {videos.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-500 text-lg">No videos in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px] mb-12">
            {videos.map((video) => (
              <Link key={video.slug} href={`/videos/${video.slug}`} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
                <div className="relative bg-[#C8DCC9] aspect-video flex items-center justify-center">
                  <div className="w-16 h-16 bg-dark-green rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-[16px] font-bold text-gray-900 mb-2 leading-tight line-clamp-2">{video.title}</h3>
                  <p className="text-[14px] text-gray-500">{video.duration} • {video.views} views</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}