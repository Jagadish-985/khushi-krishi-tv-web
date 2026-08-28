export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-green text-white">
      <div className="mx-[64px] py-8">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">KUSHI KRISHI TV</h3>
            <p className="text-sm text-gray-300 mb-3">Your trusted source for agricultural news</p>
            <p className="text-xs text-gray-400">© {currentYear} Kushi Krishi TV. All rights reserved.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/news?category=Agriculture" className="hover:text-white">Agriculture</a></li>
              <li><a href="/news?category=Sandalwood" className="hover:text-white">Sandalwood</a></li>
              <li><a href="/news?category=Market" className="hover:text-white">Market</a></li>
              <li><a href="/news?category=Schemes" className="hover:text-white">Schemes</a></li>
              <li><a href="/news?category=Videos" className="hover:text-white">Videos</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
