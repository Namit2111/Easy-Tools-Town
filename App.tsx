import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

// Layout & Common
import Navbar from './components/navbar.tsx';
import Footer from './components/footer.tsx';

// Pages
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import { BlogList, BlogPostView } from './pages/Blog.tsx';
import ToolsList from './pages/ToolsList.tsx';

// Tools
import { ImageConverterTool, ImageGenTool, ImageCapTool } from './components/tools/ImageTools.tsx';
import { PdfBase64Tool, PdfInfoTool, PdfPlanTool, PdfRewriteTool, PdfToTextTool } from './components/tools/PdfTools.tsx';
import { DocxBase64Tool, DocxInfoTool, DocxGrammarTool, DocxExpanderTool } from './components/tools/DocxTools.tsx';
import { JsonMinifyTool, FileBase64Tool, TranslatorTool, IdeaTool } from './components/tools/MiscTools.tsx';

// --- APP SHELL ---

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogPostView />} />

            <Route path="/tools" element={<ToolsList />} />
            <Route path="/tools/pdf" element={<ToolsList category="pdf" />} />
            <Route path="/tools/image" element={<ToolsList category="image" />} />
            <Route path="/tools/docx" element={<ToolsList category="docx" />} />
            <Route path="/tools/misc" element={<ToolsList category="misc" />} />

            {/* PDF Tools */}
            <Route path="/tools/pdf/plan" element={<PdfPlanTool />} />
            <Route path="/tools/pdf/rewrite" element={<PdfRewriteTool />} />
            <Route path="/tools/pdf/extract" element={<PdfToTextTool />} />
            <Route path="/tools/pdf/base64" element={<PdfBase64Tool />} />
            <Route path="/tools/pdf/info" element={<PdfInfoTool />} />

            {/* Image Tools */}
            <Route path="/tools/image/gen" element={<ImageGenTool />} />
            <Route path="/tools/image/cap" element={<ImageCapTool />} />
            <Route path="/tools/image/convert" element={<ImageConverterTool />} />

            {/* Docx Tools */}
            <Route path="/tools/docx/fix" element={<DocxGrammarTool />} />
            <Route path="/tools/docx/expand" element={<DocxExpanderTool />} />
            <Route path="/tools/docx/base64" element={<DocxBase64Tool />} />
            <Route path="/tools/docx/info" element={<DocxInfoTool />} />

            {/* Misc Tools */}
            <Route path="/tools/misc/trans" element={<TranslatorTool />} />
            <Route path="/tools/misc/idea" element={<IdeaTool />} />
            <Route path="/tools/misc/minify" element={<JsonMinifyTool />} />
            <Route path="/tools/misc/base64" element={<FileBase64Tool />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;