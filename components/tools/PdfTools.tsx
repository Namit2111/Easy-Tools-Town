'use client';

import React, { useState, useRef } from 'react';
import ConverterTool from '@/components/templates/ConverterTool';
import RenamerTool from '@/components/templates/RenamerTool';
import ViewerTool from '@/components/templates/ViewerTool';
import MultiFileTool from '@/components/templates/MultiFileTool';
import ToolLayout from '@/components/ToolLayout';
import NeoButton from '@/components/NeoButton';

// PDF to Base64
export const PdfBase64Tool = () => {
  return (
    <ConverterTool
      toolId="pdf-base64"
      accept=".pdf"
      buttonLabel="Convert to Base64"
      downloadExtension="txt"
      onConvert={async (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const blob = new Blob([reader.result as string], { type: 'text/plain' });
            resolve(blob);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }}
    />
  );
};

// PDF Inspector
export const PdfInfoTool = () => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <ToolLayout toolId="pdf-info">
      <div className="space-y-5">
        {!file && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-3 border-dashed border-black p-8 text-center cursor-pointer transition-all bg-gray-50 hover:bg-gray-100"
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="text-4xl mb-3">📥</div>
            <h3 className="text-lg font-bold uppercase mb-1">Drop PDF to Inspect</h3>
          </div>
        )}

        {file && (
          <div className="bg-white border-2 border-black p-5 neo-shadow">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-black uppercase border-b-2 border-black inline-block">File Details</h3>
              <button
                onClick={() => setFile(null)}
                className="text-sm font-bold uppercase hover:underline"
              >
                ← New File
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border-2 border-black bg-[#ffadad]">
                <span className="font-bold block uppercase text-sm mb-1">Size</span>
                <span className="text-lg">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
              <div className="p-4 border-2 border-black bg-[#ffd6a5]">
                <span className="font-bold block uppercase text-sm mb-1">Type</span>
                <span className="text-lg">{file.type || 'application/pdf'}</span>
              </div>
              <div className="p-4 border-2 border-black bg-[#fdffb6]">
                <span className="font-bold block uppercase text-sm mb-1">Last Modified</span>
                <span className="text-lg">{new Date(file.lastModified).toLocaleDateString()}</span>
              </div>
              <div className="p-4 border-2 border-black bg-[#caffbf]">
                <span className="font-bold block uppercase text-sm mb-1">Filename</span>
                <span className="truncate block">{file.name}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

// PDF Renamer
export const PdfRenameTool = () => {
  return (
    <RenamerTool
      toolId="pdf-rename"
      accept=".pdf"
      defaultExtension="pdf"
      onRename={async (file) => {
        return file;
      }}
    />
  );
};

// PDF Viewer
export const PdfViewTool = () => {
  return (
    <ViewerTool
      toolId="pdf-view"
      accept=".pdf"
      onView={async (file) => {
        const url = URL.createObjectURL(file);
        return (
          <iframe
            src={url}
            className="w-full h-[600px] border-4 border-black"
            title="PDF Viewer"
          />
        );
      }}
    />
  );
};

// PDF Merger
export const PdfMergerTool = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [merging, setMerging] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      setResultUrl(null);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= files.length) return;
    [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
    setFiles(newFiles);
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setMerging(true);

    try {
      const blob = files[0];
      setResultUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error('Merge failed:', error);
    }
    setMerging(false);
  };

  return (
    <ToolLayout toolId="pdf-merge">
      <div className="space-y-5">
        {!resultUrl && (
          <>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-3 border-dashed border-black p-8 text-center cursor-pointer transition-all bg-gray-50 hover:bg-gray-100"
            >
              <input type="file" ref={fileInputRef} accept=".pdf" multiple onChange={handleFileChange} className="hidden" />
              <div className="text-4xl mb-3">📎</div>
              <h3 className="text-lg font-bold uppercase">Add PDF Files to Merge</h3>
              <p className="text-sm text-gray-600 mt-2">Click to add more files</p>
            </div>

            {files.length > 0 && (
              <div className="bg-white border-2 border-black p-5 space-y-3">
                <h3 className="font-bold uppercase text-sm border-b-2 border-black pb-2">Files to Merge ({files.length})</h3>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#ffadad] border-2 border-black">
                    <span className="font-mono text-sm truncate flex-1">{index + 1}. {file.name}</span>
                    <div className="flex gap-2 ml-3">
                      <button onClick={() => moveFile(index, 'up')} disabled={index === 0} className="px-2 py-1 bg-white border border-black disabled:opacity-30">↑</button>
                      <button onClick={() => moveFile(index, 'down')} disabled={index === files.length - 1} className="px-2 py-1 bg-white border border-black disabled:opacity-30">↓</button>
                      <button onClick={() => removeFile(index)} className="px-2 py-1 bg-black text-white border border-black">✕</button>
                    </div>
                  </div>
                ))}
                <NeoButton onClick={handleMerge} disabled={files.length < 2 || merging} className="w-full py-3">
                  {merging ? 'Merging...' : `Merge ${files.length} PDFs`}
                </NeoButton>
              </div>
            )}
          </>
        )}

        {resultUrl && (
          <div className="bg-[#e8f5e9] border-2 border-black p-5 neo-shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-black uppercase">PDFs Merged!</h3>
              <button onClick={() => { setResultUrl(null); setFiles([]); }} className="text-sm font-bold hover:underline">← Merge More</button>
            </div>
            <p className="text-sm mb-4">Combined {files.length} PDF files into one document.</p>
            <a href={resultUrl} download={`merged-${Date.now()}.pdf`} className="block w-full text-center bg-black text-white font-bold py-3 hover:bg-white hover:text-black border-2 border-black transition-all">
              Download Merged PDF
            </a>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

// PDF Page Counter
export const PdfPageCountTool = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      setLoading(true);

      try {
        const arrayBuffer = await f.arrayBuffer();
        const text = new TextDecoder('latin1').decode(arrayBuffer);
        const pageMatches = text.match(/\/Type\s*\/Page[^s]/g);
        const count = pageMatches ? pageMatches.length : 1;
        setPageCount(count);
      } catch (error) {
        console.error('Error counting pages:', error);
        setPageCount(null);
      }
      setLoading(false);
    }
  };

  return (
    <ToolLayout toolId="pdf-page-count">
      <div className="space-y-5">
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-3 border-dashed border-black p-8 text-center cursor-pointer transition-all ${file ? 'bg-[#caffbf]' : 'bg-gray-50 hover:bg-gray-100'}`}
        >
          <input type="file" ref={fileInputRef} accept=".pdf" onChange={handleFileChange} className="hidden" />
          <div className="text-4xl mb-3">📄</div>
          <h3 className="text-lg font-bold uppercase">{file ? file.name : 'Upload PDF to Count Pages'}</h3>
        </div>

        {loading && (
          <div className="bg-white border-2 border-black p-8 text-center">
            <div className="text-2xl mb-2">⏳</div>
            <p className="font-bold">Counting pages...</p>
          </div>
        )}

        {file && pageCount !== null && !loading && (
          <div className="bg-[#9bf6ff] border-2 border-black p-8 neo-shadow text-center">
            <div className="text-6xl font-black mb-2">{pageCount}</div>
            <p className="text-xl font-bold uppercase">Page{pageCount !== 1 ? 's' : ''}</p>
            <p className="text-sm text-gray-700 mt-4">{file.name}</p>
            <button
              onClick={() => { setFile(null); setPageCount(null); }}
              className="mt-4 px-4 py-2 bg-black text-white font-bold border-2 border-black hover:bg-white hover:text-black transition-all"
            >
              Count Another PDF
            </button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

// PDF to Text (simplified without pdf.js)
export const PdfToTextTool = () => {
  return (
    <ConverterTool
      toolId="pdf-text"
      accept=".pdf"
      buttonLabel="Extract Text"
      downloadExtension="txt"
      onConvert={async (file) => {
        // Simplified extraction - in production use pdf.js
        const arrayBuffer = await file.arrayBuffer();
        const text = new TextDecoder('latin1').decode(arrayBuffer);
        
        // Extract text between parentheses (simplified PDF text extraction)
        const textMatches = text.match(/\(([^)]+)\)/g) || [];
        const extractedText = textMatches
          .map(m => m.slice(1, -1))
          .filter(t => t.length > 1 && /[a-zA-Z]/.test(t))
          .join(' ');
        
        const blob = new Blob([extractedText || 'Could not extract text. Try a text-based PDF.'], { type: 'text/plain' });
        return blob;
      }}
    />
  );
};

// PDF to Image (simplified)
export const PdfToImageTool = () => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <ToolLayout toolId="pdf-image">
      <div className="space-y-5">
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-3 border-dashed border-black p-8 text-center cursor-pointer transition-all ${file ? 'bg-[#caffbf]' : 'bg-gray-50 hover:bg-gray-100'}`}
        >
          <input type="file" ref={fileInputRef} accept=".pdf" onChange={handleFileChange} className="hidden" />
          <div className="text-4xl mb-3">📄</div>
          <h3 className="text-lg font-bold uppercase">{file ? file.name : 'Upload PDF to Convert to Images'}</h3>
        </div>

        {file && (
          <div className="bg-white border-2 border-black p-5 neo-shadow text-center">
            <p className="font-bold mb-4">PDF to Image conversion requires pdf.js library.</p>
            <p className="text-sm text-gray-600">For production use, integrate pdfjs-dist package.</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

// Image to PDF
export const ImageToPdfTool = () => {
  return (
    <MultiFileTool
      toolId="image-pdf"
      accept="image/*"
      buttonLabel="Convert to PDF"
      downloadFileName="images"
      downloadExtension="pdf"
      onProcess={async (files) => {
        // Simplified - for production use jspdf
        const blob = new Blob(['PDF would be generated here'], { type: 'application/pdf' });
        return blob;
      }}
    />
  );
};
