"use client";

import { useState } from "react";
import { Copy, Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TextInputTemplateProps {
  tool: {
    name: string;
    description: string;
    category: string;
  };
  placeholder?: string;
  outputLabel?: string;
  onProcess?: (text: string) => Promise<string> | string;
}

export default function TextInputTemplate({ 
  tool, 
  placeholder = "Enter your text here...",
  outputLabel = "Result",
  onProcess 
}: TextInputTemplateProps) {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = async () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    
    try {
      if (onProcess) {
        const result = await onProcess(inputText);
        setOutputText(result);
      } else {
        // Default behavior - just echo the input
        setOutputText(inputText);
      }
    } catch (error) {
      console.error('Processing failed:', error);
      setOutputText("Error processing text");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tool.name.toLowerCase().replace(/\s+/g, '-')}-result.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInputText("");
    setOutputText("");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Input Text</label>
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={placeholder}
            className="min-h-[200px] resize-y"
          />
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={handleProcess} 
            disabled={!inputText.trim() || isProcessing}
            className="flex-1"
          >
            {isProcessing ? "Processing..." : `Process Text`}
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {outputText && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">{outputLabel}</label>
            <Textarea
              value={outputText}
              readOnly
              className="min-h-[200px] bg-gray-50 resize-y"
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCopy} className="flex items-center gap-2">
              <Copy className="h-4 w-4" />
              Copy
            </Button>
            <Button variant="outline" onClick={handleDownload} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}