import { Tool, BlogPost } from '../types';

export const TOOLS: Tool[] = [
  // --- PDF ---
  {
    id: 'pdf-plan',
    name: 'PDF Structure Architect',
    description: 'Generate a professional Table of Contents for your next PDF ebook.',
    instructions: '1. Enter the main topic of your ebook.\n2. Click "Generate Structure".\n3. Copy the numbered list to use as your Table of Contents.',
    category: 'pdf',
    icon: '📐',
    path: '/tools/pdf/plan'
  },
  {
    id: 'pdf-rewrite',
    name: 'PDF Content Polisher',
    description: 'Rewrite your rough drafts into professional PDF-ready content.',
    instructions: '1. Paste your rough draft text into the box.\n2. Hit "Rewrite".\n3. The AI will polish the tone to be more professional and concise suitable for reports.',
    category: 'pdf',
    icon: '📝',
    path: '/tools/pdf/rewrite'
  },
  {
    id: 'pdf-text',
    name: 'PDF Text Extractor',
    description: 'Extract raw text from PDF files using AI vision.',
    instructions: '1. Upload your PDF file.\n2. Click "Extract Text".\n3. Download the text file containing the content.',
    category: 'pdf',
    icon: '📄',
    path: '/tools/pdf/extract'
  },
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
    id: 'img-gen',
    name: 'Pixel Forger',
    description: 'Generate images from text prompts using AI.',
    instructions: '1. Type a detailed description of the image you want.\n2. Click "Forging".\n3. Wait for the AI to generate your unique image and download it.',
    category: 'image',
    icon: '🎨',
    path: '/tools/image/gen'
  },
  {
    id: 'img-cap',
    name: 'Vision Interpreter',
    description: 'Upload an image and get a detailed description.',
    instructions: '1. Click "Choose File" to upload an image.\n2. Click "Interpret Vision".\n3. Read the AI-generated analysis of the visual elements.',
    category: 'image',
    icon: '👁️',
    path: '/tools/image/cap'
  },
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
    id: 'docx-fix',
    name: 'Grammar Hammer',
    description: 'Smash grammatical errors in your document text.',
    instructions: '1. Paste text from your Word doc.\n2. Click "Fix Grammar".\n3. Copy the corrected text back to your document.',
    category: 'docx',
    icon: '🔨',
    path: '/tools/docx/fix'
  },
  {
    id: 'docx-expand',
    name: 'Bullet Expander',
    description: 'Turn brief bullet points into full paragraphs.',
    instructions: '1. Paste your rough notes.\n2. Click "Expand".\n3. Get full paragraphs ready for your DOCX file.',
    category: 'docx',
    icon: '📑',
    path: '/tools/docx/expand'
  },
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
    id: 'misc-trans',
    name: 'Universal Translator',
    description: 'Translate text into any language with nuance.',
    instructions: '1. Enter the text you want to translate.\n2. Select your target language from the dropdown.\n3. Click Translate to get the result.',
    category: 'misc',
    icon: '🌐',
    path: '/tools/misc/trans'
  },
  {
    id: 'misc-idea',
    name: 'Chaos Idea Engine',
    description: 'Spark your creativity with random, wild ideas.',
    instructions: '1. Simply click "Spark Chaos".\n2. The AI will generate a completely random, potentially million-dollar idea.\n3. Repeat until inspired.',
    category: 'misc',
    icon: '💡',
    path: '/tools/misc/idea'
  },
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