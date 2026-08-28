'use client';

import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="mx-[64px] py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Two dots logo */}
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-dark-green rounded-full"></div>
            <div className="w-3 h-3 bg-lime rounded-full"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary-green">KUSHI KRISHI TV</h1>
            <p className="text-xs text-gray-600">ಕೃಷಿ, ನುಡಿ ನುಡಿತ</p>
          </div>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <a
            href="/"
            className={`hover:text-primary-green ${pathname === '/' ? 'font-bold text-dark-green border-b-2 border-dark-green pb-1' : ''}`}
          >
            Home
          </a>
          <a
            href="/news"
            className={`hover:text-primary-green ${pathname === '/news' ? 'font-bold text-dark-green border-b-2 border-dark-green pb-1' : ''}`}
          >
            News
          </a>
          <a
            href="/agriculture"
            className={`hover:text-primary-green ${pathname === '/agriculture' ? 'font-bold text-dark-green border-b-2 border-dark-green pb-1' : ''}`}
          >
            Agriculture
          </a>
          <a
            href="/sandalwood"
            className={`hover:text-primary-green ${pathname === '/sandalwood' ? 'font-bold text-dark-green border-b-2 border-dark-green pb-1' : ''}`}
          >
            Sandalwood
          </a>
          <a
            href="/market"
            className={`hover:text-primary-green ${pathname === '/market' ? 'font-bold text-dark-green border-b-2 border-dark-green pb-1' : ''}`}
          >
            Market
          </a>
          <a
            href="/schemes"
            className={`hover:text-primary-green ${pathname === '/schemes' ? 'font-bold text-dark-green border-b-2 border-dark-green pb-1' : ''}`}
          >
            Schemes
          </a>
          <a
            href="/videos"
            className={`hover:text-primary-green ${pathname.startsWith('/videos') ? 'font-bold text-dark-green border-b-2 border-dark-green pb-1' : ''}`}
          >
            Videos
          </a>
          <a
            href="/programs"
            className={`hover:text-primary-green ${pathname.startsWith('/programs') ? 'font-bold text-dark-green border-b-2 border-dark-green pb-1' : ''}`}
          >
            Programs
          </a>
          <a href="#" className="hover:text-primary-green">More</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
            ಕನ್ನಡ
          </button>
          <button className="px-4 py-2 text-sm font-bold text-white bg-live-blue rounded-lg hover:bg-blue-700">
            LIVE TV
          </button>
        </div>
      </div>
    </header>
  );
}
