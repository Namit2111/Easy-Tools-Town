'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import NeoCard from '@/components/NeoCard';
import Pagination from '@/components/Pagination';
import { BlogPost } from '@/lib/types';
import { getReadingTime } from '@/lib/markdown';

interface BlogListClientProps {
    currentPage: number;
    totalPages: number;
    selectedTag: string;
    blogs: BlogPost[];
}

export default function BlogListClient({ currentPage, totalPages, selectedTag, blogs }: BlogListClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // No need for client-side filtering or pagination - all handled on server
    // The 'blogs' prop already contains only the current page's filtered blogs

    // Validate page number
    useEffect(() => {
        if (currentPage < 1 || currentPage > totalPages) {
            const params = new URLSearchParams(searchParams.toString());
            params.set('page', '1');
            router.push(`/blog?${params.toString()}`);
        }
    }, [currentPage, totalPages, router, searchParams]);

    // Handle tag click
    const handleTagClick = (tag: string) => {
        const params = new URLSearchParams();
        params.set('tag', tag);
        params.set('page', '1');
        router.push(`/blog?${params.toString()}`);
    };

    // Handle page change
    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`/blog?${params.toString()}`);
    };

    return (
        <div className="max-w-4xl mx-auto p-8 min-h-screen space-y-6 text-black">
            {/* Header */}
            <div className="bg-black text-white p-6 text-center border-3 border-black neo-shadow">
                <h1 className="text-3xl font-bold uppercase">The Town Cryer</h1>
                <p className="mt-2 text-gray-300">Tips, tutorials, and guides for all our tools</p>
            </div>

            {/* Tags filter */}
            <div className="flex flex-wrap gap-2">
                {['All', 'PDF', 'Image', 'DOCX', 'Misc', 'Tips'].map(tag => (
                    <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`
              px-3 py-1 border-2 border-black font-bold text-sm 
              transition-all neo-shadow hover:neo-shadow-active
              ${selectedTag === tag
                                ? 'bg-[#fdffb6] text-black'
                                : 'bg-white hover:bg-gray-100'
                            }
            `}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Blog posts for current page */}
            {blogs.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">No blogs found for this filter.</p>
                </div>
            ) : (
                <>
                    {blogs.map(post => (
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

                    {/* Pagination Controls */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
}
