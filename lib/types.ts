export interface Tool {
  id: string;
  name: string;
  description: string;
  instructions: string;
  category: 'pdf' | 'image' | 'misc' | 'docx';
  icon: string;
  path: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
  relatedTool?: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

