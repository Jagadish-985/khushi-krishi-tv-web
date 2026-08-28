export default function Footer() {
  return (
    <footer className="bg-dark-green text-white">
      <div className="mx-[64px] py-8">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">KUSHI KRISHI TV</h3>
            <p className="text-sm text-gray-300">Your trusted source for agricultural news</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Advertise</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">Agriculture</a></li>
              <li><a href="#" className="hover:text-white">Market</a></li>
              <li><a href="#" className="hover:text-white">Schemes</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
