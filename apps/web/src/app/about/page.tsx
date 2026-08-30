import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="px-16 py-10">
        <h1 className="text-3xl font-bold">About Kushi Krishi TV</h1>
        <p className="text-gray-500 mt-1 mb-8">A trusted agriculture-first media platform for Karnataka</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          <div className="bg-[#D9E8DD] h-80 rounded-lg flex items-center justify-center text-gray-600 text-center px-4">
            Kushi Krishi TV newsroom / field team
          </div>
          <div>
            <h2 className="font-bold text-lg">Our Mission</h2>
            <p className="text-gray-600 mt-2">
              Make reliable agricultural information accessible, timely and useful for farmers, families and rural communities.
            </p>

            <h2 className="font-bold text-lg mt-8">What we cover</h2>
            <div className="grid grid-cols-2 gap-3 mt-3 max-w-sm">
              <span className="border border-primary-green text-primary-green text-sm font-medium text-center px-4 py-2 rounded-full">
                Agriculture
              </span>
              <span className="border border-primary-green text-primary-green text-sm font-medium text-center px-4 py-2 rounded-full">
                Sandalwood
              </span>
              <span className="border border-primary-green text-primary-green text-sm font-medium text-center px-4 py-2 rounded-full">
                Markets
              </span>
              <span className="border border-primary-green text-primary-green text-sm font-medium text-center px-4 py-2 rounded-full">
                Government Schemes
              </span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-16 mb-6">Why Kushi Krishi TV</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-bold">Field-first reporting</h3>
            <p className="text-gray-500 text-sm mt-2">Stories and information grounded in real farming communities.</p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-bold">Local language access</h3>
            <p className="text-gray-500 text-sm mt-2">English and Kannada content designed for wider reach.</p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-bold">Practical expert guidance</h3>
            <p className="text-gray-500 text-sm mt-2">Actionable advice from farmers, experts and institutions.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}