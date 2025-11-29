import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout & Common
import Navbar from './components/navbar.tsx';
import Footer from './components/footer.tsx';
import SEO from './components/SEO.tsx';

// Pages
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import { BlogList, BlogPostView } from './pages/Blog.tsx';
import ToolsList from './pages/ToolsList.tsx';

// Tools
import {
  ImageConverterTool, ImageRotateTool, ImageGrayscaleTool, ImageCompressorTool, ImageResizerTool, ImageCropperTool,
  ImageToBase64Tool, ImageFiltersTool, ImageFlipTool, ColorPickerTool
} from './components/tools/ImageTools.tsx';
import {
  PdfBase64Tool, PdfInfoTool, PdfRenameTool, PdfViewTool, PdfMergerTool, PdfPageCountTool,
  PdfToTextTool, PdfToImageTool, ImageToPdfTool
} from './components/tools/PdfTools.tsx';
import {
  DocxBase64Tool, DocxInfoTool, DocxRenameTool, DocxValidateTool, DocxWordCountTool,
  DocxToTextTool, TextToDocxTool, HtmlToDocxTool
} from './components/tools/DocxTools.tsx';
import {
  JsonMinifyTool, FileBase64Tool, PasswordGeneratorTool, WordCounterTool, LoremIpsumTool, UuidGeneratorTool,
  QrCodeTool, SlugGeneratorTool, UrlEncoderDecoderTool, MarkdownToHtmlTool
} from './components/tools/MiscTools.tsx';

// --- APP SHELL ---

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <SEO />
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPostView />} />

            <Route path="/tools" element={<ToolsList />} />
            <Route path="/tools/pdf" element={<ToolsList category="pdf" />} />
            <Route path="/tools/image" element={<ToolsList category="image" />} />
            <Route path="/tools/docx" element={<ToolsList category="docx" />} />
            <Route path="/tools/misc" element={<ToolsList category="misc" />} />

            {/* PDF Tools */}
            <Route path="/tools/pdf/base64" element={<PdfBase64Tool />} />
            <Route path="/tools/pdf/info" element={<PdfInfoTool />} />
            <Route path="/tools/pdf/rename" element={<PdfRenameTool />} />
            <Route path="/tools/pdf/view" element={<PdfViewTool />} />
            <Route path="/tools/pdf/merge" element={<PdfMergerTool />} />
            <Route path="/tools/pdf/pagecount" element={<PdfPageCountTool />} />
            <Route path="/tools/pdf/text" element={<PdfToTextTool />} />
            <Route path="/tools/pdf/image" element={<PdfToImageTool />} />
            <Route path="/tools/pdf/from-image" element={<ImageToPdfTool />} />

            {/* Image Tools */}
            <Route path="/tools/image/convert" element={<ImageConverterTool />} />
            <Route path="/tools/image/rotate" element={<ImageRotateTool />} />
            <Route path="/tools/image/grayscale" element={<ImageGrayscaleTool />} />
            <Route path="/tools/image/compress" element={<ImageCompressorTool />} />
            <Route path="/tools/image/resize" element={<ImageResizerTool />} />
            <Route path="/tools/image/crop" element={<ImageCropperTool />} />
            <Route path="/tools/image/base64" element={<ImageToBase64Tool />} />
            <Route path="/tools/image/filters" element={<ImageFiltersTool />} />
            <Route path="/tools/image/flip" element={<ImageFlipTool />} />
            <Route path="/tools/image/colorpicker" element={<ColorPickerTool />} />

            {/* Docx Tools */}
            <Route path="/tools/docx/base64" element={<DocxBase64Tool />} />
            <Route path="/tools/docx/info" element={<DocxInfoTool />} />
            <Route path="/tools/docx/rename" element={<DocxRenameTool />} />
            <Route path="/tools/docx/validate" element={<DocxValidateTool />} />
            <Route path="/tools/docx/wordcount" element={<DocxWordCountTool />} />
            <Route path="/tools/docx/text" element={<DocxToTextTool />} />
            <Route path="/tools/docx/from-text" element={<TextToDocxTool />} />
            <Route path="/tools/docx/from-html" element={<HtmlToDocxTool />} />

            {/* Misc Tools */}
            <Route path="/tools/misc/minify" element={<JsonMinifyTool />} />
            <Route path="/tools/misc/base64" element={<FileBase64Tool />} />
            <Route path="/tools/misc/password" element={<PasswordGeneratorTool />} />
            <Route path="/tools/misc/wordcount" element={<WordCounterTool />} />
            <Route path="/tools/misc/lorem" element={<LoremIpsumTool />} />
            <Route path="/tools/misc/uuid" element={<UuidGeneratorTool />} />
            <Route path="/tools/misc/qrcode" element={<QrCodeTool />} />
            <Route path="/tools/misc/slug" element={<SlugGeneratorTool />} />
            <Route path="/tools/misc/url" element={<UrlEncoderDecoderTool />} />
            <Route path="/tools/misc/markdown" element={<MarkdownToHtmlTool />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;