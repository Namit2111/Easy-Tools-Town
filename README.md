# Easy Tools Town

A neo-brutalist collection of free online tools for PDF, image, and document processing. Built with Next.js 15, React 19, and Tailwind CSS.

## Features

- 🔧 **40+ Free Tools** - PDF, Image, DOCX, and Misc utilities
- 🎨 **Neo-brutalist Design** - Bold, unapologetic UI
- 🔒 **Privacy First** - All processing happens in your browser
- 🚀 **Fast** - Server-side rendering with Next.js App Router
- 📱 **Responsive** - Works on all devices
- 🔍 **SEO Optimized** - Full metadata support for all pages

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: Custom neo-brutalist components
- **PDF**: pdfjs-dist, jspdf
- **DOCX**: mammoth, docx
- **QR Codes**: qrcode.react

## Getting Started

### Prerequisites

- Node.js 18.17 or later

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
easyToolsTown/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── blog/               # Blog pages
│   │   ├── page.tsx        # Blog list
│   │   └── [slug]/         # Dynamic blog posts
│   └── tools/              # Tool pages
│       ├── page.tsx        # All tools
│       └── [category]/     # Category pages
│           └── [tool]/     # Individual tools
├── components/
│   ├── navbar.tsx          # Navigation
│   ├── footer.tsx          # Footer
│   ├── NeoButton.tsx       # Button component
│   ├── NeoCard.tsx         # Card component
│   ├── ToolLayout.tsx      # Tool page layout
│   ├── templates/          # Reusable tool templates
│   └── tools/              # Individual tool components
├── lib/                    # Utilities and data
│   ├── constants.ts        # Tools data
│   ├── blogs.ts            # Blog posts
│   ├── types.ts            # TypeScript types
│   ├── markdown.ts         # Markdown parser
│   └── imageService.ts     # Image utilities
└── public/                 # Static assets
```

## Available Tools

### PDF Tools
- PDF to Base64
- PDF Inspector
- PDF Renamer
- PDF Viewer
- PDF Merger
- PDF Page Counter
- PDF to Text
- PDF to Image
- Image to PDF

### Image Tools
- Format Shifter (JPG/PNG)
- Image Rotator
- Grayscale Converter
- Image Compressor
- Image Resizer
- Image Cropper
- Image to Base64
- Image Filters
- Image Flip
- Color Picker

### DOCX Tools
- DOCX to Base64
- DOCX Inspector
- DOCX Renamer
- DOCX Validator
- DOCX Word Counter
- DOCX to Text
- Text to DOCX
- HTML to DOCX

### Misc Tools
- JSON Minifier
- Universal Base64
- Password Generator
- Word Counter
- Lorem Ipsum Generator
- UUID Generator
- QR Code Generator
- Slug Generator
- URL Encoder/Decoder
- Markdown to HTML

## Deployment

This project is optimized for deployment on Vercel. Simply push to your repository and Vercel will automatically build and deploy.

```bash
# Or deploy manually
npm run build
```

## License

MIT License - feel free to use this project for your own purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
