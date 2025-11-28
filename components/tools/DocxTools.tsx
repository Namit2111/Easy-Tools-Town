import React from 'react';
import GenerativeTool from '../templates/GenerativeTool';
import { generateText } from '../../services/geminiService';

export const DocxGrammarTool = () => {
  return (
    <GenerativeTool
      toolId="docx-fix"
      inputPlaceholder="Paste your document text here..."
      buttonLabel="Fix Grammar"
      onGenerate={async (content) => {
        const prompt = `Fix the grammar and spelling in the following text. Keep the tone identical, just fix errors:\n\n${content}`;
        return await generateText(prompt);
      }}
    />
  );
};

export const DocxExpanderTool = () => {
  return (
    <GenerativeTool
      toolId="docx-expand"
      inputPlaceholder="Paste your rough bullet points here..."
      buttonLabel="Expand to Paragraphs"
      onGenerate={async (content) => {
        const prompt = `Turn the following bullet points into full, rich paragraphs for a Word document. Use professional language:\n\n${content}`;
        return await generateText(prompt);
      }}
    />
  );
};