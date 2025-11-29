import React, { useState } from 'react';
import ToolLayout from '../ToolLayout';
import NeoButton from '../NeoButton';
import { LoadingState } from '../../types';

interface TextInputToolProps {
    toolId: string;
    placeholder?: string;
    onGenerate: (text: string, options?: any) => Promise<Blob | string | React.ReactNode>;
    downloadExtension?: string;
    generateLabel?: string;
    resultType?: 'download' | 'copy' | 'display'; // Type of result to show
    additionalControls?: React.ReactNode; // Additional input controls
    textAreaRows?: number;
}

const TextInputTool: React.FC<TextInputToolProps> = ({
    toolId,
    placeholder = 'Enter your text here...',
    onGenerate,
    downloadExtension = 'txt',
    generateLabel = 'Generate',
    resultType = 'download',
    additionalControls,
    textAreaRows = 8
}) => {
    const [text, setText] = useState('');
    const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
    const [result, setResult] = useState<any>(null);
    const [resultUrl, setResultUrl] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!text.trim()) return;

        setStatus(LoadingState.LOADING);
        try {
            const output = await onGenerate(text);

            if (output instanceof Blob) {
                const url = URL.createObjectURL(output);
                setResultUrl(url);
            } else if (typeof output === 'string') {
                setResult(output);
            } else {
                // React element
                setResult(output);
            }

            setStatus(LoadingState.SUCCESS);
        } catch (error) {
            console.error(error);
            setStatus(LoadingState.ERROR);
        }
    };

    const handleCopy = () => {
        if (result) {
            navigator.clipboard.writeText(result);
        }
    };

    const handleReset = () => {
        setText('');
        setResult(null);
        setResultUrl(null);
        setStatus(LoadingState.IDLE);
    };

    return (
        <ToolLayout toolId={toolId}>
            <div className="space-y-5">

                {/* Input Section */}
                {status !== LoadingState.SUCCESS && (
                    <div className="bg-white border-2 border-black p-5 neo-shadow space-y-4">
                        <label className="block font-bold uppercase text-sm mb-2">Input Text</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={placeholder}
                            rows={textAreaRows}
                            className="w-full p-3 border-2 border-black font-mono resize-none"
                        />

                        {/* Additional Controls */}
                        {additionalControls}

                        <NeoButton
                            onClick={handleGenerate}
                            disabled={!text.trim() || status === LoadingState.LOADING}
                            className="w-full py-3"
                        >
                            {status === LoadingState.LOADING ? 'Processing...' : generateLabel}
                        </NeoButton>
                    </div>
                )}

                {/* Error */}
                {status === LoadingState.ERROR && (
                    <div className="bg-[#ff6b6b] text-white p-4 font-bold border-2 border-black">
                        Generation Failed. Please try again.
                    </div>
                )}

                {/* Result Section */}
                {status === LoadingState.SUCCESS && (
                    <div className="animate-fadeIn bg-[#e8f5e9] border-2 border-black p-5 neo-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-black uppercase">Output</h3>
                            <button
                                onClick={handleReset}
                                className="text-sm font-bold uppercase hover:underline"
                            >
                                ← New
                            </button>
                        </div>

                        {/* Display result based on type */}
                        {resultType === 'download' && resultUrl && (
                            <a
                                href={resultUrl}
                                download={`output-${Date.now()}.${downloadExtension}`}
                                className="block w-full text-center bg-black text-white font-bold px-4 py-3 border-2 border-black hover:bg-white hover:text-black transition-all"
                            >
                                Download {downloadExtension.toUpperCase()}
                            </a>
                        )}

                        {resultType === 'copy' && result && (
                            <>
                                <textarea
                                    readOnly
                                    value={result}
                                    className="w-full p-3 border-2 border-black font-mono text-sm h-36 bg-white mb-4"
                                />
                                <NeoButton onClick={handleCopy} className="w-full bg-white hover:bg-gray-100 text-black">
                                    Copy to Clipboard
                                </NeoButton>
                            </>
                        )}

                        {resultType === 'display' && result && (
                            <div className="bg-white border-2 border-black p-4">
                                {result}
                            </div>
                        )}
                    </div>
                )}

            </div>
        </ToolLayout>
    );
};

export default TextInputTool;
