'use client';

import React, { useState, useRef } from 'react';
import ToolLayout from '@/components/ToolLayout';

interface ViewerToolProps {
    toolId: string;
    accept: string;
    onView: (file: File) => Promise<React.ReactNode>;
}

const ViewerTool: React.FC<ViewerToolProps> = ({ toolId, accept, onView }) => {
    const [file, setFile] = useState<File | null>(null);
    const [content, setContent] = useState<React.ReactNode | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const f = e.target.files[0];
            setFile(f);
            try {
                const result = await onView(f);
                setContent(result);
            } catch (error) {
                console.error(error);
                setContent(<div className="text-red-500 text-sm font-bold">Error reading file.</div>);
            }
        }
    };

    return (
        <ToolLayout toolId={toolId}>
            <div className="space-y-5">
                {!content && (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-3 border-dashed border-black p-8 text-center cursor-pointer transition-all
                            ${file ? 'bg-[#ffc6ff]' : 'bg-gray-50 hover:bg-gray-100'}
                        `}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept={accept}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <div className="text-4xl mb-3">{file ? '👁️' : '📥'}</div>
                        <h3 className="text-lg font-bold uppercase mb-1">
                            {file ? file.name : 'Drop File to View'}
                        </h3>
                    </div>
                )}

                {content && (
                    <div className="bg-white border-2 border-black p-5 neo-shadow overflow-auto max-h-[500px]">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                            <span className="text-sm font-bold uppercase text-gray-600">{file?.name}</span>
                            <button 
                                onClick={() => { setFile(null); setContent(null); }} 
                                className="text-sm font-bold uppercase hover:underline"
                            >
                                ← New File
                            </button>
                        </div>
                        {content}
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default ViewerTool;
