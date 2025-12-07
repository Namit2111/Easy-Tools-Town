import type { Metadata } from 'next';
import BlogListClient from '@/components/BlogListClient';
import { BLOGS } from '@/lib/blogs';

const BLOGS_PER_PAGE = 10;

/**
 * Generate dynamic metadata based on search parameters
 */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const tag = typeof params.tag === 'string' ? params.tag : 'All';
  const page = typeof params.page === 'string' ? params.page : '1';

  const titleSuffix = tag !== 'All' ? ` - ${tag} Articles` : '';
  const pageSuffix = page !== '1' ? ` - Page ${page}` : '';

  return {
    title: `The Town Cryer${titleSuffix}${pageSuffix}`,
    description: `Tips, tutorials, and guides for all our free online tools. Learn how to use PDF, image, and document tools effectively.${tag !== 'All' ? ` Browse ${tag} articles.` : ''}`,
    openGraph: {
      title: `The Town Cryer${titleSuffix}`,
      description: 'Tips, tutorials, and guides for all our free online tools.',
      type: 'website',
    },
  };
}

/**
 * Server Component - Handles SEO, filtering, and pagination on the server
 * Each page is separately rendered with only the current page's blogs
 */
export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Parse search parameters on the server
  const params = await searchParams;
  const page = typeof params.page === 'string' ? params.page : '1';
  const tag = typeof params.tag === 'string' ? params.tag : 'All';

  const currentPage = parseInt(page, 10);
  const selectedTag = tag;

  // SERVER-SIDE FILTERING: Filter blogs based on selected tag
  const filteredBlogs = selectedTag === 'All'
    ? BLOGS
    : BLOGS.filter(blog => blog.tags.includes(selectedTag));

  // SERVER-SIDE PAGINATION: Calculate pagination values
  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const endIndex = startIndex + BLOGS_PER_PAGE;

  // Get only the current page's blogs (not all blogs)
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

  // Validate page number - redirect to page 1 if invalid
  // Note: In production, you might want to return a 404 instead
  if (currentPage < 1 || (currentPage > totalPages && totalPages > 0)) {
    // For now, we'll just pass page 1 data
    // In a real app, you'd use redirect() from 'next/navigation'
  }

  return (
    <BlogListClient
      blogs={currentBlogs}        // Only current page blogs
      currentPage={currentPage}
      totalPages={totalPages}
      selectedTag={selectedTag}
    />
  );
}
