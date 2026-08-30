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
import { getVideoBySlug, getOtherVideos } from '@/data/videos';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function VideoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const video = getVideoBySlug(slug);

  if (!video) {
    notFound();
  }

  const otherVideos = getOtherVideos(slug, 3);
  const displayTitle = video.displayTitle || video.title;
  const subtitle = video.subtitle || video.description || '';
  const totalDuration = video.totalDuration || video.duration;
  const aboutText = video.aboutText || 'Kushi Krishi TV brings field-first stories, practical demonstrations and expert voices from across Karnataka.';

  return (
    <div className="min-h-screen bg-bg-light">
      <Header />

      <main className="mx-[64px] my-8">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-xs font-bold bg-dark-green text-white rounded-full uppercase">
            {video.category}
          </span>
        </div>

        {/* Title and Subtitle */}
        <div className="mb-8">
          <h1 className="text-[36px] font-bold text-gray-900 mb-3">{displayTitle}</h1>
          <p className="text-[16px] text-gray-600">{subtitle}</p>
        </div>

        {/* Two-column Layout */}
        <div className="grid grid-cols-12 gap-[24px] mb-12">
          {/* Left Column - Video Player */}
          <div className="col-span-8">
            <div className="relative bg-gradient-to-br from-[#C8DCC9] to-[#9FC4A2] rounded-xl overflow-hidden aspect-video flex items-center justify-center">
              {/* Play Button Icon */}
              <div className="w-20 h-20 bg-dark-green rounded-full flex items-center justify-center mb-8">
                <svg
                  className="w-10 h-10 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              {/* Video Placeholder Text */}
              <div className="absolute text-sm text-gray-600 font-medium">
                Video placeholder — 16:9
              </div>

              {/* Progress Bar and Duration */}
              <div className="absolute bottom-0 left-0 right-0">
                <div className="h-1 bg-white/30 w-full">
                  <div className="h-1 bg-white w-0"></div>
                </div>
                <div className="px-4 py-2">
                  <span className="text-sm text-white font-medium">
                    00:00 / {totalDuration}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - More Videos Sidebar */}
          <div className="col-span-4">
            <div className="bg-white rounded-xl soft-card card-hover p-6 border border-gray-100">
              <h3 className="text-[18px] font-bold text-gray-900 mb-4">More Videos</h3>
              <div className="space-y-4">
                {otherVideos.map((otherVideo) => (
                  <Link
                    key={otherVideo.slug}
                    href={`/videos/${otherVideo.slug}`}
                    className="flex gap-3 hover:bg-gray-50 rounded transition-colors p-2 -m-2"
                  >
                    {/* Small Thumbnail */}
                    <div className="w-24 h-16 bg-gradient-to-br from-[#C8DCC9] to-[#9FC4A2] rounded flex-shrink-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-dark-green rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white ml-0.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="flex-1">
                      <h4 className="text-[14px] font-bold text-gray-900 mb-1 leading-tight line-clamp-2">
                        {otherVideo.title}
                      </h4>
                      <p className="text-[12px] text-gray-500">
                        {otherVideo.duration} • {otherVideo.views} views
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* About This Video Section */}
        <div className="mb-12">
          <h2 className="text-[24px] font-bold text-gray-900 mb-4">About this video</h2>
          <p className="text-[16px] text-gray-600 leading-relaxed">
            {aboutText}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
