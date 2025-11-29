import type { Metadata } from 'next';
import Link from 'next/link';
import NeoCard from '@/components/NeoCard';
import { BLOGS } from '@/lib/blogs';
import { getReadingTime } from '@/lib/markdown';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tips, tutorials, and guides for all our free online tools. Learn how to use PDF, image, and document tools effectively.',
};

export default function BlogListPage() {
  return (
    <div className="max-w-4xl mx-auto p-8 min-h-screen space-y-6 text-black">
      <div className="bg-black text-white p-6 text-center border-3 border-black neo-shadow">
        <h1 className="text-3xl font-bold uppercase">The Town Cryer</h1>
        <p className="mt-2 text-gray-300">Tips, tutorials, and guides for all our tools</p>
      </div>

      {/* Tags filter */}
      <div className="flex flex-wrap gap-2">
        {['All', 'PDF', 'Image', 'DOCX', 'Misc', 'Tips'].map(tag => (
          <span key={tag} className="px-3 py-1 bg-white border-2 border-black font-bold text-sm cursor-pointer hover:bg-black hover:text-white transition-all">
            {tag}
          </span>
        ))}
      </div>

      {BLOGS.map(post => (
        <Link href={`/blog/${post.slug}`} key={post.id} className="block group">
          <NeoCard className="hover:bg-gray-50 transition-all group-hover:-translate-y-1">
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-[#fdffb6] border border-black text-xs font-bold uppercase">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-black uppercase mb-2 group-hover:underline">{post.title}</h2>
            <p className="text-gray-600 mb-3">{post.excerpt}</p>
            <div className="flex justify-between items-center text-sm">
              <span className="font-mono">{post.date} • {post.author}</span>
              <span className="font-bold">{getReadingTime(post.content)} min read</span>
            </div>
          </NeoCard>
        </Link>
      ))}
    </div>
  );
}

