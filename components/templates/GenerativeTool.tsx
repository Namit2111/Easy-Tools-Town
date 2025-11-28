import React, { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import NeoButton from '@/components/NeoButton';
import { LoadingState } from '@/types';

interface GenerativeToolProps {
  toolId: string;
  inputType?: 'text' | 'image' | 'custom';
  inputPlaceholder?: string;
  buttonLabel?: string;
  onGenerate: (input: any) => Promise<string>; // Returns the result string
  renderCustomInput?: (value: any, onChange: (val: any) => void) => React.ReactNode;
  renderResult?: (result: string) => React.ReactNode;
}

const GenerativeTool: React.FC<GenerativeToolProps> = ({ 
  toolId, 
  inputType = 'text', 
  inputPlaceholder = 'Enter your input...', 
  buttonLabel = 'Generate',
  onGenerate,
  renderCustomInput,
  renderResult
}) => {
  const [input, setInput] = useState<any>(inputType === 'text' ? '' : null);
  const [result, setResult] = useState('');
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);

  const handleSubmit = async () => {
    if (!input && inputType !== 'custom') return;
    setStatus(LoadingState.LOADING);
    try {
      const res = await onGenerate(input);
      setResult(res);
      setStatus(LoadingState.SUCCESS);
    } catch (e) {
      console.error(e);
      setStatus(LoadingState.ERROR);
    }
  };

  return (
    <ToolLayout toolId={toolId}>
      <div className="space-y-6">
        
        {/* Input Section */}
        <div>
          {renderCustomInput ? (
             renderCustomInput(input, setInput)
          ) : inputType === 'text' ? (
            <textarea 
              value={input} 
              onChange={e => setInput(e.target.value)}
              className="w-full p-4 border-2 border-black text-lg h-40 focus:neo-shadow focus:outline-none bg-gray-50 resize-none" 
              placeholder={inputPlaceholder}
            />
          ) : inputType === 'image' ? (
             <input 
               type="file" 
               accept="image/*"
               onChange={(e) => {
                 if(e.target.files?.[0]) setInput(e.target.files[0]);
               }}
               className="w-full p-4 border-2 border-black bg-white" 
             />
          ) : null}
        </div>

        {/* Action Button */}
        <NeoButton 
          onClick={handleSubmit} 
          disabled={status === LoadingState.LOADING || (!input && inputType !== 'custom')} 
          className="w-full text-xl py-4"
        >
          {status === LoadingState.LOADING ? 'Processing...' : buttonLabel}
        </NeoButton>

        {/* Error State */}
        {status === LoadingState.ERROR && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 font-bold">
            <p>Something went wrong. Please try again.</p>
          </div>
        )}

        {/* Output Section */}
        {result && (
          <div className="mt-8 animate-fadeIn">
            <h3 className="font-bold uppercase mb-2 text-gray-500">Result:</h3>
            {renderResult ? (
              renderResult(result)
            ) : (
              <div className="bg-white border-2 border-black p-6 whitespace-pre-wrap font-mono text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                {result}
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default GenerativeTool;