/*
 * IMPORTANT: This page uses PLACEHOLDER/STATIC DATA.
 *
 * The backend does not yet have a Programs collection.
 * All program data is imported from src/data/programs.ts.
 *
 * TODO: Replace with real API integration when backend Programs endpoints are available.
 */

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { programs, getColorThemeClass } from '@/data/programs';

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-bg-light">
      <Header />

      <main className="mx-[64px] my-8">
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-gray-900 mb-2">Programs & Shows</h1>
          <p className="text-[14px] text-gray-600">
            Regular programmes from Kushi Krishi TV
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-3 gap-[24px] mb-12">
          {programs.map((program) => {
            const bgColor = getColorThemeClass(program.colorTheme);

            return (
              <div
                key={program.slug}
                className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                {/* Colored Cover Placeholder */}
                <div
                  className="h-48 flex items-center justify-center relative"
                  style={{ backgroundColor: bgColor }}
                >
                  <span className="text-[32px] font-bold text-white/30 text-center px-6">
                    {program.name}
                  </span>
                </div>

                {/* Program Info */}
                <div className="p-6">
                  <h3 className="text-[20px] font-bold text-gray-900 mb-2">
                    {program.name}
                  </h3>
                  <p className="text-[14px] text-gray-600 mb-4">
                    {program.schedule}
                  </p>

                  {/* View Program Button */}
                  <Link
                    href={`/programs/${program.slug}`}
                    className="inline-block px-6 py-2 text-sm font-bold text-dark-green bg-white border-2 border-dark-green rounded-lg hover:bg-dark-green hover:text-white transition-colors"
                  >
                    View Program
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
