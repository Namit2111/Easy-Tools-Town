"use client";

import { useState } from "react";
import { Upload, Download, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConverterTemplateProps {
  tool: {
    name: string;
    description: string;
    category: string;
  };
  fromFormat: string;
  toFormat: string;
  acceptedTypes?: string;
  onConvert?: (file: File) => Promise<Blob>;
}

export default function ConverterTemplate({ 
  tool, 
  fromFormat,
  toFormat,
  acceptedTypes = "*",
  onConvert 
}: ConverterTemplateProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setIsComplete(false);
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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setIsComplete(false);
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    
    setIsConverting(true);
    
    try {
      if (onConvert) {
        const result = await onConvert(file);
        setResultBlob(result);
      } else {
        // Default simulation - just return the original file
        setResultBlob(file);
      }
      setIsComplete(true);
    } catch (error) {
      console.error('Conversion failed:', error);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!resultBlob || !file) return;
    
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement('a');
    a.href = url;
    const baseName = file.name.split('.').slice(0, -1).join('.');
    a.download = `${baseName}.${toFormat.toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setFile(null);
    setIsComplete(false);
    setResultBlob(null);
  };

  if (isComplete && resultBlob) {
    return (
      <div className="text-center space-y-6">
        <div className="bg-green-100 text-green-800 p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-2">Conversion Complete!</h3>
          <p>Your file has been successfully converted from {fromFormat} to {toFormat}.</p>
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={handleDownload} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download {toFormat} File
          </Button>
        </div>

        <Button variant="link" onClick={handleReset}>
          Convert another file
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Conversion Flow Indicator */}
      <div className="flex items-center justify-center gap-4 p-4 bg-blue-50 rounded-lg">
        <div className="text-center">
          <div className="font-medium text-blue-900">{fromFormat}</div>
          <div className="text-sm text-blue-600">Input Format</div>
        </div>
        <ArrowRight className="h-6 w-6 text-blue-600" />
        <div className="text-center">
          <div className="font-medium text-blue-900">{toFormat}</div>
          <div className="text-sm text-blue-600">Output Format</div>
        </div>
      </div>

      {/* File Upload Area */}
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
        <h3 className="text-lg font-medium mb-2">Upload {fromFormat} file</h3>
        <p className="text-gray-500 mb-4">
          Drag and drop your {fromFormat} file here or click to browse
        </p>
        <input 
          id="file-upload" 
          type="file" 
          accept={acceptedTypes}
          className="hidden" 
          onChange={handleFileChange} 
        />
        <Button>Select {fromFormat} File</Button>
      </div>

      {/* Selected File */}
      {file && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-white rounded border">
            <span className="flex-1 truncate">{file.name}</span>
            <span className="text-sm text-gray-500">
              {(file.size / 1024).toFixed(1)} KB
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <Button 
            className="w-full" 
            onClick={handleConvert} 
            disabled={isConverting}
          >
            {isConverting ? "Converting..." : `Convert to ${toFormat}`}
          </Button>
        </div>
      )}
    </div>
  );
}