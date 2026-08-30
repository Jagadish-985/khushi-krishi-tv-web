'use client';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

function linkClass(isActive: boolean) {
  if (isActive) {
    return 'hover:text-primary-green font-bold text-dark-green border-b-2 border-dark-green pb-1';
  }
  return 'hover:text-primary-green';
}

export default function Header() {
  const pathname = usePathname();
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setIsMoreDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="mx-[64px] py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
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
          <a href="/" className={linkClass(pathname === '/')}>
            Home
          </a>
          <a href="/search" className={linkClass(pathname === '/search')}>
            Search
          </a>
          <a href="/news" className={linkClass(pathname === '/news')}>
            News
          </a>
          <a href="/agriculture" className={linkClass(pathname === '/agriculture')}>
            Agriculture
          </a>
          <a href="/sandalwood" className={linkClass(pathname === '/sandalwood')}>
            Sandalwood
          </a>
          <a href="/market" className={linkClass(pathname === '/market')}>
            Market
          </a>
          <a href="/schemes" className={linkClass(pathname === '/schemes')}>
            Schemes
          </a>
          <a href="/videos" className={linkClass(pathname.startsWith('/videos'))}>
            Videos
          </a>
          <a href="/programs" className={linkClass(pathname.startsWith('/programs'))}>
            Programs
          </a>

          <div className="relative" ref={moreDropdownRef}>
            <button onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)} className={linkClass(pathname === '/more')}>
              More
            </button>
            {isMoreDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <a href="/more#about" onClick={() => setIsMoreDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-green">
                  About
                </a>
                <a href="/more#terms" onClick={() => setIsMoreDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-green">
                  Terms and Conditions
                </a>
                <a href="/more#privacy" onClick={() => setIsMoreDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-green">
                  Privacy Policy
                </a>
                <a href="/more#contact" onClick={() => setIsMoreDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-green">
                  Contact Us
                </a>
              </div>
            )}
          </div>
        </nav>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
            ಕನ್ನಡ
          </button>
          <a href="/live" className="px-4 py-2 text-sm font-bold text-white bg-live-blue rounded-lg hover:bg-blue-700">
            LIVE TV
          </a>
        </div>
      </div>
    </header>
  );
}