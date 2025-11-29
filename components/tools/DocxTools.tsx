import React, { useState, useRef } from 'react';
import ConverterTool from '../templates/ConverterTool';
import RenamerTool from '../templates/RenamerTool';
import ViewerTool from '../templates/ViewerTool';
import ToolLayout from '../ToolLayout';
import NeoButton from '../NeoButton';

// --- DOCX to Base64 ---
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
            resolve(reader.result as string);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }}
    />
  );
};

// --- DOCX Inspector ---
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
      <div className="space-y-4">
        {!file && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-black p-6 text-center cursor-pointer transition-all bg-gray-50 hover:bg-gray-100"
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".docx"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="text-3xl mb-2">📥</div>
            <h3 className="text-sm font-bold uppercase mb-1">Drop DOCX to Inspect</h3>
          </div>
        )}

        {file && (
          <div className="bg-white border-2 border-black p-4 neo-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black uppercase border-b-2 border-black inline-block">Document Details</h3>
              <button 
                onClick={() => setFile(null)}
                className="text-xs font-bold uppercase hover:underline"
              >
                ← New File
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 border-2 border-black bg-[#bdb2ff]">
                <span className="font-bold block uppercase text-xs mb-1">Size</span>
                {(file.size / 1024).toFixed(2)} KB
              </div>
              <div className="p-3 border-2 border-black bg-[#a0c4ff]">
                <span className="font-bold block uppercase text-xs mb-1">Type</span>
                DOCX Document
              </div>
              <div className="p-3 border-2 border-black bg-[#9bf6ff]">
                <span className="font-bold block uppercase text-xs mb-1">Last Modified</span>
                {new Date(file.lastModified).toLocaleDateString()}
              </div>
              <div className="p-3 border-2 border-black bg-[#ffc6ff]">
                <span className="font-bold block uppercase text-xs mb-1">Filename</span>
                <span className="truncate block">{file.name}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

// --- DOCX Renamer ---
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

// --- DOCX Validator ---
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
          <div className="text-center p-4">
            {isValid ? (
              <div className="bg-green-100 border-2 border-green-500 p-4">
                <div className="text-2xl mb-2">✅</div>
                <h3 className="text-sm font-bold">Valid DOCX File</h3>
                <p className="text-xs mt-1">This file appears to be a valid DOCX document.</p>
              </div>
            ) : (
              <div className="bg-red-100 border-2 border-red-500 p-4">
                <div className="text-2xl mb-2">❌</div>
                <h3 className="text-sm font-bold">Invalid DOCX File</h3>
                <p className="text-xs mt-1">This file does not appear to be a valid DOCX document.</p>
              </div>
            )}
          </div>
        );
      }}
    />
  );
};
