import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import NeoCard from '@/components/NeoCard';
import NeoButton from '@/components/NeoButton';
import { BLOGS } from '@/lib/blogs';
import { parseMarkdown, getReadingTime } from '@/lib/markdown';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOGS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOGS.find(b => b.slug === slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOGS.find(b => b.slug === slug);

  if (!post) {
    notFound();
  }

  const htmlContent = parseMarkdown(post.content);

  return (
    <div className="max-w-4xl mx-auto p-8 min-h-screen text-black">
      <Link href="/blog">
        <NeoButton className="mb-6">← Back to Blog</NeoButton>
      </Link>
      
      <article>
        <NeoCard color="bg-white">
          {/* Header */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-[#fdffb6] border-2 border-black text-xs font-bold uppercase">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-black uppercase mb-4">{post.title}</h1>
            <div className="flex flex-wrap justify-between items-center border-b-2 border-black pb-4 text-sm">
              <div>
                <span className="font-bold">{post.author}</span>
                <span className="mx-2">•</span>
                <span className="font-mono">{post.date}</span>
              </div>
              <span className="font-bold">{getReadingTime(post.content)} min read</span>
            </div>
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Related Tool CTA */}
          {post.relatedTool && (
            <div className="mt-8 p-6 bg-[#caffbf] border-2 border-black">
              <h3 className="font-black uppercase mb-2">Try This Tool Now!</h3>
              <p className="mb-4">Ready to put this into practice? Try our free online tool.</p>
              <Link href={`/tools/${post.relatedTool}`}>
                <NeoButton variant="primary">Open Tool →</NeoButton>
              </Link>
            </div>
          )}
        </NeoCard>
      </article>

      {/* More Posts */}
      <div className="mt-12">
        <h3 className="text-xl font-black uppercase mb-4 border-b-2 border-black inline-block">More Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {BLOGS.filter(p => p.id !== post.id).slice(0, 2).map(p => (
            <Link href={`/blog/${p.slug}`} key={p.id}>
              <div className="bg-white border-2 border-black p-4 hover:bg-gray-50 transition-all">
                <h4 className="font-bold uppercase">{p.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{p.excerpt.substring(0, 80)}...</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

