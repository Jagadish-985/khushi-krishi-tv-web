'use client';

import { useState, useEffect } from 'react';

type Article = {
  id: string;
  title: string;
  slug: string;
  body: string;
  category: string;
  isBreakingNews: boolean;
  publishedAt: string;
};

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [articles, setArticles] = useState<Article[]>([]);
  const [form, setForm] = useState({
    title: '', slug: '', body: '', category: '', isBreakingNews: false,
  });
  const [statusMsg, setStatusMsg] = useState('');

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchArticles = async () => {
    const res = await fetch(`${apiUrl}/api/articles`);
    const data = await res.json();
    setArticles(data);
  };

  useEffect(() => {
    if (loggedIn) fetchArticles();
  }, [loggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect password');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg('Publishing...');

    const payload = { ...form, publishedAt: new Date().toISOString() };

    const res = await fetch(`${apiUrl}/api/articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatusMsg('Published successfully!');
      setForm({ title: '', slug: '', body: '', category: '', isBreakingNews: false });
      fetchArticles();
    } else {
      setStatusMsg('Failed to publish. Check required fields.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this article?')) return;
    await fetch(`${apiUrl}/api/articles/${id}`, { method: 'DELETE' });
    fetchArticles();
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAF8]">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-80">
          <h1 className="text-xl font-bold mb-4 text-gray-900">Admin Login</h1>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-3 text-gray-900 placeholder-gray-400"
          />
          {loginError && <p className="text-red-600 text-sm mb-3">{loginError}</p>}
          <button className="w-full bg-[#075B3B] text-white py-2 rounded font-semibold">
            Log In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAF8] px-8 py-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">KKTV Admin — Manage Articles</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-10 max-w-2xl">
        <h2 className="font-semibold mb-4 text-gray-900">Publish New Article</h2>

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 text-gray-900 placeholder-gray-400"
          required
        />
        <input
          placeholder="Slug (e.g. my-article-title)"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 text-gray-900 placeholder-gray-400"
          required
        />
        <input
          placeholder="Category (e.g. Agriculture)"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 text-gray-900 placeholder-gray-400"
          required
        />
        <textarea
          placeholder="Article body"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 h-32 text-gray-900 placeholder-gray-400"
          required
        />
        <label className="flex items-center gap-2 mb-4 text-sm text-gray-800">
          <input
            type="checkbox"
            checked={form.isBreakingNews}
            onChange={(e) => setForm({ ...form, isBreakingNews: e.target.checked })}
          />
          Mark as Breaking News
        </label>

        <button className="bg-[#075B3B] text-white px-4 py-2 rounded font-semibold">
          Publish
        </button>
        {statusMsg && <p className="text-sm mt-2 text-gray-700">{statusMsg}</p>}
      </form>

      <h2 className="font-semibold mb-4 text-gray-900">Existing Articles ({articles.length})</h2>
      <div className="space-y-2 max-w-2xl">
        {articles.map((a) => (
          <div key={a.id} className="bg-white p-3 rounded flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-900">{a.title}</p>
              <p className="text-xs text-gray-500">{a.category}</p>
            </div>
            <button
              onClick={() => handleDelete(a.id)}
              className="text-red-600 text-sm font-semibold"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}