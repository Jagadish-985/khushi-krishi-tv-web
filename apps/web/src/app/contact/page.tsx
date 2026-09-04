'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <div className="bg-bg-light min-h-screen">
      <Header />
      <main className="px-4 sm:px-8 lg:px-16 py-6 sm:py-8 lg:py-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Contact Us</h1>
        <p className="text-gray-500 mt-1 mb-6">Reach the Kushi Krishi TV team</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-start">
          <div className="bg-white rounded-2xl soft-card card-hover p-6 border border-gray-100">
            <h2 className="font-bold text-lg tracking-tight mb-4">Send us a message</h2>
            {/* Placeholder form — does not submit anywhere yet. No backend endpoint exists for this. */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">Name</label>
                <input type="text" placeholder="Your name" className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 placeholder:text-gray-400" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Email</label>
                <input type="email" placeholder="you@example.com" className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 placeholder:text-gray-400" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Subject</label>
                <input type="text" placeholder="What is this about?" className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 placeholder:text-gray-400" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Message</label>
                <textarea rows={4} placeholder="Your message..." className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 placeholder:text-gray-400"></textarea>
              </div>
              <button type="submit" className="bg-primary-green text-white font-semibold shadow-sm hover:shadow-md hover:bg-dark-green px-5 py-2 rounded-xl transition-all">
                Send Message
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl soft-card card-hover p-6 border border-gray-100">
            <h2 className="font-bold text-lg tracking-tight mb-4">Kushi Krishi TV</h2>
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
      </main>
      <Footer />
    </div>
  );
}