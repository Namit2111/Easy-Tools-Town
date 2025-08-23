"use client";

import { useState } from "react";
import { Upload, Download, Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadTemplateProps {
  tool: {
    name: string;
    description: string;
    category: string;
  };
  acceptedTypes?: string;
  maxFiles?: number;
  onProcess?: (files: File[]) => Promise<void>;
}

export default function FileUploadTemplate({ 
  tool, 
  acceptedTypes = "*", 
  maxFiles = 10,
  onProcess 
}: FileUploadTemplateProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).slice(0, maxFiles);
      setFiles(newFiles);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).slice(0, maxFiles);
      setFiles(newFiles);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    
    setIsProcessing(true);
    
    try {
      if (onProcess) {
        await onProcess(files);
      } else {
        // Default simulation
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      setIsComplete(true);
    } catch (error) {
      console.error('Processing failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <div className="text-center space-y-6">
        <div className="bg-green-100 text-green-800 p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-2">Processing Complete!</h3>
          <p>Your files have been successfully processed.</p>
        </div>

        <div className="flex justify-center gap-4">
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Result
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>

        <Button variant="link" onClick={handleReset}>
          Process another file
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          dragActive 
            ? "border-[#1e5a87] bg-blue-50" 
            : "border-gray-300 hover:border-[#1e5a87]"
        }`}
        onClick={() => document.getElementById("file-upload")?.click()}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium mb-2">Upload your files</h3>
        <p className="text-gray-500 mb-4">
          Drag and drop files here or click to browse
        </p>
        <input 
          id="file-upload" 
          type="file" 
          multiple={maxFiles > 1}
          accept={acceptedTypes}
          className="hidden" 
          onChange={handleFileChange} 
        />
        <Button>Select Files</Button>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Selected Files ({files.length}/{maxFiles}):</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {files.map((file, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-white rounded border">
                <span className="flex-1 truncate">{file.name}</span>
                <span className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button 
            className="w-full" 
            onClick={handleProcess} 
            disabled={isProcessing}
          >
            {isProcessing
              ? "Processing..."
              : `Process ${files.length} ${files.length === 1 ? "file" : "files"}`}
          </Button>
        </div>
      )}
    </div>
  );
}