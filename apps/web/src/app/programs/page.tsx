import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

type ProgramItem = { id: string; slug: string; name: string; schedule: string; colorTheme: string };

async function getPrograms(): Promise<ProgramItem[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/programs`, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  return res.json();
}

const colorMap: Record<string, string> = {
  green: '#075B3B', blue: '#1769D5', orange: '#F2B90B', lime: '#73C51D',
};

const gradientMap: Record<string, string> = {
  green: 'linear-gradient(to bottom right, #075B3B, #053D2A)',
  blue: 'linear-gradient(to bottom right, #1769D5, #0F4FA8)',
  orange: 'linear-gradient(to bottom right, #F2B90B, #C99208)',
  lime: 'linear-gradient(to bottom right, #73C51D, #5A9D15)',
};

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <div className="min-h-screen bg-bg-light">
      <Header />
      <main className="mx-[64px] my-8">
        <div className="mb-8">
          <h1 className="text-[30px] font-bold text-gray-900 mb-2">Programs & Shows</h1>
          <p className="text-[14px] text-gray-600">Regular programmes from Kushi Krishi TV</p>
        </div>

        {programs.length === 0 ? (
          <div className="bg-white soft-card rounded-xl p-12 text-center">
            <p className="text-gray-400 text-lg">No programs published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px] mb-12">
            {programs.map((program) => (
              <div key={program.slug} className="bg-white rounded-xl soft-card card-hover overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="h-48 flex items-center justify-center relative" style={{ background: gradientMap[program.colorTheme] || gradientMap['green'] }}>
                  <span className="text-[32px] font-bold text-white/30 text-center px-6">{program.name}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-[20px] font-bold text-gray-900 mb-2">{program.name}</h3>
                  <p className="text-[14px] text-gray-600 mb-4">{program.schedule}</p>
                  <Link href={`/programs/${program.slug}`} className="inline-block px-6 py-2 text-sm font-bold text-dark-green bg-white border-2 border-dark-green rounded-xl hover:bg-dark-green hover:text-white transition-colors">
                    View Program
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}