/*
 * IMPORTANT: This page uses PLACEHOLDER/STATIC DATA.
 *
 * The backend does not yet have a Videos collection/API.
 * All video data is imported from src/data/videos.ts.
 *
 * TODO: Replace with real API integration when backend Videos endpoints are available.
 */

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { videos, getVideosByCategory } from '@/data/videos';

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function VideosPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params.category;

  const displayedVideos = category ? getVideosByCategory(category) : videos;

  const categories = ['ALL', 'AGRICULTURE', 'SANDALWOOD', 'MARKET'];

  return (
    <div className="min-h-screen bg-bg-light">
      <Header />

      <main className="mx-[64px] my-8">
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-gray-900 mb-2">Videos</h1>
          <p className="text-[14px] text-gray-600">
            Reports, interviews, farming explainers and Kushi Krishi TV programmes
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-3 mb-8">
          {categories.map((cat) => {
            const isActive = cat === 'ALL' ? !category : category === cat.charAt(0) + cat.slice(1).toLowerCase();
            const href = cat === 'ALL' ? '/videos' : `/videos?category=${cat.charAt(0) + cat.slice(1).toLowerCase()}`;

            return (
              <Link
                key={cat}
                href={href}
                className={`px-6 py-2 text-sm font-bold rounded-full transition-colors ${
                  isActive
                    ? 'bg-dark-green text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-dark-green'
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Video Grid */}
        {displayedVideos.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-500 text-lg">No videos in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-[24px] mb-12">
            {displayedVideos.map((video) => (
              <Link
                key={video.slug}
                href={`/videos/${video.slug}`}
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow border border-gray-100"
              >
                {/* Video Thumbnail with Play Button */}
                <div className="relative bg-[#C8DCC9] aspect-video flex items-center justify-center">
                  {/* Play Button Icon */}
                  <div className="w-16 h-16 bg-dark-green rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <h3 className="text-[16px] font-bold text-gray-900 mb-2 leading-tight line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-[14px] text-gray-500">
                    {video.duration} • {video.views} views
                  </p>
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
