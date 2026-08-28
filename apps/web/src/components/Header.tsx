export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="mx-[64px] py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-green rounded-lg"></div>
          <div>
            <h1 className="text-xl font-bold text-primary-green">KUSHI KRISHI TV</h1>
            <p className="text-xs text-gray-600">ಕೃಷಿ ಕೃಷಿ ಟಿವಿ</p>
          </div>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <a href="/" className="hover:text-primary-green">Home</a>
          <a href="#" className="hover:text-primary-green">News</a>
          <a href="#" className="hover:text-primary-green">Agriculture</a>
          <a href="#" className="hover:text-primary-green">Sandalwood</a>
          <a href="#" className="hover:text-primary-green">Market</a>
          <a href="#" className="hover:text-primary-green">Schemes</a>
          <a href="#" className="hover:text-primary-green">Videos</a>
          <a href="#" className="hover:text-primary-green">Programs</a>
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
