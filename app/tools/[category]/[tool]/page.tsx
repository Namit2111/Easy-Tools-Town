import type { Metadata } from 'next';
import { TOOLS } from '@/lib/constants';
import ToolClient from './ToolClient';

interface Props {
  params: Promise<{ category: string; tool: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, tool } = await params;
  const toolData = TOOLS.find(t => t.path === `/tools/${category}/${tool}`);

  if (!toolData) {
    return {
      title: 'Tool Not Found',
      description: 'The requested tool could not be found.',
    };
  }

  return {
    title: `${toolData.name} - Free Online Tool`,
    description: `${toolData.description} Free, fast, and secure. No login required. Process files entirely in your browser.`,
    keywords: [
      toolData.name.toLowerCase(),
      toolData.category,
      'free online tool',
      'browser-based',
      'no login required',
      'privacy-focused',
    ],
    openGraph: {
      title: `${toolData.name} - Free Online Tool | Easy Tools Town`,
      description: toolData.description,
      type: 'website',
      url: `https://easytoolstown.com${toolData.path}`,
    },
    twitter: {
      card: 'summary',
      title: `${toolData.name} - Free Online Tool`,
      description: toolData.description,
    },
  };
}

export default function ToolPage({ params }: Props) {
  return <ToolClient params={params} />;
}
