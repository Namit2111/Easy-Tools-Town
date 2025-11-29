import React, { useState, useRef } from 'react';
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
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const f = e.target.files[0];
            setFile(f);
            setNewName(f.name.split('.').slice(0, -1).join('.'));
            setResultUrl(null);
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

    return (
        <ToolLayout toolId={toolId}>
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
                        accept={accept}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <div className="text-6xl mb-4">{file ? '📝' : '📥'}</div>
                    <h3 className="text-2xl font-bold uppercase mb-2">
                        {file ? file.name : 'Drop File to Rename'}
                    </h3>
                </div>

                {file && (
                    <div className="bg-white border-4 border-black p-8 space-y-4">
                        <label className="block font-bold uppercase">New Filename</label>
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full p-4 border-2 border-black font-mono text-xl"
                            placeholder="Enter new name..."
                        />
                        <NeoButton onClick={handleProcess} className="w-full">
                            Rename File
                        </NeoButton>
                    </div>
                )}

                {resultUrl && (
                    <div className="animate-fadeIn bg-[#9bf6ff] border-4 border-black p-8 text-center neo-shadow">
                        <h3 className="text-2xl font-black uppercase mb-4">Ready!</h3>
                        <a
                            href={resultUrl}
                            download={`${newName}${defaultExtension ? '.' + defaultExtension : ''}`}
                            className="inline-block bg-black text-white font-bold text-xl px-8 py-4 border-4 border-white hover:bg-white hover:text-black hover:border-black transition-all"
                        >
                            DOWNLOAD RENAMED FILE
                        </a>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default RenamerTool;
