import React, { useState, useRef, useMemo } from 'react';
import ToolLayout from '../ToolLayout';
import NeoButton from '../NeoButton';

interface RenamerToolProps {
    toolId: string;
    accept: string;
    onRename: (file: File, newName: string) => Promise<Blob | File>;
    defaultExtension?: string;
}

const RenamerTool: React.FC<RenamerToolProps> = ({ toolId, accept, onRename, defaultExtension }) => {
    const [file, setFile] = useState<File | null>(null);
    const [newName, setNewName] = useState('');
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const f = e.target.files[0];
            setFile(f);
            setNewName(f.name.split('.').slice(0, -1).join('.'));
            setResultUrl(null);
            
            // Create preview for image files
            if (f.type.startsWith('image/')) {
                const url = URL.createObjectURL(f);
                setPreviewUrl(url);
            } else {
                setPreviewUrl(null);
            }
        }
    };

    const handleProcess = async () => {
        if (!file || !newName) return;
        try {
            const result = await onRename(file, newName);
            const url = URL.createObjectURL(result);
            setResultUrl(url);
        } catch (error) {
            console.error(error);
            alert('Error renaming file');
        }
    };

    const handleReset = () => {
        setFile(null);
        setNewName('');
        setResultUrl(null);
        setPreviewUrl(null);
    };

    return (
        <ToolLayout toolId={toolId}>
            <div className="space-y-5">
                {!resultUrl && (
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
                                    className="max-h-32 mx-auto border-2 border-black object-contain"
                                />
                            </div>
                        ) : (
                            <div className="text-4xl mb-3">{file ? '📝' : '📥'}</div>
                        )}
                        
                        <h3 className="text-lg font-bold uppercase mb-1">
                            {file ? file.name : 'Drop File to Rename'}
                        </h3>
                    </div>
                )}

                {file && !resultUrl && (
                    <div className="bg-white border-2 border-black p-5 space-y-4">
                        <label className="block font-bold uppercase text-sm">New Filename</label>
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full p-3 border-2 border-black font-mono"
                            placeholder="Enter new name..."
                        />
                        <NeoButton onClick={handleProcess} className="w-full py-3">
                            Rename File
                        </NeoButton>
                    </div>
                )}

                {resultUrl && (
                    <div className="animate-fadeIn bg-[#e8f5e9] border-2 border-black p-5 neo-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-black uppercase">Renamed</h3>
                            <button 
                                onClick={handleReset}
                                className="text-sm font-bold uppercase hover:underline"
                            >
                                ← New File
                            </button>
                        </div>
                        <p className="font-mono mb-4 p-3 bg-white border border-gray-200">
                            {newName}{defaultExtension ? '.' + defaultExtension : ''}
                        </p>
                        <a
                            href={resultUrl}
                            download={`${newName}${defaultExtension ? '.' + defaultExtension : ''}`}
                            className="block w-full text-center bg-black text-white font-bold px-4 py-3 border-2 border-black hover:bg-white hover:text-black transition-all"
                        >
                            Download File
                        </a>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default RenamerTool;
