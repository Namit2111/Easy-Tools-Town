// components/ToolPageClient.tsx (Client Component)
"use client";

import Link from "next/link";
import { FileText, Image, File, FileType, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import templates
import FileUploadTemplate from "./templates/FileUploadTemplate";
import TextInputTemplate from "./templates/TextInputTemplate";
import ConverterTemplate from "./templates/ConverterTemplate";
import GeneratorTemplate from "./templates/GeneratorTemplate";

// Import specific tool implementations
import { 
  WordCounterTool, 
  PasswordGeneratorTool,
  PdfMergerTool,
  PdfToWordTool,
  ImageResizerTool,
  ImageToPdfTool,
  ZipExtractorTool,
  FileConverterTool
} from "./tools";

interface Tool {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  slug: string;
  template: 'file-upload' | 'text-input' | 'converter' | 'generator';
  popular?: boolean;
}

interface ToolPageClientProps {
  tool: Tool;
  relatedTools: Tool[];
}

export default function ToolPageClient({ tool, relatedTools }: ToolPageClientProps) {
  const getToolIcon = (category: string, size = 5) => {
    const className = `h-${size} w-${size} ${size > 5 ? "text-[#1e5a87]" : "text-[#1e5a87]"}`

    switch (category) {
      case "pdf":
        return <FileText className={className} />
      case "image":
        return <Image className={className} />
      case "file":
        return <File className={className} />
      case "text":
        return <FileType className={className} />
      default:
        return <FileType className={className} />
    }
  }

  const renderToolContent = () => {
    // Route to specific tool implementations based on slug
    switch (tool.slug) {
      // Text tools
      case 'word-counter':
        return <WordCounterTool tool={tool} />;
      case 'password-generator':
        return <PasswordGeneratorTool tool={tool} />;
      
      // PDF tools
      case 'pdf-merger':
        return <PdfMergerTool tool={tool} />;
      case 'pdf-to-word':
        return <PdfToWordTool tool={tool} />;
      
      // Image tools
      case 'image-resizer':
        return <ImageResizerTool tool={tool} />;
      case 'image-to-pdf':
        return <ImageToPdfTool tool={tool} />;
      
      // File tools
      case 'zip-extractor':
        return <ZipExtractorTool tool={tool} />;
      case 'file-converter':
        return <FileConverterTool tool={tool} />;
      
      // Fallback to generic templates (shouldn't happen with current tools)
      default:
        switch (tool.template) {
          case 'file-upload':
            return (
              <FileUploadTemplate
                tool={tool}
                acceptedTypes={getAcceptedTypes(tool.category)}
                maxFiles={tool.slug.includes('merger') ? 10 : 1}
              />
            );
          case 'text-input':
            return <TextInputTemplate tool={tool} />;
          case 'converter':
            return (
              <ConverterTemplate
                tool={tool}
                fromFormat={getFromFormat(tool.slug)}
                toFormat={getToFormat(tool.slug)}
                acceptedTypes={getAcceptedTypes(tool.category)}
              />
            );
          case 'generator':
            return <GeneratorTemplate tool={tool} />;
          default:
            return <FileUploadTemplate tool={tool} />;
        }
    }
  };

  const getAcceptedTypes = (category: string): string => {
    switch (category) {
      case 'pdf':
        return '.pdf';
      case 'image':
        return '.jpg,.jpeg,.png,.gif,.bmp,.webp';
      case 'file':
        return '*';
      default:
        return '*';
    }
  };

  const getFromFormat = (slug: string): string => {
    if (slug.includes('pdf-to-')) return 'PDF';
    if (slug.includes('image-to-')) return 'Image';
    return 'File';
  };

  const getToFormat = (slug: string): string => {
    if (slug.includes('-to-word')) return 'Word';
    if (slug.includes('-to-pdf')) return 'PDF';
    if (slug.includes('-to-excel')) return 'Excel';
    return 'File';
  };

  const getHelpContent = (template: string) => {
    switch (template) {
      case 'file-upload':
        return (
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li>Upload your files by dragging and dropping them or clicking the upload area</li>
            <li>Review the selected files in the list</li>
            <li>Click the "Process" button to start processing your files</li>
            <li>Download the processed result when complete</li>
          </ol>
        );
      case 'text-input':
        return (
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li>Enter or paste your text in the input area</li>
            <li>Click the "Process Text" button</li>
            <li>View the results in the output area</li>
            <li>Copy or download the result as needed</li>
          </ol>
        );
      case 'converter':
        return (
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li>Upload the file you want to convert</li>
            <li>The tool will automatically detect the input format</li>
            <li>Click "Convert" to start the conversion process</li>
            <li>Download the converted file when ready</li>
          </ol>
        );
      case 'generator':
        return (
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li>Adjust the generation options if available</li>
            <li>Click the "Generate" button</li>
            <li>View the generated content</li>
            <li>Copy or download the result as needed</li>
          </ol>
        );
      default:
        return (
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li>Follow the on-screen instructions</li>
            <li>Process your input using the tool</li>
            <li>Download or copy the result</li>
          </ol>
        );
    }
  };

  const getHelpTips = (template: string) => {
    switch (template) {
      case 'file-upload':
        return [
          <li key="1">For best results, use high-quality input files</li>,
          <li key="2">The maximum file size is 100MB per file</li>,
          <li key="3">Multiple files can be processed at once for supported tools</li>
        ];
      case 'text-input':
        return [
          <li key="1">Large text inputs are supported</li>,
          <li key="2">Results are processed instantly</li>,
          <li key="3">Use the copy button for quick clipboard access</li>
        ];
      case 'converter':
        return [
          <li key="1">Ensure your input file is in the correct format</li>,
          <li key="2">Conversion quality depends on the source file</li>,
          <li key="3">Some conversions may take longer for large files</li>
        ];
      case 'generator':
        return [
          <li key="1">Adjust options to customize the output</li>,
          <li key="2">Generated content is created instantly</li>,
          <li key="3">You can generate multiple variations</li>
        ];
      default:
        return [
          <li key="1">All processing is done locally in your browser</li>,
          <li key="2">Your files are never uploaded to our servers</li>,
          <li key="3">Results can be downloaded or copied to clipboard</li>
        ];
    }
  };

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
        <Tabs defaultValue="tool" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="tool">Tool</TabsTrigger>
            <TabsTrigger value="help">Help</TabsTrigger>
          </TabsList>

          <TabsContent value="tool" className="space-y-6">
            {renderToolContent()}
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

              {getHelpContent(tool.template)}

              <div className="bg-blue-50 p-4 rounded-lg mt-6">
                <h4 className="font-medium mb-2">Tips</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {getHelpTips(tool.template)}
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
