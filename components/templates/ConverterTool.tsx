import React, { useState, useRef } from 'react';
import ToolLayout from '../ToolLayout';
import NeoButton from '../NeoButton';
import { LoadingState } from '../../types';

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResultUrl(null);
      setStatus(LoadingState.IDLE);
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

  return (
    <ToolLayout toolId={toolId}>
      <div className="space-y-8">
        
        {/* Drop Zone */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={`border-4 border-dashed border-black p-12 text-center cursor-pointer transition-all
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
          <div className="text-6xl mb-4">
            {file ? '📁' : '📥'}
          </div>
          <h3 className="text-2xl font-bold uppercase mb-2">
            {file ? file.name : 'Drop File or Click to Upload'}
          </h3>
          <p className="text-gray-500 font-mono text-sm">
            {file ? `${(file.size / 1024).toFixed(2)} KB` : `Supports: ${accept}`}
          </p>
        </div>

        {/* Options */}
        {outputFormatOptions && (
          <div className="border-2 border-black p-4 bg-white">
            <label className="block font-bold uppercase mb-2">Convert To:</label>
            <div className="flex gap-4">
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
        <NeoButton 
          onClick={handleProcess}
          disabled={!file || status === LoadingState.LOADING}
          className="w-full text-xl py-4"
        >
          {status === LoadingState.LOADING ? 'Processing...' : buttonLabel}
        </NeoButton>

        {/* Error */}
        {status === LoadingState.ERROR && (
          <div className="bg-[#ff6b6b] text-white p-4 font-bold border-4 border-black">
            Conversion Failed. Please try a different file.
          </div>
        )}

        {/* Result */}
        {status === LoadingState.SUCCESS && resultUrl && (
          <div className="animate-fadeIn bg-[#9bf6ff] border-4 border-black p-8 text-center neo-shadow">
            <h3 className="text-2xl font-black uppercase mb-4">Ready!</h3>
            <a 
              href={resultUrl} 
              download={`${downloadFileNamePrefix}-${Date.now()}.${downloadExtension}`}
              className="inline-block bg-black text-white font-bold text-xl px-8 py-4 border-4 border-white hover:bg-white hover:text-black hover:border-black transition-all"
            >
              DOWNLOAD FILE
            </a>
          </div>
        )}

      </div>
    </ToolLayout>
  );
};

export default ConverterTool;