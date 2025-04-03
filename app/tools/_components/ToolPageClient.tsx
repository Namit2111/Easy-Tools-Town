// components/ToolPageClient.tsx (Client Component)
"use client";

import { useState } from "react";
import type React from "react";
import Link from "next/link";
import { FileText, Image, File, FileType, Upload, Download, Share2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Tool {
  id: string;
  name: string;
  category: string;
  description: string;
  slug: string;
}

interface ToolPageClientProps {
  tool: Tool;
  relatedTools: Tool[];
}

export default function ToolPageClient({ tool, relatedTools }: ToolPageClientProps) {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

 
  const getToolIcon = (category: string, size = 5) => {
    const className = `h-${size} w-${size} ${size > 5 ? "text-[#1e5a87]" : "text-[#1e5a87]"}`

    switch (category) {
      case "pdf":
        return <FileText className={className} />
      case "image":
        return <Image className={className} />
      case "file":
        return <File className={className} />
      default:
        return <FileType className={className} />
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleProcess = () => {
    if (files.length === 0) return

    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
    }, 2000)
  }

  const handleReset = () => {
    setFiles([])
    setIsComplete(false)
  }

  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="mb-8">
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-700 hover:text-[#1e5a87]">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link href="/" className="text-gray-700 hover:text-[#1e5a87]">
                  Tools
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">{tool.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Tool Title and Description */}
        <div className="flex items-center gap-3 mb-2">
          {getToolIcon(tool.category, 8)}
          <h1 className="text-3xl md:text-4xl font-bold">{tool.name}</h1>
        </div>
        <p className="text-lg text-gray-600 mb-6">{tool.description}</p>
      </div>

      {/* Tool Functionality */}
      <div className="bg-[#f0f0d8] rounded-lg p-6 mb-12">
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="options">Options</TabsTrigger>
            <TabsTrigger value="help">Help</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
                 {!isComplete ? (
                  <>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#1e5a87] transition-colors"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-medium mb-2">Upload your files</h3>
                      <p className="text-gray-500 mb-4">Drag and drop files here or click to browse</p>
                      <input id="file-upload" type="file" multiple className="hidden" onChange={handleFileChange} />
                      <Button>Select Files</Button>
                    </div>

                    {files.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="font-medium">Selected Files:</h3>
                        <ul className="space-y-2">
                          {files.map((file, index) => (
                            <li key={index} className="flex items-center gap-2 p-2 bg-white rounded">
                              {getToolIcon(tool.category)}
                              <span>{file.name}</span>
                              <span className="text-sm text-gray-500 ml-auto">{(file.size / 1024).toFixed(1)} KB</span>
                            </li>
                          ))}
                        </ul>

                        <Button className="w-full" onClick={handleProcess} disabled={isProcessing}>
                          {isProcessing
                            ? "Processing..."
                            : `Process ${files.length} ${files.length === 1 ? "file" : "files"}`}
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
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
                 )}
              </TabsContent>
          <TabsContent value="options">
                 <div className="bg-white rounded-lg p-6">
                   <h3 className="text-lg font-medium mb-4">Processing Options</h3>
                  <div className="space-y-4">
                     <div>
                       <label className="block text-sm font-medium mb-1">Quality</label>
                       <select className="w-full p-2 border rounded">
                         <option>High (Recommended)</option>
                         <option>Medium</option>
                         <option>Low</option>
                       </select>
                     </div>
                    <div>
                       <label className="block text-sm font-medium mb-1">Output Format</label>
                       <select className="w-full p-2 border rounded">
                         <option>Same as input</option>
                         <option>PDF</option>
                         <option>JPG</option>
                         <option>PNG</option>
                       </select>
                     </div>

                     <div className="flex items-center">
                       <input type="checkbox" id="advanced" className="mr-2" />
                       <label htmlFor="advanced">Show advanced options</label>
                     </div>
                   </div>
                 </div>
               </TabsContent>
          <TabsContent value="help">
          <div className="bg-white rounded-lg p-6">
                   <div className="flex items-start gap-3 mb-4">
                     <Info className="h-5 w-5 text-[#1e5a87] mt-1" />
                     <div>
                       <h3 className="text-lg font-medium mb-2">How to use {tool.name}</h3>
                       <p className="text-gray-600">
                         This tool allows you to {tool.description.toLowerCase()}. Follow these simple steps:
                       </p>
                     </div>
                   </div>
                   <ol className="list-decimal pl-6 space-y-2 mb-6">
                     <li>Upload your files by dragging and dropping them or clicking the upload area</li>
                     <li>Select the processing options that suit your needs</li>
                     <li>Click the "Process" button to start processing your files</li>
                     <li>Download the processed result when complete</li>
                   </ol>
                   <div className="bg-blue-50 p-4 rounded-lg">
                     <h4 className="font-medium mb-2">Tips</h4>
                     <ul className="list-disc pl-5 space-y-1 text-sm">
                       <li>For best results, use high-quality input files</li>
                       <li>The maximum file size is 100MB per file</li>
                       <li>Supported formats: PDF, JPG, PNG, DOCX</li>
                     </ul>
                   </div>
                 </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Tools */}
      <div className="mb-12">
             <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
               {relatedTools.map((relatedTool) => (
                 <Link
                   href={`/tools/${relatedTool.slug}`}
                   key={relatedTool.id}
                   className="bg-[#f0f0d8] p-4 rounded-md hover:bg-[#e5e5c3] transition-colors"
                 >
                   <div className="flex items-start gap-3">
                     <div className="mt-0.5">{getToolIcon(relatedTool.category)}</div>
                     <div>
                       <h3 className="font-medium mb-1">{relatedTool.name}</h3>
                       <p className="text-sm text-gray-600">{relatedTool.description}</p>
                    </div>
                   </div>
                </Link>
              ))}
             </div>
           </div>
    </>
  );
}
