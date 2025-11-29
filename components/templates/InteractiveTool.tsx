import React, { useState, useRef, useEffect } from 'react';
import ToolLayout from '../ToolLayout';
import NeoButton from '../NeoButton';
import { LoadingState } from '../../types';

interface InteractiveToolProps {
    toolId: string;
    accept: string;
    children?: (controls: { canvas: HTMLCanvasElement | null }) => React.ReactNode;
    onCanvasReady?: (canvas: HTMLCanvasElement, file: File) => void;
    downloadFileName?: string;
}

const InteractiveTool: React.FC<InteractiveToolProps> = ({
    toolId,
    accept,
    children,
    onCanvasReady,
    downloadFileName = 'output'
}) => {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const newFile = e.target.files[0];
            setFile(newFile);
            setStatus(LoadingState.IDLE);
        }
    };

    useEffect(() => {
        if (file && canvasRef.current) {
            const img = new Image();
            img.onload = () => {
                const canvas = canvasRef.current!;
                const ctx = canvas.getContext('2d')!;
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                if (onCanvasReady) {
                    onCanvasReady(canvas, file);
                }
                setStatus(LoadingState.SUCCESS);
            };
            img.src = URL.createObjectURL(file);
        }
    }, [file, onCanvasReady]);

    const handleDownload = () => {
        if (!canvasRef.current) return;

        canvasRef.current.toBlob((blob) => {
            if (blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${downloadFileName}-${Date.now()}.png`;
                a.click();
            }
        });
    };

    const handleReset = () => {
        setFile(null);
        setStatus(LoadingState.IDLE);
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    };

    return (
        <ToolLayout toolId={toolId}>
            <div className="space-y-5">

                {/* File Upload */}
                {!file && (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-3 border-dashed border-black p-8 text-center cursor-pointer transition-all bg-gray-50 hover:bg-gray-100"
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept={accept}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <div className="text-4xl mb-3">📥</div>
                        <h3 className="text-lg font-bold uppercase mb-1">Drop File or Click to Upload</h3>
                        <p className="text-gray-500 font-mono text-sm">Supports: {accept}</p>
                    </div>
                )}

                {/* Interactive Controls */}
                {file && children && (
                    <div className="border-2 border-black p-4 bg-white">
                        {children({ canvas: canvasRef.current })}
                    </div>
                )}

                {/* Canvas Preview */}
                {file && (
                    <div className="bg-white border-2 border-black p-4 neo-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-black uppercase">Preview</h3>
                            <button
                                onClick={handleReset}
                                className="text-sm font-bold uppercase hover:underline"
                            >
                                ← New File
                            </button>
                        </div>
                        <div className="bg-gray-100 border-2 border-black p-3 flex items-center justify-center min-h-[300px]">
                            <canvas ref={canvasRef} className="max-w-full" />
                        </div>
                    </div>
                )}

                {/* Download Button */}
                {file && status === LoadingState.SUCCESS && (
                    <NeoButton onClick={handleDownload} className="w-full py-3">
                        Download Image
                    </NeoButton>
                )}

            </div>
        </ToolLayout>
    );
};

export default InteractiveTool;
