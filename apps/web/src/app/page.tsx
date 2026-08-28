export default async function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined in .env.local');
  }

  const res = await fetch(`${apiUrl}/api/articles`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }

  const articles = await res.json();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          KKTV API Connectivity Test
        </h1>
        <p className="text-gray-600 mb-6">
          Fetched from: <code className="bg-gray-200 px-2 py-1 rounded">{apiUrl}/api/articles</code>
        </p>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Articles Response:</h2>
          <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
            {JSON.stringify(articles, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
