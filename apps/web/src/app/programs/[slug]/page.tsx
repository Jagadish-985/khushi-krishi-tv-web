/*
 * IMPORTANT: This page uses PLACEHOLDER/STATIC DATA.
 *
 * The backend does not yet have a Programs/Episodes collection.
 * All program and episode data is imported from src/data/programs.ts.
 *
 * TODO: Replace with real API integration when backend Programs endpoints are available.
 */

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProgramBySlug, getColorThemeClass } from '@/data/programs';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  const bgColor = getColorThemeClass(program.colorTheme);
  const displayName = program.kannadaName || program.name;
  const episodes = program.episodes || [];

  return (
    <div className="min-h-screen bg-bg-light">
      <Header />

      <main className="mx-[64px] my-8">
        {/* Colored Program Banner */}
        <div
          className="relative rounded-xl p-12 mb-12 overflow-hidden"
          style={{ backgroundColor: bgColor }}
        >
          <div className="relative z-10">
            {program.kannadaName && (
              <h1 className="text-[48px] font-bold text-white mb-3">
                {program.kannadaName}
              </h1>
            )}
            <h2 className="text-[28px] font-semibold text-white mb-3">
              {program.name}
            </h2>
            <p className="text-[18px] text-white/90">
              {program.schedule}
            </p>
          </div>

          {/* Image placeholder caption */}
          <div className="absolute bottom-4 right-4 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
            Program cover — {program.name}
          </div>
        </div>

        {/* Latest Episodes Section */}
        <div className="mb-12">
          <h2 className="text-[30px] font-bold text-gray-900 mb-6">Latest Episodes</h2>

          {episodes.length === 0 ? (
            <div className="bg-white rounded-xl soft-card card-hover p-12 text-center">
              <p className="text-gray-500 text-lg">No episodes available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px]">
              {episodes.map((episode) => (
                <div
                  key={episode.number}
                  className="bg-white rounded-xl soft-card card-hover overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  {/* Light Sage Green Thumbnail */}
                  <div className="bg-gradient-to-br from-[#C8DCC9] to-[#9FC4A2] h-48 flex items-center justify-center">
                    <span className="text-[24px] font-bold text-gray-700">
                      Episode {episode.number}
                    </span>
                  </div>

                  {/* Episode Info */}
                  <div className="p-4">
                    <h3 className="text-[16px] font-bold text-gray-900 mb-2 leading-tight">
                      {episode.title}
                    </h3>
                    <p className="text-[14px] text-gray-500">
                      {episode.meta}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
