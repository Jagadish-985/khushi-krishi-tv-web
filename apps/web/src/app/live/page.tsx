/*
 * Live TV Page
 *
 * Static UI placeholder for future live video streaming.
 * The "Now & Next" schedule pulls from existing programs data
 * (apps/web/src/data/programs.ts) to stay consistent with the Programs section.
 *
 * NOTE: Schedule times are placeholder/static for now. Eventually this should
 * reflect a real live schedule API that provides current and next programs with
 * actual start/end times.
 */

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { programs } from '@/data/programs';

export default function LivePage() {
  // Use first two programs from existing data for "Now & Next"
  // In a real implementation, this would come from a live schedule API
  const onAirProgram = programs[2]; // Market Report
  const nextProgram = programs[3]; // Raitara Mathu

  // Placeholder time ranges matching the screenshot style
  const onAirTime = '6:30 PM – 7:00 PM';
  const nextTime = '7:00 PM – 7:30 PM';

  return (
    <div className="min-h-screen bg-bg-light">
      <Header />

      <main className="mx-[64px] my-8">
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-gray-900 mb-2">
            Kushi Krishi TV — Live
          </h1>
          <p className="text-[14px] text-gray-600">Watch the channel live</p>
        </div>

        {/* Two-column Layout */}
        <div className="grid grid-cols-12 gap-[24px] mb-12">
          {/* Left Column - Video Player Placeholder */}
          <div className="col-span-8">
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
              {/* LIVE label - top left */}
              <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                LIVE
              </div>

              {/* Play Button - centered */}
              <div className="w-20 h-20 bg-dark-green rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              {/* Channel name - bottom left */}
              <div className="absolute bottom-4 left-4 text-white/90 text-sm font-medium">
                Kushi Krishi TV
              </div>
            </div>
          </div>

          {/* Right Column - Now & Next Sidebar */}
          <div className="col-span-4">
            <div className="bg-white rounded-lg p-6 border border-gray-100">
              <h3 className="text-[18px] font-bold text-gray-900 mb-6">
                Now &amp; Next
              </h3>

              {/* ON AIR */}
              <div className="mb-6">
                <span className="inline-block text-xs font-bold text-primary-green uppercase mb-2">
                  ON AIR
                </span>
                <h4 className="text-[16px] font-bold text-gray-900 mb-1">
                  {onAirProgram.name}
                </h4>
                <p className="text-[14px] text-gray-500">{onAirTime}</p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 mb-6"></div>

              {/* NEXT */}
              <div className="mb-6">
                <span className="inline-block text-xs font-bold text-gray-500 uppercase mb-2">
                  NEXT
                </span>
                <h4 className="text-[16px] font-bold text-gray-900 mb-1">
                  {nextProgram.name}
                </h4>
                <p className="text-[14px] text-gray-500">{nextTime}</p>
              </div>

              {/* Helper text */}
              <p className="text-[12px] text-gray-500 mb-4 leading-relaxed">
                Live TV also available on supported mobile apps and connected TV
                platforms.
              </p>

              {/* View Programme Guide button */}
              <Link
                href="/programs"
                className="block w-full px-6 py-3 text-center text-sm font-bold text-white bg-dark-green rounded-lg hover:bg-primary-green transition-colors"
              >
                View Programme Guide
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
