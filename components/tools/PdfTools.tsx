import React from 'react';
import GenerativeTool from '../templates/GenerativeTool';
import ConverterTool from '../templates/ConverterTool';
import { generateText, generateImageDescription } from '../../services/geminiService';

// --- Generative Tools ---

export const PdfPlanTool = () => {
  return (
    <GenerativeTool
      toolId="pdf-plan"
      inputPlaceholder="e.g. A comprehensive guide to Urban Gardening for beginners..."
      buttonLabel="Generate Structure"
      onGenerate={async (topic) => {
        const prompt = `Generate a detailed Table of Contents for a PDF ebook about "${topic}". Format it as a numbered list with sections and subsections.`;
        return await generateText(prompt);
      }}
    />
  );
};

export const PdfRewriteTool = () => {
  return (
    <GenerativeTool
      toolId="pdf-rewrite"
      inputPlaceholder="Paste your rough draft here..."
      buttonLabel="Polish Content"
      onGenerate={async (content) => {
        const prompt = `Rewrite the following text to be professional, concise, and suitable for a high-quality business PDF report:\n\n${content}`;
        return await generateText(prompt);
      }}
    />
  );
};

// --- Converter Tools ---

export const PdfToTextTool = () => {
  return (
    <ConverterTool
      toolId="pdf-text"
      accept=".pdf"
      buttonLabel="Extract Text"
      downloadExtension="txt"
      downloadFileNamePrefix="extracted-text"
      onConvert={async (file) => {
        // We use Gemini Vision to "read" the PDF pages if converted to image, 
        // OR we can send the PDF binary directly if supported. 
        // For simplicity in this demo without a PDF rendering lib, we will convert the file to Base64 
        // and ask Gemini to extract text. Note: Gemini 2.5 Flash supports PDF input via AI Studio, 
        // but via API it's best to treat as document.
        
        return new Promise<Blob>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = async () => {
                try {
                    const base64 = (reader.result as string).split(',')[1];
                    // Using image description service as a proxy for "Document Understanding"
                    // Ideally we use a specialized PDF part, but inlineData usually works for multimodal.
                    const text = await generateImageDescription(base64, "Extract all the text from this document accurately. Ignore layout, just give me the content.");
                    const blob = new Blob([text], { type: 'text/plain' });
                    resolve(blob);
                } catch (e) {
                    reject(e);
                }
            };
            reader.readAsDataURL(file);
        });
      }}
    />
  );
};