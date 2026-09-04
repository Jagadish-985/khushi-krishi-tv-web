import Link from 'next/link';

interface ArticleCardProps {
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
}

export default function ArticleCard({ title, slug, category, publishedAt }: ArticleCardProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Link
      href={`/articles/${slug}`}
      className="flex gap-3 py-4 px-3 -mx-3 rounded-lg border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-all block"
    >
      <div className="flex-1">
        <div className="mb-2">
          <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-bright-green/10 text-dark-green">
            {category}
          </span>
        </div>
        <h3 className="text-sm font-bold text-gray-900 leading-snug mb-1.5">
          {title}
        </h3>
        <p className="text-xs text-gray-500">{formattedDate}</p>
      </div>
    </Link>
  );
}
