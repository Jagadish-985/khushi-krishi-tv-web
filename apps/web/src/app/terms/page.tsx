import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  const sections = [
    'Use of the Website',
    'Content & Accuracy',
    'Intellectual Property',
    'External Links',
    'Limitation of Liability',
    'Changes to Terms',
  ];

  return (
    <div className="bg-bg-light min-h-screen">
      <Header />
      <main className="px-4 sm:px-8 lg:px-16 py-6 sm:py-8 lg:py-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Terms &amp; Conditions</h1>
        <p className="text-gray-500 mt-1 mb-6">Last updated: August 2026</p>
        <div className="bg-white rounded-2xl soft-card p-8 space-y-6 max-w-3xl border border-gray-100">
          {sections.map((title, i) => (
            <div key={title}>
              <h3 className="font-bold text-lg">{i + 1}. {title}</h3>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                These terms define acceptable use of Kushi Krishi TV content and services. Users should review the complete terms before relying on information published on the platform.
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}