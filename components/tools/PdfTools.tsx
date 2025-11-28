import React, { useState, useRef } from 'react';
import ConverterTool from '../templates/ConverterTool';
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
      <div className="space-y-8">
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-4 border-dashed border-black p-12 text-center cursor-pointer transition-all
            ${file ? 'bg-[#caffbf]' : 'bg-gray-50 hover:bg-gray-100'}
          `}
        >
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="text-6xl mb-4">
            {file ? '📄' : '📥'}
          </div>
          <h3 className="text-2xl font-bold uppercase mb-2">
            {file ? file.name : 'Drop PDF to Inspect'}
          </h3>
        </div>

        {file && (
          <div className="bg-white border-4 border-black p-8 neo-shadow">
            <h3 className="text-3xl font-black uppercase mb-6 border-b-4 border-black inline-block">File Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xl">
              <div className="p-4 border-2 border-black bg-[#ffadad]">
                <span className="font-bold block uppercase text-sm">Size</span>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </div>
              <div className="p-4 border-2 border-black bg-[#ffd6a5]">
                <span className="font-bold block uppercase text-sm">Type</span>
                {file.type || 'application/pdf'}
              </div>
              <div className="p-4 border-2 border-black bg-[#fdffb6]">
                <span className="font-bold block uppercase text-sm">Last Modified</span>
                {new Date(file.lastModified).toLocaleDateString()}
              </div>
              <div className="p-4 border-2 border-black bg-[#caffbf]">
                <span className="font-bold block uppercase text-sm">Name Length</span>
                {file.name.length} chars
              </div>
            </div>
            <NeoButton
              onClick={() => setFile(null)}
              className="mt-8 w-full"
            >
              Inspect Another
            </NeoButton>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};
