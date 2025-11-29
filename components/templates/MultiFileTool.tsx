'use client';

import React, { useState, useRef } from 'react';
import ToolLayout from '@/components/ToolLayout';
import NeoButton from '@/components/NeoButton';
import { LoadingState } from '@/lib/types';

interface MultiFileToolProps {
    toolId: string;
    accept: string;
    onProcess: (files: File[]) => Promise<Blob | string>;
    buttonLabel?: string;
    downloadFileName?: string;
    downloadExtension?: string;
}

const MultiFileTool: React.FC<MultiFileToolProps> = ({
    toolId,
    accept,
    onProcess,
    buttonLabel = 'Process Files',
    downloadFileName = 'output',
    downloadExtension = 'zip'
}) => {
    const [files, setFiles] = useState<File[]>([]);
    const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...newFiles]);
            setResultUrl(null);
            setStatus(LoadingState.IDLE);
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

    const handleProcess = async () => {
        if (files.length === 0) return;

        setStatus(LoadingState.LOADING);
        try {
            const result = await onProcess(files);

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
        setFiles([]);
        setResultUrl(null);
        setStatus(LoadingState.IDLE);
    };

    return (
        <ToolLayout toolId={toolId}>
            <div className="space-y-5">

                {status !== LoadingState.SUCCESS && (
                    <>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-3 border-dashed border-black p-8 text-center cursor-pointer transition-all bg-gray-50 hover:bg-gray-100"
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept={accept}
                                multiple
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <div className="text-4xl mb-3">📎</div>
                            <h3 className="text-lg font-bold uppercase">Add Files</h3>
                            <p className="text-sm text-gray-600 mt-2">Click to add more files ({files.length} added)</p>
                        </div>

                        {files.length > 0 && (
                            <div className="bg-white border-2 border-black p-5 space-y-3">
                                <h3 className="font-bold uppercase text-sm border-b-2 border-black pb-2">
                                    Files ({files.length})
                                </h3>
                                {files.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-[#caffbf] border-2 border-black">
                                        <span className="font-mono text-sm truncate flex-1">
                                            {index + 1}. {file.name}
                                        </span>
                                        <div className="flex gap-2 ml-3">
                                            <button
                                                onClick={() => moveFile(index, 'up')}
                                                disabled={index === 0}
                                                className="px-2 py-1 bg-white border border-black disabled:opacity-30"
                                            >
                                                ↑
                                            </button>
                                            <button
                                                onClick={() => moveFile(index, 'down')}
                                                disabled={index === files.length - 1}
                                                className="px-2 py-1 bg-white border border-black disabled:opacity-30"
                                            >
                                                ↓
                                            </button>
                                            <button
                                                onClick={() => removeFile(index)}
                                                className="px-2 py-1 bg-black text-white border border-black"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <NeoButton
                                    onClick={handleProcess}
                                    disabled={files.length === 0 || status === LoadingState.LOADING}
                                    className="w-full py-3"
                                >
                                    {status === LoadingState.LOADING ? 'Processing...' : buttonLabel}
                                </NeoButton>
                            </div>
                        )}
                    </>
                )}

                {status === LoadingState.ERROR && (
                    <div className="bg-[#ff6b6b] text-white p-4 font-bold border-2 border-black">
                        Processing Failed. Please try again.
                    </div>
                )}

                {status === LoadingState.SUCCESS && resultUrl && (
                    <div className="animate-fadeIn bg-[#e8f5e9] border-2 border-black p-5 neo-shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-black uppercase">Success!</h3>
                            <button
                                onClick={handleReset}
                                className="text-sm font-bold hover:underline"
                            >
                                ← Process More
                            </button>
                        </div>
                        <p className="text-sm mb-4">Processed {files.length} file(s).</p>
                        <a
                            href={resultUrl}
                            download={`${downloadFileName}-${Date.now()}.${downloadExtension}`}
                            className="block w-full text-center bg-black text-white font-bold py-3 hover:bg-white hover:text-black border-2 border-black transition-all"
                        >
                            Download {downloadExtension.toUpperCase()}
                        </a>
                    </div>
                )}

            </div>
        </ToolLayout>
    );
};

export default MultiFileTool;
