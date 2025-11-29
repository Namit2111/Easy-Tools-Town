import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import NeoCard from '../components/NeoCard';
import NeoButton from '../components/NeoButton';
import { BLOGS } from '../data/blogs';
import { parseMarkdown, getReadingTime } from '../utils/markdown';

export const BlogList = () => {
  useEffect(() => {
    document.title = 'Blog - Easy Tools Town | Tips, Tutorials & Tool Guides';
  }, []);

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
        <Link to={`/blog/${post.slug}`} key={post.id} className="block group">
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
};

export const BlogPostView = () => {
  const { slug } = useParams();
  const post = BLOGS.find(b => b.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Easy Tools Town Blog`;
      
      // Update meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', post.description);
      
      // Update OG tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', post.title);
      
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', post.description);
    }
  }, [post]);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-8 min-h-screen text-black">
        <NeoCard className="text-center p-12">
          <div className="text-5xl mb-4">📭</div>
          <h1 className="text-2xl font-black uppercase mb-4">Post Not Found</h1>
          <p className="mb-6">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <NeoButton>← Back to Blog</NeoButton>
          </Link>
        </NeoCard>
      </div>
    );
  }

  const htmlContent = parseMarkdown(post.content);

  return (
    <div className="max-w-4xl mx-auto p-8 min-h-screen text-black">
      <Link to="/blog">
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
              <Link to={`/tools/${post.relatedTool}`}>
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
            <Link to={`/blog/${p.slug}`} key={p.id}>
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
};
