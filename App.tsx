import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

// Layout & Common
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import { BlogList, BlogPostView } from '@/pages/Blog';
import ToolsList from '@/pages/ToolsList';

// Tools
import { PdfPlanTool, PdfRewriteTool, PdfToTextTool } from '@/components/tools/PdfTools';
import { ImageGenTool, ImageCapTool, ImageConverterTool } from '@/components/tools/ImageTools';
import { DocxGrammarTool, DocxExpanderTool } from '@/components/tools/DocxTools';
import { TranslatorTool, IdeaTool } from '@/components/tools/MiscTools';

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

            {/* Image Tools */}
            <Route path="/tools/image/gen" element={<ImageGenTool />} />
            <Route path="/tools/image/cap" element={<ImageCapTool />} />
            <Route path="/tools/image/convert" element={<ImageConverterTool />} />

            {/* Docx Tools */}
            <Route path="/tools/docx/fix" element={<DocxGrammarTool />} />
            <Route path="/tools/docx/expand" element={<DocxExpanderTool />} />

            {/* Misc Tools */}
            <Route path="/tools/misc/trans" element={<TranslatorTool />} />
            <Route path="/tools/misc/idea" element={<IdeaTool />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;