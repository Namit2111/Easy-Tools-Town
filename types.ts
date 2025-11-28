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
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}