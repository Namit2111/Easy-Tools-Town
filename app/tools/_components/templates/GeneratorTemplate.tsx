"use client";

import { useState } from "react";
import { Copy, Download, RefreshCw, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface GeneratorOption {
  key: string;
  label: string;
  type: 'number' | 'select' | 'checkbox';
  defaultValue: any;
  options?: string[];
  min?: number;
  max?: number;
}

interface GeneratorTemplateProps {
  tool: {
    name: string;
    description: string;
    category: string;
  };
  options?: GeneratorOption[];
  onGenerate?: (options: Record<string, any>) => Promise<string> | string;
}

export default function GeneratorTemplate({ 
  tool, 
  options = [],
  onGenerate 
}: GeneratorTemplateProps) {
  const [generatedText, setGeneratedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  
  // Initialize option values
  const [optionValues, setOptionValues] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    options.forEach(option => {
      initial[option.key] = option.defaultValue;
    });
    return initial;
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      if (onGenerate) {
        const result = await onGenerate(optionValues);
        setGeneratedText(result);
      } else {
        // Default behavior
        setGeneratedText("Generated content would appear here...");
      }
    } catch (error) {
      console.error('Generation failed:', error);
      setGeneratedText("Error generating content");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tool.name.toLowerCase().replace(/\s+/g, '-')}-generated.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const updateOption = (key: string, value: any) => {
    setOptionValues(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Options Panel */}
      {options.length > 0 && (
        <div className="space-y-4">
          <Button
            variant="outline"
            onClick={() => setShowOptions(!showOptions)}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            {showOptions ? 'Hide Options' : 'Show Options'}
          </Button>

          {showOptions && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              {options.map((option) => (
                <div key={option.key}>
                  <label className="block text-sm font-medium mb-1">
                    {option.label}
                  </label>
                  
                  {option.type === 'number' && (
                    <input
                      type="number"
                      value={optionValues[option.key]}
                      onChange={(e) => updateOption(option.key, parseInt(e.target.value))}
                      min={option.min}
                      max={option.max}
                      className="w-full p-2 border rounded"
                    />
                  )}
                  
                  {option.type === 'select' && (
                    <select
                      value={optionValues[option.key]}
                      onChange={(e) => updateOption(option.key, e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      {option.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}
                  
                  {option.type === 'checkbox' && (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={optionValues[option.key]}
                        onChange={(e) => updateOption(option.key, e.target.checked)}
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Generate Button */}
      <div className="flex gap-2">
        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating}
          className="flex-1 flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? "Generating..." : `Generate ${tool.name.replace(' Generator', '')}`}
        </Button>
      </div>

      {/* Generated Output */}
      {generatedText && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Generated Content</label>
            <Textarea
              value={generatedText}
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