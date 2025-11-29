export interface Tool {
  id: string;
  name: string;
  description: string;
  instructions: string; // New field for tutorial/guide
  category: 'pdf' | 'image' | 'misc' | 'docx';
  icon: string;
  path: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string; // SEO description
  excerpt: string;
  content: string; // Markdown content
  date: string;
  author: string;
  tags: string[];
  relatedTool?: string; // Tool ID if related to a specific tool
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}