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
  {
    id: 'pdf-rename',
    name: 'PDF Renamer',
    description: 'Rename your PDF files quickly and easily online.',
    instructions: '1. Upload your PDF file.\n2. Enter a new name.\n3. Download the renamed file.',
    category: 'pdf',
    icon: '✏️',
    path: '/tools/pdf/rename'
  },
  {
    id: 'pdf-view',
    name: 'PDF Viewer',
    description: 'View PDF files directly in your browser without downloading.',
    instructions: '1. Upload your PDF file.\n2. View the content instantly.',
    category: 'pdf',
    icon: '📖',
    path: '/tools/pdf/view'
  },
  {
    id: 'pdf-merge',
    name: 'PDF Merger',
    description: 'Merge multiple PDF files into one document online for free.',
    instructions: '1. Upload multiple PDF files.\n2. Arrange them in order.\n3. Click "Merge" and download the combined PDF.',
    category: 'pdf',
    icon: '📎',
    path: '/tools/pdf/merge'
  },
  {
    id: 'pdf-page-count',
    name: 'PDF Page Counter',
    description: 'Count the number of pages in any PDF file instantly.',
    instructions: '1. Upload your PDF file.\n2. See the page count immediately.',
    category: 'pdf',
    icon: '📄',
    path: '/tools/pdf/pagecount'
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
  {
    id: 'img-rotate',
    name: 'Image Rotator',
    description: 'Rotate images by 90, 180, or 270 degrees.',
    instructions: '1. Upload an image.\n2. Select rotation angle.\n3. Download the rotated image.',
    category: 'image',
    icon: '🔁',
    path: '/tools/image/rotate'
  },
  {
    id: 'img-gray',
    name: 'Grayscale Converter',
    description: 'Convert color images to black and white.',
    instructions: '1. Upload an image.\n2. Click "Convert".\n3. Download the grayscale image.',
    category: 'image',
    icon: '⚫',
    path: '/tools/image/grayscale'
  },
  {
    id: 'img-compress',
    name: 'Image Compressor',
    description: 'Compress and reduce image file size online without losing quality.',
    instructions: '1. Upload an image.\n2. Select compression level.\n3. Download the optimized image.',
    category: 'image',
    icon: '🗜️',
    path: '/tools/image/compress'
  },
  {
    id: 'img-resize',
    name: 'Image Resizer',
    description: 'Resize images to any dimensions online for free.',
    instructions: '1. Upload an image.\n2. Enter new width and height.\n3. Download the resized image.',
    category: 'image',
    icon: '📐',
    path: '/tools/image/resize'
  },
  {
    id: 'img-crop',
    name: 'Image Cropper',
    description: 'Crop images online to remove unwanted areas.',
    instructions: '1. Upload an image.\n2. Select the area to keep.\n3. Download the cropped image.',
    category: 'image',
    icon: '✂️',
    path: '/tools/image/crop'
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
  {
    id: 'docx-rename',
    name: 'DOCX Renamer',
    description: 'Rename Word documents online without opening them.',
    instructions: '1. Upload your DOCX file.\n2. Enter a new name.\n3. Download the renamed file.',
    category: 'docx',
    icon: '📝',
    path: '/tools/docx/rename'
  },
  {
    id: 'docx-validate',
    name: 'DOCX Validator',
    description: 'Check if your file is a valid DOCX document.',
    instructions: '1. Upload your file.\n2. See validation result instantly.',
    category: 'docx',
    icon: '✅',
    path: '/tools/docx/validate'
  },
  {
    id: 'docx-word-count',
    name: 'DOCX Word Counter',
    description: 'Count words, characters, and paragraphs in Word documents.',
    instructions: '1. Upload your DOCX file.\n2. See word count and statistics instantly.',
    category: 'docx',
    icon: '🔢',
    path: '/tools/docx/wordcount'
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
  {
    id: 'misc-password',
    name: 'Password Generator',
    description: 'Generate strong, random passwords instantly.',
    instructions: '1. Choose password length.\n2. Select character types.\n3. Copy the generated password.',
    category: 'misc',
    icon: '🔐',
    path: '/tools/misc/password'
  },
  {
    id: 'misc-word-count',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs in text.',
    instructions: '1. Paste or type your text.\n2. See real-time statistics.\n3. Copy the results.',
    category: 'misc',
    icon: '🔢',
    path: '/tools/misc/wordcount'
  },
  {
    id: 'misc-lorem',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for your designs and mockups.',
    instructions: '1. Choose number of paragraphs.\n2. Click "Generate".\n3. Copy the lorem ipsum text.',
    category: 'misc',
    icon: '📝',
    path: '/tools/misc/lorem'
  },
  {
    id: 'misc-uuid',
    name: 'UUID Generator',
    description: 'Generate unique UUIDs (v4) for your applications instantly.',
    instructions: '1. Click "Generate UUID".\n2. Copy the generated unique ID.\n3. Generate as many as you need.',
    category: 'misc',
    icon: '🆔',
    path: '/tools/misc/uuid'
  },
];

export const BLOGS: BlogPost[] = [
  { id: '1', title: 'Why Brutalism is Back', excerpt: 'Web design is getting raw again. Here is why polished gradients are out.', content: 'Detailed content about brutalism...', date: 'Oct 24, 2023', author: 'Max Rough' },
  { id: '2', title: 'Top 5 AI Tools for 2025', excerpt: 'You will not believe what AI can do now. Especially number 3.', content: 'Detailed list of tools...', date: 'Nov 01, 2023', author: 'Sarah Tech' },
  { id: '3', title: 'The Death of the Border-Radius', excerpt: 'Why sharp corners are the future of UI design.', content: 'Rounded corners are so 2020...', date: 'Nov 15, 2023', author: 'Design God' },
];