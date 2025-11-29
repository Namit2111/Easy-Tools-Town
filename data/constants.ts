import { Tool } from '../types';

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
  {
    id: 'pdf-text',
    name: 'PDF to Text',
    description: 'Extract text content from any PDF file.',
    instructions: '1. Upload your PDF file.\n2. Click "Extract Text".\n3. Download the extracted text.',
    category: 'pdf',
    icon: '📝',
    path: '/tools/pdf/text'
  },
  {
    id: 'pdf-image',
    name: 'PDF to Image',
    description: 'Convert PDF pages into high-quality images.',
    instructions: '1. Upload your PDF file.\n2. Wait for conversion.\n3. Download images for each page.',
    category: 'pdf',
    icon: '🖼️',
    path: '/tools/pdf/image'
  },
  {
    id: 'image-pdf',
    name: 'Image to PDF',
    description: 'Combine multiple images into a single PDF document.',
    instructions: '1. Upload your images.\n2. Arrange them in order.\n3. Download the generated PDF.',
    category: 'pdf',
    icon: '📑',
    path: '/tools/pdf/from-image'
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
  {
    id: 'img-base64',
    name: 'Image to Base64',
    description: 'Convert any image into a Base64 string.',
    instructions: '1. Upload your image.\n2. Click "Convert".\n3. Copy or download the Base64 string.',
    category: 'image',
    icon: '🔢',
    path: '/tools/image/base64'
  },
  {
    id: 'img-filters',
    name: 'Image Filters',
    description: 'Apply artistic filters like Sepia, Blur, and Invert to your images.',
    instructions: '1. Upload an image.\n2. Select a filter.\n3. Download the filtered image.',
    category: 'image',
    icon: '🎨',
    path: '/tools/image/filters'
  },
  {
    id: 'img-flip',
    name: 'Image Flip',
    description: 'Flip images horizontally or vertically.',
    instructions: '1. Upload an image.\n2. Choose flip direction.\n3. Download the flipped image.',
    category: 'image',
    icon: '↔️',
    path: '/tools/image/flip'
  },
  {
    id: 'img-colorpicker',
    name: 'Color Picker',
    description: 'Extract colors from any image by clicking on it.',
    instructions: '1. Upload an image.\n2. Click anywhere on the image.\n3. Copy the hex color code.',
    category: 'image',
    icon: '🖌️',
    path: '/tools/image/colorpicker'
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
  {
    id: 'docx-text',
    name: 'DOCX to Text',
    description: 'Extract raw text from Word documents.',
    instructions: '1. Upload your DOCX file.\n2. Click "Extract Text".\n3. Download the plain text file.',
    category: 'docx',
    icon: '📄',
    path: '/tools/docx/text'
  },
  {
    id: 'text-docx',
    name: 'Text to DOCX',
    description: 'Convert plain text into a Word document.',
    instructions: '1. Enter or paste your text.\n2. Click "Convert".\n3. Download the DOCX file.',
    category: 'docx',
    icon: '✍️',
    path: '/tools/docx/from-text'
  },
  {
    id: 'html-docx',
    name: 'HTML to DOCX',
    description: 'Convert HTML code into a Word document.',
    instructions: '1. Enter your HTML code.\n2. Click "Convert".\n3. Download the DOCX file.',
    category: 'docx',
    icon: '🌐',
    path: '/tools/docx/from-html'
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
  {
    id: 'misc-qrcode',
    name: 'QR Code Generator',
    description: 'Generate QR codes for URLs, text, or contact info.',
    instructions: '1. Enter text or URL.\n2. See the generated QR code instantly.\n3. Scan or save it.',
    category: 'misc',
    icon: '📱',
    path: '/tools/misc/qrcode'
  },
  {
    id: 'misc-slug',
    name: 'Slug Generator',
    description: 'Convert text into SEO-friendly URL slugs.',
    instructions: '1. Enter your text.\n2. Copy the generated slug.',
    category: 'misc',
    icon: '🔗',
    path: '/tools/misc/slug'
  },
  {
    id: 'misc-url',
    name: 'URL Encoder/Decoder',
    description: 'Encode or decode URLs safely.',
    instructions: '1. Select Encode or Decode.\n2. Enter your text.\n3. Copy the result.',
    category: 'misc',
    icon: '🌐',
    path: '/tools/misc/url'
  },
  {
    id: 'misc-markdown',
    name: 'Markdown to HTML',
    description: 'Convert Markdown text to raw HTML.',
    instructions: '1. Enter Markdown text.\n2. Click "Convert".\n3. Copy the generated HTML.',
    category: 'misc',
    icon: '📝',
    path: '/tools/misc/markdown'
  },
];

// Blog posts moved to data/blogs.ts