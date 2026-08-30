import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Scheme = { id: string; name: string; description: string };

async function getSchemes(): Promise<Scheme[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schemes`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function SchemesPage() {
  const schemes = await getSchemes();

  return (
    <div className="min-h-screen bg-bg-light">
      <Header />
      <main className="mx-[64px] my-8">
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-gray-900 mb-2">Government Schemes</h1>
          <p className="text-[14px] text-gray-600">
            Find benefits, subsidies and support programmes relevant to farmers
          </p>
        </div>

        {schemes.length === 0 ? (
          <p className="text-gray-500">No schemes published yet.</p>
        ) : (
          <div className="grid grid-cols-3 gap-[24px] mb-12">
            {schemes.map((scheme, index) => (
              <div key={scheme.id} className="bg-white rounded-lg p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-dark-green text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <h3 className="text-[18px] font-bold text-gray-900">{scheme.name}</h3>
                </div>
                <p className="text-[14px] text-gray-600">{scheme.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}