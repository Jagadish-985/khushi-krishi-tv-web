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
    <div className="bg-background min-h-screen">
      <Header />
      <main className="px-16 py-10">
        <h1 className="text-3xl font-bold">Terms &amp; Conditions</h1>
        <p className="text-gray-500 mt-1 mb-6">Last updated: August 2026</p>
        <div className="bg-white rounded-lg p-8 space-y-6 max-w-3xl">
          {sections.map((title, i) => (
            <div key={title}>
              <h3 className="font-bold">{i + 1}. {title}</h3>
              <p className="text-gray-500 text-sm mt-1">
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