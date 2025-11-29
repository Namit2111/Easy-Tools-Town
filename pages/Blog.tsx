import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NeoCard from '../components/NeoCard';
import NeoButton from '../components/NeoButton';
import { BLOGS } from '../data/constants';

export const BlogList = () => (
  <div className="max-w-3xl mx-auto p-6 min-h-screen space-y-4 text-black">
    <div className="bg-black text-white p-3 text-center border-2 border-black">
      <h1 className="text-lg font-bold uppercase">The Town Cryer</h1>
    </div>
    {BLOGS.map(post => (
      <Link to={`/blog/${post.id}`} key={post.id} className="block">
        <NeoCard title={post.title} className="hover:bg-gray-50 transition-colors">
          <p className="text-xs font-mono mb-1.5 border-b border-black inline-block">{post.date} // {post.author}</p>
          <p className="text-sm">{post.excerpt}</p>
        </NeoCard>
      </Link>
    ))}
  </div>
);

export const BlogPostView = () => {
  // Mock routing param usage
  const id = useLocation().pathname.split('/').pop();
  const post = BLOGS.find(b => b.id === id);

  if (!post) return <div className="p-6 text-sm text-black">Post not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen text-black">
      <NeoButton onClick={() => window.history.back()} className="mb-3 text-xs">← Back</NeoButton>
      <NeoCard title={post.title} color="bg-white">
        <div className="flex justify-between items-center border-b border-black pb-2 mb-3 text-xs">
          <span className="font-bold">{post.author}</span>
          <span className="font-mono">{post.date}</span>
        </div>
        <div className="prose prose-sm max-w-none text-black text-sm">
          <p>{post.content}</p>
          <p className="mt-3 italic text-gray-600 text-xs">More content would be here in a real database implementation.</p>
        </div>
      </NeoCard>
    </div>
  );
};