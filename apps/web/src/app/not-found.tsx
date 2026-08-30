/*
 * 404 Not Found Page
 *
 * Next.js convention: not-found.tsx at the app root handles:
 * - True 404s (invalid routes)
 * - Explicit notFound() calls from components
 * - Can be used as a placeholder for "page not built yet" scenarios
 */

import Header from '@/components/Header';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-light flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-8">
          <h1 className="text-[72px] font-bold text-dark-green mb-4">404</h1>
          <h2 className="text-[28px] font-bold text-gray-900 mb-3">
            Page not found
          </h2>
          <p className="text-[16px] text-gray-600 mb-8 max-w-md mx-auto">
            The page you are looking for may have moved or no longer exists.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 text-sm font-bold text-white bg-dark-green rounded-lg hover:bg-primary-green transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
