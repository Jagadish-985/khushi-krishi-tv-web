'use client';

/*
 * More Page — long scrollable page with 4 sections.

/*
 * More Page — long scrollable page with 4 sections.
 * Each section has scroll-mt-24 so the sticky header doesn't cover the top
 * of the section when jumped to via an anchor link.
 */
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MorePage() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="px-16 py-10 space-y-24">

        {/* SECTION 1: About */}
        <section id="about" className="scroll-mt-24">
          <h1 className="text-3xl font-bold">About Kushi Krishi TV</h1>
          <p className="text-gray-500 mt-1 mb-8">A trusted agriculture-first media platform for Karnataka</p>

          <div className="grid grid-cols-2 gap-8 items-start">
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
                {['Agriculture', 'Sandalwood', 'Markets', 'Government Schemes'].map((tag) => (
                  <span key={tag} className="border border-primary-green text-primary-green text-sm font-medium text-center px-4 py-2 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-16 mb-6">Why Kushi Krishi TV</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { title: 'Field-first reporting', desc: 'Stories and information grounded in real farming communities.' },
              { title: 'Local language access', desc: 'English and Kannada content designed for wider reach.' },
              { title: 'Practical expert guidance', desc: 'Actionable advice from farmers, experts and institutions.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-lg p-6">
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: Terms & Conditions */}
        <section id="terms" className="scroll-mt-24">
          <h1 className="text-3xl font-bold">Terms &amp; Conditions</h1>
          <p className="text-gray-500 mt-1 mb-6">Last updated: August 2026</p>
          <div className="bg-white rounded-lg p-8 space-y-6">
            {[
              'Use of the Website',
              'Content & Accuracy',
              'Intellectual Property',
              'External Links',
              'Limitation of Liability',
              'Changes to Terms',
            ].map((title, i) => (
              <div key={title}>
                <h3 className="font-bold">{i + 1}. {title}</h3>
                <p className="text-gray-500 text-sm mt-1">
                  These terms define acceptable use of Kushi Krishi TV content and services. Users should review the complete terms before relying on information published on the platform.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Privacy Policy */}
        <section id="privacy" className="scroll-mt-24">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-gray-500 mt-1 mb-6">Last updated: August 2026</p>
          <div className="bg-white rounded-lg p-8 space-y-6">
            {[
              'Information We Collect',
              'How We Use Information',
              'Cookies & Analytics',
              'Sharing & Disclosure',
              'Your Choices',
              'Contact',
            ].map((title, i) => (
              <div key={title}>
                <h3 className="font-bold">{i + 1}. {title}</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Kushi Krishi TV uses information responsibly to operate the website, improve content, understand audience needs and communicate relevant updates. This section contains the detailed policy text for this topic.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: Contact Us */}
        <section id="contact" className="scroll-mt-24">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="text-gray-500 mt-1 mb-6">Reach the Kushi Krishi TV team</p>

          <div className="grid grid-cols-2 gap-6 items-start">
            <div className="bg-white rounded-lg p-6">
              <h2 className="font-bold text-lg mb-4">Send us a message</h2>
              {/* Placeholder form — does not submit anywhere yet. No backend endpoint exists for this. */}
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Name</label>
                  <input type="text" placeholder="Your name" className="w-full border rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Email</label>
                  <input type="email" placeholder="you@example.com" className="w-full border rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Subject</label>
                  <input type="text" placeholder="What is this about?" className="w-full border rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Message</label>
                  <textarea rows={4} className="w-full border rounded-lg px-3 py-2 text-sm"></textarea>
                </div>
                <button type="submit" className="bg-primary-green text-white font-semibold px-5 py-2 rounded-lg">
                  Send Message
                </button>
              </form>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h2 className="font-bold text-lg mb-4">Kushi Krishi TV</h2>
              <p className="text-primary-green font-semibold text-sm">Editorial &amp; General Enquiries</p>
              <p className="text-gray-600 text-sm mb-4">hello@kushikrishitv.com</p>

              <p className="text-primary-green font-semibold text-sm">Advertising &amp; Partnerships</p>
              <p className="text-gray-600 text-sm mb-4">partners@kushikrishitv.com</p>

              <p className="text-primary-green font-semibold text-sm">Office</p>
              <p className="text-gray-600 text-sm mb-4">Bengaluru, Karnataka, India</p>

              <p className="text-primary-green font-semibold text-sm mb-2">Follow us</p>
              <div className="flex gap-3 text-gray-600">
                <span>FB</span><span>IG</span><span>YT</span><span>X</span>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}