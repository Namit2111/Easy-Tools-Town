import type { Metadata } from 'next';
import { TOOLS } from '@/lib/constants';
import CategoryToolsPage from '../[category]/page';

export const metadata: Metadata = {
  title: 'Video Tools - Free Online Video Processing | Easy Tools Town',
  description: 'Free online video processing tools. Remove metadata, apply transformations, and add filters to your videos. All processing happens in your browser for maximum privacy.',
  keywords: [
    'video tools',
    'video processing',
    'video deduplication',
    'metadata removal',
    'video transformation',
    'video filters',
    'free online tools',
    'browser-based',
    'privacy-focused',
  ],
  openGraph: {
    title: 'Video Tools - Free Online Video Processing | Easy Tools Town',
    description: 'Free online video processing tools. Remove metadata, apply transformations, and add filters to your videos.',
    type: 'website',
    url: 'https://easytoolstown.com/tools/video',
  },
  twitter: {
    card: 'summary',
    title: 'Video Tools - Free Online Video Processing',
    description: 'Free online video processing tools. Remove metadata, apply transformations, and add filters to your videos.',
  },
};

export default function VideoToolsPage() {
  return <CategoryToolsPage params={Promise.resolve({ category: 'video' })} />;
}