/*
 * IMPORTANT: This page uses PLACEHOLDER/STATIC DATA.
 *
 * The backend does not yet have a Schemes API/collection.
 * All scheme data below is hardcoded to match the Figma design.
 *
 * TODO: Replace with real API integration when backend Schemes endpoints are available.
 *
 * NOTE: The search box is rendered as a non-functional UI element only.
 * Search functionality requires a backend API to search against.
 */

import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Placeholder scheme data - to be replaced with API fetch when backend is ready
const schemes = [
  {
    id: 1,
    name: 'PM-KISAN',
    description: 'Income support for eligible farmers'
  },
  {
    id: 2,
    name: 'Crop Insurance',
    description: 'Protection against crop losses'
  },
  {
    id: 3,
    name: 'Fertilizer Subsidy',
    description: 'Subsidized farm inputs'
  },
  {
    id: 4,
    name: 'Irrigation Support',
    description: 'Water access and efficiency'
  },
  {
    id: 5,
    name: 'Kisan Credit Card',
    description: 'Affordable agricultural credit'
  },
  {
    id: 6,
    name: 'Solar Pump Scheme',
    description: 'Renewable energy for farms'
  }
];

export default function SchemesPage() {
  return (
    <div className="min-h-screen bg-bg-light">
      <Header />

      <main className="mx-[64px] my-8">
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-gray-900 mb-2">Government Schemes</h1>
          <p className="text-[14px] text-gray-600">
            Find benefits, subsidies and support programmes relevant to farmers
          </p>
        </div>

        {/* Search Bar (non-functional UI element) */}
        <div className="bg-white rounded-lg p-4 mb-8 flex items-center gap-4 border border-gray-200">
          <svg
            className="w-5 h-5 text-gray-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search schemes by name, crop or benefit..."
            className="flex-1 text-[14px] text-gray-900 outline-none bg-transparent"
            disabled
          />
          <button className="px-6 py-2 text-sm font-bold text-white bg-dark-green rounded-lg hover:bg-primary-green transition-colors">
            Search
          </button>
        </div>

        {/* Scheme Cards Grid */}
        <div className="grid grid-cols-3 gap-[24px] mb-12">
          {schemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white rounded-lg p-6 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              {/* Numbered badge and scheme name */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-dark-green text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {scheme.id}
                </div>
                <h3 className="text-[18px] font-bold text-gray-900">{scheme.name}</h3>
              </div>

              {/* Description */}
              <p className="text-[14px] text-gray-600 mb-4">{scheme.description}</p>

              {/* View Details link */}
              <a
                href="#"
                className="text-xs font-bold text-dark-green uppercase tracking-wider hover:text-primary-green transition-colors"
              >
                VIEW DETAILS →
              </a>
            </div>
          ))}
        </div>

        {/* Eligibility & Help Section */}
        <div className="mb-12">
          <h2 className="text-[24px] font-bold text-gray-900 mb-4">Eligibility & Help</h2>
          <p className="text-[14px] text-gray-600">
            Use filters to narrow schemes by farmer type, crop, district and benefit category.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
