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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const mobileLinks = [
    { href: '/', label: 'Home' },
    { href: '/search', label: 'Search' },
    { href: '/news', label: 'News' },
    { href: '/agriculture', label: 'Agriculture' },
    { href: '/sandalwood', label: 'Sandalwood' },
    { href: '/market', label: 'Market' },
    { href: '/schemes', label: 'Schemes' },
    { href: '/videos', label: 'Videos' },
    { href: '/programs', label: 'Programs' },
    { href: '/live', label: 'Live TV' },
    { href: '/about', label: 'About' },
    { href: '/terms', label: 'Terms and Conditions' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/contact', label: 'Contact Us' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 relative sticky top-0 z-40 shadow-sm">
      <div className="mx-4 sm:mx-8 lg:mx-[64px] py-3 sm:py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-dark-green rounded-full"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-lime rounded-full"></div>
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-bold text-primary-green leading-tight">KUSHI KRISHI TV</h1>
            <p className="text-[10px] sm:text-xs text-gray-600 leading-tight">ಕೃಷಿ, ನುಡಿ ನುಡಿತ</p>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
          <a href="/" className={linkClass(pathname === '/')}>Home</a>
          <a href="/search" className={linkClass(pathname === '/search')}>Search</a>
          <a href="/news" className={linkClass(pathname === '/news')}>News</a>
          <a href="/agriculture" className={linkClass(pathname === '/agriculture')}>Agriculture</a>
          <a href="/sandalwood" className={linkClass(pathname === '/sandalwood')}>Sandalwood</a>
          <a href="/market" className={linkClass(pathname === '/market')}>Market</a>
          <a href="/schemes" className={linkClass(pathname === '/schemes')}>Schemes</a>
          <a href="/videos" className={linkClass(pathname.startsWith('/videos'))}>Videos</a>
          <a href="/programs" className={linkClass(pathname.startsWith('/programs'))}>Programs</a>

          <div className="relative" ref={moreDropdownRef}>
            <button onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)} className={linkClass(['/about', '/terms', '/privacy', '/contact'].includes(pathname))}>
              More
            </button>
            {isMoreDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <a href="/about" onClick={() => setIsMoreDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-green">About</a>
                <a href="/terms" onClick={() => setIsMoreDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-green">Terms and Conditions</a>
                <a href="/privacy" onClick={() => setIsMoreDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-green">Privacy Policy</a>
                <a href="/contact" onClick={() => setIsMoreDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-green">Contact Us</a>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button className="hidden sm:inline-block px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
            ಕನ್ನಡ
          </button>
          <a href="/live" className="hidden sm:inline-block px-3 sm:px-4 py-2 text-sm font-bold text-white bg-live-blue rounded-lg hover:bg-blue-700">
            LIVE TV
          </a>

          {/* Hamburger — only on small/medium screens */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 border border-gray-300 rounded-lg text-xl leading-none"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu overlay + centered panel */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Dark backdrop — tapping it closes the menu */}
          <div className="absolute inset-0 bg-black/40" onClick={closeMobileMenu}></div>

          {/* Menu panel */}
          <div className="absolute top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <span className="font-bold text-primary-green">Menu</span>
              <button onClick={closeMobileMenu} className="p-2 text-xl leading-none" aria-label="Close menu">✕</button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-4">
              {mobileLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={
                    pathname === link.href
                      ? 'block text-center py-3 text-base font-bold text-primary-green border-b border-gray-100'
                      : 'block text-center py-3 text-base text-gray-700 border-b border-gray-100'
                  }
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="px-5 py-4 border-t border-gray-200">
              <button className="w-full py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg">
                ಕನ್ನಡ
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}