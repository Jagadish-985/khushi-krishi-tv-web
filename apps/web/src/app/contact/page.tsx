'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="px-16 py-10">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-gray-500 mt-1 mb-6">Reach the Kushi Krishi TV team</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
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
      </main>
      <Footer />
    </div>
  );
}