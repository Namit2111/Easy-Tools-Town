import { Tool, BlogPost } from '../types';

export const TOOLS: Tool[] = [
  // --- PDF ---
  {
    id: 'pdf-base64',
    name: 'PDF to Base64',
    description: 'Convert any PDF file into a Base64 string instantly.',
    instructions: '1. Upload your PDF file.\n2. Click "Convert to Base64".\n3. Download the text file containing the Base64 string.',
    category: 'pdf',
    icon: '🔢',
    path: '/tools/pdf/base64'
  },
  {
    id: 'pdf-info',
    name: 'PDF Inspector',
    description: 'View detailed metadata about your PDF file.',
    instructions: '1. Upload your PDF file.\n2. Click "Inspect PDF".\n3. View file size, type, and last modified date.',
    category: 'pdf',
    icon: 'ℹ️',
    path: '/tools/pdf/info'
  },

  // --- IMAGE ---
  {
    id: 'img-convert',
    name: 'Format Shifter',
    description: 'Convert images between JPG and PNG formats instantaneously.',
    instructions: '1. Upload an image (JPG or PNG).\n2. Select your target format.\n3. Click "Convert" and download the new file.',
    category: 'image',
    icon: '🔄',
    path: '/tools/image/convert'
  },

  // --- DOCX ---
  {
    id: 'docx-base64',
    name: 'DOCX to Base64',
    description: 'Convert DOCX documents to Base64 format.',
    instructions: '1. Upload your DOCX file.\n2. Click "Convert".\n3. Get the Base64 representation of your document.',
    category: 'docx',
    icon: '🧬',
    path: '/tools/docx/base64'
  },
  {
    id: 'docx-info',
    name: 'DOCX Inspector',
    description: 'Analyze your DOCX file metadata.',
    instructions: '1. Upload your DOCX file.\n2. Click "Inspect".\n3. See hidden details about your file.',
    category: 'docx',
    icon: '🧐',
    path: '/tools/docx/info'
  },

  // --- MISC ---
  {
    id: 'misc-json-minify',
    name: 'JSON Minifier',
    description: 'Compress your JSON files by removing whitespace.',
    instructions: '1. Upload your JSON file.\n2. Click "Minify".\n3. Download the compact JSON file.',
    category: 'misc',
    icon: '📦',
    path: '/tools/misc/minify'
  },
  {
    id: 'misc-base64',
    name: 'Universal Base64',
    description: 'Convert absolutely any file to Base64.',
    instructions: '1. Upload any file type.\n2. Click "Convert".\n3. Download the Base64 string.',
    category: 'misc',
    icon: '🔮',
    path: '/tools/misc/base64'
  },
];

export const BLOGS: BlogPost[] = [
  { id: '1', title: 'Why Brutalism is Back', excerpt: 'Web design is getting raw again. Here is why polished gradients are out.', content: 'Detailed content about brutalism...', date: 'Oct 24, 2023', author: 'Max Rough' },
  { id: '2', title: 'Top 5 AI Tools for 2025', excerpt: 'You will not believe what AI can do now. Especially number 3.', content: 'Detailed list of tools...', date: 'Nov 01, 2023', author: 'Sarah Tech' },
  { id: '3', title: 'The Death of the Border-Radius', excerpt: 'Why sharp corners are the future of UI design.', content: 'Rounded corners are so 2020...', date: 'Nov 15, 2023', author: 'Design God' },
];