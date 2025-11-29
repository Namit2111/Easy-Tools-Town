import React, { useState, useRef } from 'react';
import ToolLayout from '../ToolLayout';
import NeoButton from '../NeoButton';

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
                setContent(<div className="text-red-500 font-bold">Error reading file.</div>);
            }
        }
    };

    return (
        <ToolLayout toolId={toolId}>
            <div className="space-y-8">
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-4 border-dashed border-black p-12 text-center cursor-pointer transition-all
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
                    <div className="text-6xl mb-4">{file ? '👁️' : '📥'}</div>
                    <h3 className="text-2xl font-bold uppercase mb-2">
                        {file ? file.name : 'Drop File to View'}
                    </h3>
                </div>

                {content && (
                    <div className="bg-white border-4 border-black p-8 neo-shadow overflow-auto max-h-[600px]">
                        {content}
                        <NeoButton onClick={() => { setFile(null); setContent(null); }} className="mt-8 w-full">
                            View Another
                        </NeoButton>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default ViewerTool;
