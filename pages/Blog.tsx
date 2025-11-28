import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NeoCard from '../components/NeoCard';
import NeoButton from '../components/NeoButton';
import { BLOGS } from '../data/constants';

export const BlogList = () => (
  <div className="max-w-4xl mx-auto p-8 min-h-screen space-y-8 text-black">
    <div className="bg-black text-white p-4 text-center border-4 border-black">
      <h1 className="text-4xl font-bold uppercase">The Town Cryer</h1>
    </div>
    {BLOGS.map(post => (
      <Link to={`/blog/${post.id}`} key={post.id} className="block">
        <NeoCard title={post.title} className="hover:bg-gray-50 transition-colors">
          <p className="text-sm font-mono mb-2 border-b-2 border-black inline-block">{post.date} // {post.author}</p>
          <p className="text-lg">{post.excerpt}</p>
        </NeoCard>
      </Link>
    ))}
  </div>
);

export const BlogPostView = () => {
  // Mock routing param usage
  const id = useLocation().pathname.split('/').pop();
  const post = BLOGS.find(b => b.id === id);

  if (!post) return <div className="p-8 text-black">Post not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 min-h-screen text-black">
      <NeoButton onClick={() => window.history.back()} className="mb-4">← Back</NeoButton>
      <NeoCard title={post.title} color="bg-white">
        <div className="flex justify-between items-center border-b-2 border-black pb-4 mb-4">
          <span className="font-bold">{post.author}</span>
          <span className="font-mono">{post.date}</span>
        </div>
        <div className="prose prose-lg max-w-none text-black">
          <p>{post.content}</p>
          <p className="mt-4 italic text-gray-600">More content would be here in a real database implementation.</p>
        </div>
      </NeoCard>
    </div>
  );
};