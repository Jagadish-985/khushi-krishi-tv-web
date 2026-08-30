'use client';

import { useState, useEffect } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL;

type FieldDef = {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'checkbox';
};

type ContentType = {
  key: string;
  label: string;
  endpoint: string;
  fields: FieldDef[];
  titleField: string;
  subtitleField: string;
};

const CONTENT_TYPES: ContentType[] = [
  {
    key: 'articles',
    label: 'Articles',
    endpoint: 'articles',
    titleField: 'title',
    subtitleField: 'category',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'category', label: 'Category', type: 'text' },
      { key: 'body', label: 'Body', type: 'textarea' },
      { key: 'isBreakingNews', label: 'Mark as Breaking News', type: 'checkbox' },
    ],
  },
  {
    key: 'categories',
    label: 'Categories',
    endpoint: 'categories',
    titleField: 'name',
    subtitleField: 'slug',
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'slug', label: 'Slug', type: 'text' },
    ],
  },
  {
    key: 'schemes',
    label: 'Schemes',
    endpoint: 'schemes',
    titleField: 'name',
    subtitleField: 'description',
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
  },
  {
    key: 'videos',
    label: 'Videos',
    endpoint: 'videos',
    titleField: 'title',
    subtitleField: 'category',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'duration', label: 'Duration (e.g. 8:32)', type: 'text' },
      { key: 'views', label: 'Views (e.g. 1.2K)', type: 'text' },
      { key: 'category', label: 'Category', type: 'text' },
    ],
  },
  {
    key: 'programs',
    label: 'Programs',
    endpoint: 'programs',
    titleField: 'name',
    subtitleField: 'schedule',
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'schedule', label: 'Schedule (e.g. Mon-Fri, 7:00 PM)', type: 'text' },
      { key: 'colorTheme', label: 'Color theme (green/blue/orange/lime)', type: 'text' },
    ],
  },
];

function emptyForm(fields: FieldDef[]) {
  const obj: Record<string, any> = {};
  fields.forEach((f) => {
    obj[f.key] = f.type === 'checkbox' ? false : '';
  });
  return obj;
}

function ManagePanel({ type }: { type: ContentType }) {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<Record<string, any>>(emptyForm(type.fields));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState('');

  const fetchItems = async () => {
    const res = await fetch(`${API}/api/${type.endpoint}`);
    if (res.ok) {
      setItems(await res.json());
    }
  };

  useEffect(() => {
    fetchItems();
  }, [type.key]);

  const startEdit = (item: any) => {
    setEditingId(item.id);
    const populated: Record<string, any> = {};
    type.fields.forEach((f) => {
      populated[f.key] = item[f.key] ?? (f.type === 'checkbox' ? false : '');
    });
    setForm(populated);
    setStatusMsg('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm(type.fields));
    setStatusMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(editingId ? 'Updating...' : 'Publishing...');

    const payload = { ...form };
    if (type.key === 'articles') {
      payload.publishedAt = new Date().toISOString();
    }

    const url = editingId
      ? `${API}/api/${type.endpoint}/${editingId}`
      : `${API}/api/${type.endpoint}`;
    const method = editingId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatusMsg(editingId ? 'Updated successfully!' : 'Published successfully!');
      cancelEdit();
      fetchItems();
    } else {
      setStatusMsg('Failed. Check required fields.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    await fetch(`${API}/api/${type.endpoint}/${id}`, { method: 'DELETE' });
    fetchItems();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-10 max-w-2xl">
        <h2 className="font-semibold mb-4 text-gray-900">
          {editingId ? `Edit ${type.label.slice(0, -1)}` : `Add New ${type.label.slice(0, -1)}`}
        </h2>

        {type.fields.map((f) =>
          f.type === 'checkbox' ? (
            <label key={f.key} className="flex items-center gap-2 mb-4 text-sm text-gray-800">
              <input
                type="checkbox"
                checked={!!form[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.checked })}
              />
              {f.label}
            </label>
          ) : f.type === 'textarea' ? (
            <textarea
              key={f.key}
              placeholder={f.label}
              value={form[f.key]}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3 h-28 text-gray-900 placeholder-gray-400"
              required
            />
          ) : (
            <input
              key={f.key}
              placeholder={f.label}
              value={form[f.key]}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3 text-gray-900 placeholder-gray-400"
              required
            />
          )
        )}

        <div className="flex gap-2">
          <button className="bg-[#075B3B] text-white px-4 py-2 rounded font-semibold">
            {editingId ? 'Update' : 'Publish'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded font-semibold"
            >
              Cancel
            </button>
          )}
        </div>

        {statusMsg && <p className="text-sm mt-2 text-gray-700">{statusMsg}</p>}
      </form>

      <h2 className="font-semibold mb-4 text-gray-900">
        Existing {type.label} ({items.length})
      </h2>

      <div className="space-y-2 max-w-2xl">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-3 rounded flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-900">{item[type.titleField]}</p>
              <p className="text-xs text-gray-500">{item[type.subtitleField]}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => startEdit(item)} className="text-blue-600 text-sm font-semibold">
                Edit
              </button>
              <button onClick={() => handleDelete(item.id)} className="text-red-600 text-sm font-semibold">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsPanel() {
  const [settings, setSettings] = useState<any>(null);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    fetch(`${API}/api/sitesettings`)
      .then((r) => r.json())
      .then(setSettings);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg('Saving...');

    const res = await fetch(`${API}/api/sitesettings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });

    setStatusMsg(res.ok ? 'Saved!' : 'Failed to save.');
  };

  if (!settings) {
    return <p className="text-gray-500">Loading settings...</p>;
  }

  return (
    <form onSubmit={handleSave} className="bg-white p-6 rounded-lg shadow-sm max-w-2xl">
      <h2 className="font-semibold mb-4 text-gray-900">Site Settings</h2>

      <label className="block text-sm text-gray-700 mb-1">Site Name</label>
      <input
        value={settings.siteName}
        onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-3 text-gray-900"
      />

      <label className="block text-sm text-gray-700 mb-1">Tagline</label>
      <input
        value={settings.tagline}
        onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-3 text-gray-900"
      />

      <label className="block text-sm text-gray-700 mb-1">Footer Text</label>
      <textarea
        value={settings.footerText}
        onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-3 h-20 text-gray-900"
      />

      <label className="block text-sm text-gray-700 mb-1">Hero Image URL</label>
      <input
        value={settings.heroImageUrl}
        onChange={(e) => setSettings({ ...settings, heroImageUrl: e.target.value })}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-3 text-gray-900"
      />

      <button className="bg-[#075B3B] text-white px-4 py-2 rounded font-semibold">
        Save Settings
      </button>

      {statusMsg && <p className="text-sm mt-2 text-gray-700">{statusMsg}</p>}
    </form>
  );
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<string>(CONTENT_TYPES[0].key);

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
    <div className="min-h-screen bg-[#F8FAF8] px-4 sm:px-8 py-6 sm:py-8 lg:py-10">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900">KKTV Admin — Content Management</h1>

      <div className="flex gap-2 mb-8">
        {CONTENT_TYPES.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 text-sm font-semibold rounded-full ${
              activeTab === t.key
                ? 'bg-[#075B3B] text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            {t.label}
          </button>
        ))}

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 text-sm font-semibold rounded-full ${
            activeTab === 'settings'
              ? 'bg-[#075B3B] text-white'
              : 'bg-white text-gray-700 border border-gray-300'
          }`}
        >
          Settings
        </button>
      </div>

      {activeTab === 'settings' ? (
        <SettingsPanel />
      ) : (
        <ManagePanel
          key={activeTab}
          type={CONTENT_TYPES.find((t) => t.key === activeTab)!}
        />
      )}
    </div>
  );
}