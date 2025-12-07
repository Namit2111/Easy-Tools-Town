'use client';

import React, { useState, useRef } from 'react';
import ConverterTool from '@/components/templates/ConverterTool';
import RenamerTool from '@/components/templates/RenamerTool';
import ViewerTool from '@/components/templates/ViewerTool';
import TextInputTool from '@/components/templates/TextInputTool';
import ToolLayout from '@/components/ToolLayout';
import NeoButton from '@/components/NeoButton';

const extractDocxText = async (arrayBuffer: ArrayBuffer) => {
  const { extractRawText } = (await import('mammoth/mammoth.browser')) as {
    extractRawText: (input: { arrayBuffer: ArrayBuffer }) => Promise<{ value: string }>;
  };

  const { value } = await extractRawText({ arrayBuffer });
  return (value || '').replace(/\r/g, '').trim();
};

// DOCX to Base64
export const DocxBase64Tool = () => {
  return (
    <ConverterTool
      toolId="docx-base64"
      accept=".docx"
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

// DOCX Inspector
export const DocxInfoTool = () => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <ToolLayout toolId="docx-info">
      <div className="space-y-5">
        {!file && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-3 border-dashed border-black p-8 text-center cursor-pointer transition-all bg-gray-50 hover:bg-gray-100"
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".docx"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="text-4xl mb-3">📥</div>
            <h3 className="text-lg font-bold uppercase mb-1">Drop DOCX to Inspect</h3>
          </div>
        )}

        {file && (
          <div className="bg-white border-2 border-black p-5 neo-shadow">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-black uppercase border-b-2 border-black inline-block">Document Details</h3>
              <button
                onClick={() => setFile(null)}
                className="text-sm font-bold uppercase hover:underline"
              >
                ← New File
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border-2 border-black bg-[#bdb2ff]">
                <span className="font-bold block uppercase text-sm mb-1">Size</span>
                <span className="text-lg">{(file.size / 1024).toFixed(2)} KB</span>
              </div>
              <div className="p-4 border-2 border-black bg-[#a0c4ff]">
                <span className="font-bold block uppercase text-sm mb-1">Type</span>
                <span className="text-lg">DOCX Document</span>
              </div>
              <div className="p-4 border-2 border-black bg-[#9bf6ff]">
                <span className="font-bold block uppercase text-sm mb-1">Last Modified</span>
                <span className="text-lg">{new Date(file.lastModified).toLocaleDateString()}</span>
              </div>
              <div className="p-4 border-2 border-black bg-[#ffc6ff]">
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

// DOCX Renamer
export const DocxRenameTool = () => {
  return (
    <RenamerTool
      toolId="docx-rename"
      accept=".docx"
      defaultExtension="docx"
      onRename={async (file) => {
        return file;
      }}
    />
  );
};

// DOCX Validator
export const DocxValidateTool = () => {
  return (
    <ViewerTool
      toolId="docx-validate"
      accept="*"
      onView={async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        const isValid = bytes[0] === 0x50 && bytes[1] === 0x4B; // Check for ZIP signature
        return (
          <div className="text-center p-6">
            {isValid ? (
              <div className="bg-green-100 border-3 border-green-500 p-6">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-xl font-bold">Valid DOCX File</h3>
                <p className="mt-2">This file appears to be a valid DOCX document.</p>
              </div>
            ) : (
              <div className="bg-red-100 border-3 border-red-500 p-6">
                <div className="text-4xl mb-3">❌</div>
                <h3 className="text-xl font-bold">Invalid DOCX File</h3>
                <p className="mt-2">This file does not appear to be a valid DOCX document.</p>
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

// DOCX Word Counter
export const DocxWordCountTool = () => {
  const [file, setFile] = useState<File | null>(null);
  const [stats, setStats] = useState<{ words: number; chars: number; paragraphs: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      setLoading(true);

      try {
        const arrayBuffer = await f.arrayBuffer();
        const extractedText = await extractDocxText(arrayBuffer);

        const words = extractedText ? extractedText.split(/\s+/).filter(Boolean).length : 0;
        const chars = extractedText.length;
        const paragraphs = extractedText
          ? extractedText.split(/\n{2,}/).filter(p => p.trim().length > 0).length || 1
          : 0;

        setStats({ words, chars, paragraphs });
      } catch (error) {
        console.error('Error reading DOCX:', error);
        setStats({ words: 0, chars: 0, paragraphs: 0 });
      }
      setLoading(false);
    }
  };

  return (
    <ToolLayout toolId="docx-word-count">
      <div className="space-y-5">
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-3 border-dashed border-black p-8 text-center cursor-pointer transition-all ${file ? 'bg-[#ffc6ff]' : 'bg-gray-50 hover:bg-gray-100'}`}
        >
          <input type="file" ref={fileInputRef} accept=".docx" onChange={handleFileChange} className="hidden" />
          <div className="text-4xl mb-3">🔢</div>
          <h3 className="text-lg font-bold uppercase">{file ? file.name : 'Upload DOCX to Count Words'}</h3>
        </div>

        {loading && (
          <div className="bg-white border-2 border-black p-8 text-center">
            <div className="text-2xl mb-2">⏳</div>
            <p className="font-bold">Analyzing document...</p>
          </div>
        )}

        {file && stats && !loading && (
          <div className="bg-white border-2 border-black p-5 neo-shadow">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-black uppercase border-b-2 border-black">Word Count Statistics</h3>
              <button onClick={() => { setFile(null); setStats(null); }} className="text-sm font-bold hover:underline">← New File</button>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-6 border-2 border-black bg-[#caffbf]">
                <div className="text-4xl font-black">{stats.words}</div>
                <div className="font-bold uppercase mt-2">Words</div>
              </div>
              <div className="p-6 border-2 border-black bg-[#9bf6ff]">
                <div className="text-4xl font-black">{stats.chars}</div>
                <div className="font-bold uppercase mt-2">Characters</div>
              </div>
              <div className="p-6 border-2 border-black bg-[#ffc6ff]">
                <div className="text-4xl font-black">{stats.paragraphs}</div>
                <div className="font-bold uppercase mt-2">Paragraphs</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

// DOCX to Text
export const DocxToTextTool = () => {
  return (
    <ConverterTool
      toolId="docx-text"
      accept=".docx"
      buttonLabel="Extract Text"
      downloadExtension="txt"
      onConvert={async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const extractedText = await extractDocxText(arrayBuffer);

        const blob = new Blob([extractedText || 'Could not extract text.'], { type: 'text/plain' });
        return blob;
      }}
    />
  );
};

// Text to DOCX
export const TextToDocxTool = () => {
  return (
    <TextInputTool
      toolId="text-docx"
      placeholder="Type or paste your text here to convert to DOCX..."
      generateLabel="Convert to DOCX"
      downloadExtension="docx"
      onGenerate={async (text) => {
        // Simplified - for production use docx library
        const blob = new Blob([text], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        return blob;
      }}
    />
  );
};

// HTML to DOCX
export const HtmlToDocxTool = () => {
  return (
    <TextInputTool
      toolId="html-docx"
      placeholder="<p>Enter your <b>HTML</b> code here...</p>"
      generateLabel="Convert HTML to DOCX"
      downloadExtension="docx"
      onGenerate={async (html) => {
        // Simplified - for production use html-docx-js-typescript
        const blob = new Blob([html], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        return blob;
      }}
    />
  );
};
