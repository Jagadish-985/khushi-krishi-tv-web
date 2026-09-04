export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-dark-green to-[#052E20] text-white">
      <div className="mx-4 sm:mx-8 lg:mx-[64px] py-8 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2 tracking-wide">KUSHI KRISHI TV</h3>
            <p className="text-sm text-gray-300 mb-3">Your trusted source for agricultural news</p>
            <p className="text-xs text-gray-400">© {currentYear} Kushi Krishi TV. All rights reserved.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/about" className="hover:text-white hover:underline transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-white hover:underline transition-colors">Contact Us</a></li>
              <li><a href="/privacy" className="hover:text-white hover:underline transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white hover:underline transition-colors">Terms</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/news?category=Agriculture" className="hover:text-white hover:underline transition-colors">Agriculture</a></li>
              <li><a href="/news?category=Sandalwood" className="hover:text-white hover:underline transition-colors">Sandalwood</a></li>
              <li><a href="/news?category=Market" className="hover:text-white hover:underline transition-colors">Market</a></li>
              <li><a href="/news?category=Schemes" className="hover:text-white hover:underline transition-colors">Schemes</a></li>
              <li><a href="/news?category=Videos" className="hover:text-white hover:underline transition-colors">Videos</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
