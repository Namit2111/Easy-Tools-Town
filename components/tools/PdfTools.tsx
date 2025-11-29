import React, { useState, useRef } from 'react';
import ConverterTool from '../templates/ConverterTool';
import RenamerTool from '../templates/RenamerTool';
import ViewerTool from '../templates/ViewerTool';
import ToolLayout from '../ToolLayout';
import NeoButton from '../NeoButton';

// --- PDF to Base64 ---
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
            resolve(reader.result as string);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }}
    />
  );
};

// --- PDF Inspector ---
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
      <div className="space-y-4">
        {!file && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-black p-6 text-center cursor-pointer transition-all bg-gray-50 hover:bg-gray-100"
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="text-3xl mb-2">📥</div>
            <h3 className="text-sm font-bold uppercase mb-1">Drop PDF to Inspect</h3>
          </div>
        )}

        {file && (
          <div className="bg-white border-2 border-black p-4 neo-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black uppercase border-b-2 border-black inline-block">File Details</h3>
              <button 
                onClick={() => setFile(null)}
                className="text-xs font-bold uppercase hover:underline"
              >
                ← New File
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 border-2 border-black bg-[#ffadad]">
                <span className="font-bold block uppercase text-xs mb-1">Size</span>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </div>
              <div className="p-3 border-2 border-black bg-[#ffd6a5]">
                <span className="font-bold block uppercase text-xs mb-1">Type</span>
                {file.type || 'application/pdf'}
              </div>
              <div className="p-3 border-2 border-black bg-[#fdffb6]">
                <span className="font-bold block uppercase text-xs mb-1">Last Modified</span>
                {new Date(file.lastModified).toLocaleDateString()}
              </div>
              <div className="p-3 border-2 border-black bg-[#caffbf]">
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

// --- PDF Renamer ---
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

// ---PDF Viewer ---
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
