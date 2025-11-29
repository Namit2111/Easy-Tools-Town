import React, { useState, useRef, useMemo } from 'react';
import ToolLayout from '../ToolLayout.tsx';
import NeoButton from '../NeoButton.tsx';
import { LoadingState } from '../../types.ts';

interface ConverterToolProps {
  toolId: string;
  accept: string; // e.g. ".pdf, .png"
  outputFormatOptions?: string[]; // e.g. ["PNG", "JPG"]
  buttonLabel?: string;
  onConvert: (file: File, option?: string) => Promise<Blob | string>; // Returns Blob or DataURL
  downloadFileNamePrefix?: string;
  downloadExtension?: string;
}

const ConverterTool: React.FC<ConverterToolProps> = ({
  toolId,
  accept,
  outputFormatOptions,
  buttonLabel = "Convert File",
  onConvert,
  downloadFileNamePrefix = "converted",
  downloadExtension = "txt"
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [option, setOption] = useState<string>(outputFormatOptions ? outputFormatOptions[0] : '');
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isImageFile = useMemo(() => {
    return accept.includes('image') || ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].some(ext => accept.includes(ext));
  }, [accept]);

  const isResultImage = useMemo(() => {
    return ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp'].includes(downloadExtension.toLowerCase());
  }, [downloadExtension]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      setFile(newFile);
      setResultUrl(null);
      setStatus(LoadingState.IDLE);
      
      // Create preview for image files
      if (newFile.type.startsWith('image/')) {
        const url = URL.createObjectURL(newFile);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    setStatus(LoadingState.LOADING);
    try {
      const result = await onConvert(file, option);
      
      let url = '';
      if (typeof result === 'string') {
        url = result;
      } else {
        url = URL.createObjectURL(result);
      }
      
      setResultUrl(url);
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(LoadingState.ERROR);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResultUrl(null);
    setPreviewUrl(null);
    setStatus(LoadingState.IDLE);
  };

  return (
    <ToolLayout toolId={toolId}>
      <div className="space-y-5">
        
        {/* Drop Zone - only show when no result */}
        {status !== LoadingState.SUCCESS && (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`border-3 border-dashed border-black p-8 text-center cursor-pointer transition-all
              ${file ? 'bg-[#caffbf]' : 'bg-gray-50 hover:bg-gray-100'}
            `}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              accept={accept} 
              onChange={handleFileChange} 
              className="hidden" 
            />
            
            {/* Show image preview if available */}
            {previewUrl ? (
              <div className="mb-4">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="max-h-40 mx-auto border-2 border-black object-contain"
                />
              </div>
            ) : (
              <div className="text-4xl mb-3">
                {file ? '📁' : '📥'}
              </div>
            )}
            
            <h3 className="text-lg font-bold uppercase mb-1">
              {file ? file.name : 'Drop File or Click to Upload'}
            </h3>
            <p className="text-gray-500 font-mono text-sm">
              {file ? `${(file.size / 1024).toFixed(2)} KB` : `Supports: ${accept}`}
            </p>
          </div>
        )}

        {/* Options */}
        {outputFormatOptions && status !== LoadingState.SUCCESS && (
          <div className="border-2 border-black p-4 bg-white">
            <label className="block font-bold uppercase text-sm mb-2">Convert To:</label>
            <div className="flex gap-3 flex-wrap">
              {outputFormatOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => setOption(opt)}
                  className={`px-4 py-2 font-bold border-2 border-black transition-all ${option === opt ? 'bg-black text-white' : 'bg-white hover:bg-gray-200'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action */}
        {status !== LoadingState.SUCCESS && (
          <NeoButton 
            onClick={handleProcess}
            disabled={!file || status === LoadingState.LOADING}
            className="w-full py-3"
          >
            {status === LoadingState.LOADING ? 'Processing...' : buttonLabel}
          </NeoButton>
        )}

        {/* Error */}
        {status === LoadingState.ERROR && (
          <div className="bg-[#ff6b6b] text-white p-4 font-bold border-2 border-black">
            Conversion Failed. Please try a different file.
          </div>
        )}

        {/* Result */}
        {status === LoadingState.SUCCESS && resultUrl && (
          <div className="animate-fadeIn bg-[#e8f5e9] border-2 border-black p-5 neo-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black uppercase">Output</h3>
              <button 
                onClick={handleReset}
                className="text-sm font-bold uppercase hover:underline"
              >
                ← New File
              </button>
            </div>
            
            {/* Show result preview for images */}
            {isResultImage && (
              <div className="mb-4 bg-white border-2 border-black p-3">
                <img 
                  src={resultUrl} 
                  alt="Result" 
                  className="max-h-56 mx-auto object-contain"
                />
              </div>
            )}
            
            <a 
              href={resultUrl} 
              download={`${downloadFileNamePrefix}-${Date.now()}.${downloadExtension}`}
              className="block w-full text-center bg-black text-white font-bold px-4 py-3 border-2 border-black hover:bg-white hover:text-black transition-all"
            >
              Download {downloadExtension.toUpperCase()}
            </a>
          </div>
        )}

      </div>
    </ToolLayout>
  );
};

export default ConverterTool;