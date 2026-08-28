/*
 * IMPORTANT: This page uses PLACEHOLDER/STATIC DATA.
 *
 * The backend does not yet have a Prices/Commodities API.
 * All market data below is hardcoded to match the Figma design.
 *
 * TODO: Replace with real API integration when backend endpoints are available.
 */

import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Placeholder data - to be replaced with API fetch when backend is ready
const quickStats = [
  { label: 'Tomato', value: '₹ 32/kg' },
  { label: 'Areca Nut', value: '₹ 418/kg' },
  { label: 'Paddy', value: '₹ 2,250/q' }
];

// Placeholder mandi prices data
const mandiPrices = [
  { commodity: 'Tomato', market: 'Kolar', min: 28, max: 35, modal: 32, change: '+8%' },
  { commodity: 'Areca Nut', market: 'Shivamogga', min: 390, max: 445, modal: 418, change: '+3%' },
  { commodity: 'Paddy', market: 'Mandya', min: '2,180', max: '2,350', modal: '2,250', change: '+2%' },
  { commodity: 'Maize', market: 'Davanagere', min: '2,050', max: '2,180', modal: '2,120', change: '-1%' },
  { commodity: 'Onion', market: 'Hassan', min: 18, max: 24, modal: 21, change: '+6%' },
  { commodity: 'Ragi', market: 'Tumakuru', min: '3,100', max: '3,450', modal: '3,280', change: '+1%' },
  { commodity: 'Sugarcane', market: 'Mysuru', min: '3,400', max: '3,700', modal: '3,550', change: '+2%' }
];

function getChangeColor(change: string): string {
  if (change.startsWith('+')) {
    return 'text-[#27A84A]'; // Positive - green
  } else if (change.startsWith('-')) {
    return 'text-[#DC2626]'; // Negative - red
  }
  return 'text-gray-900';
}

export default function MarketPage() {
  return (
    <div className="min-h-screen bg-bg-light">
      <Header />

      <main className="mx-[64px] my-8">
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-gray-900 mb-2">Market Updates</h1>
          <p className="text-[14px] text-gray-600">
            Daily prices, mandi rates and market insights
          </p>
        </div>

        {/* Today's Market Snapshot Banner */}
        <div className="bg-dark-green rounded-lg p-8 mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[24px] font-bold text-white mb-4">Today&apos;s Market Snapshot</h2>
            </div>

            <div className="flex items-center gap-12">
              {quickStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-sm text-gray-300 mb-1">{stat.label}</p>
                  <p className="text-[20px] font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="text-sm text-gray-300">Updated 10:30 AM</p>
            </div>
          </div>
        </div>

        {/* Mandi Prices Section */}
        <div className="mb-12">
          <h2 className="text-[30px] font-bold text-gray-900 mb-6">Mandi Prices</h2>

          <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Commodity
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Market
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Min
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Max
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Modal
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody>
                {mandiPrices.map((price, index) => (
                  <tr
                    key={`${price.commodity}-${price.market}`}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      index === mandiPrices.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="px-6 py-4 text-[16px] font-bold text-gray-900">
                      {price.commodity}
                    </td>
                    <td className="px-6 py-4 text-[14px] text-gray-700">
                      {price.market}
                    </td>
                    <td className="px-6 py-4 text-[14px] text-gray-700">
                      {price.min}
                    </td>
                    <td className="px-6 py-4 text-[14px] text-gray-700">
                      {price.max}
                    </td>
                    <td className="px-6 py-4 text-[16px] font-bold text-gray-900">
                      {price.modal}
                    </td>
                    <td className={`px-6 py-4 text-[14px] font-semibold ${getChangeColor(price.change)}`}>
                      {price.change}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
