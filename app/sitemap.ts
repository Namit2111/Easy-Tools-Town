import { MetadataRoute } from 'next';
import { TOOLS } from '@/lib/constants';
import { BLOGS } from '@/lib/blogs';

const BASE_URL = 'https://easytoolstown.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];

  // Category pages
  const categories = ['pdf', 'image', 'docx', 'misc'];
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/tools/${category}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Tool pages - generate from TOOLS array
  const toolPages: MetadataRoute.Sitemap = TOOLS.map((tool) => {
    // Determine priority based on tool popularity/category
    let priority = 0.7;
    if (tool.category === 'pdf' && (tool.id === 'pdf-merge' || tool.id === 'pdf-page-count')) {
      priority = 0.9;
    } else if (tool.category === 'image' && (tool.id === 'img-compress' || tool.id === 'img-resize')) {
      priority = 0.9;
    } else if (tool.category === 'misc' && (tool.id === 'misc-uuid' || tool.id === 'misc-password' || tool.id === 'misc-lorem')) {
      priority = 0.8;
    } else if (tool.category === 'docx' && tool.id === 'docx-word-count') {
      priority = 0.8;
    }

    return {
      url: `${BASE_URL}${tool.path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority,
    };
  });

  // Blog post pages - generate from BLOGS array
  const blogPages: MetadataRoute.Sitemap = BLOGS.map((blog) => {
    // Determine priority based on blog topic
    let priority = 0.7;
    if (blog.tags.includes('Tutorial') && (blog.slug.includes('merge') || blog.slug.includes('compress') || blog.slug.includes('uuid'))) {
      priority = 0.8;
    }

    return {
      url: `${BASE_URL}/blog/${blog.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority,
    };
  });

  return [...mainPages, ...categoryPages, ...toolPages, ...blogPages];
}

