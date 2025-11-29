import React, { useState } from 'react';
import ConverterTool from '../templates/ConverterTool';
import GeneratorTool from '../templates/GeneratorTool';

// --- JSON Minifier ---
export const JsonMinifyTool = () => {
  return (
    <ConverterTool
      toolId="misc-json-minify"
      accept=".json"
      buttonLabel="Minify JSON"
      downloadExtension="json"
      onConvert={async (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const json = JSON.parse(reader.result as string);
              const minified = JSON.stringify(json);
              const blob = new Blob([minified], { type: 'application/json' });
              resolve(blob);
            } catch (e) {
              reject(e);
            }
          };
          reader.onerror = reject;
          reader.readAsText(file);
        });
      }}
    />
  );
};

// --- Universal Base64 ---
export const FileBase64Tool = () => {
  return (
    <ConverterTool
      toolId="misc-base64"
      accept="*"
      buttonLabel="Convert to Base64"
      downloadExtension="txt"
      onConvert={async (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result as string);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }}
    />
  );
};

// --- Password Generator ---
export const PasswordGeneratorTool = () => {
  const [length, setLength] = useState(16);

  return (
    <GeneratorTool
      toolId="misc-password"
      title="Password Generator"
      inputs={[
        {
          label: `Password Length: ${length}`,
          type: 'range',
          value: length,
          onChange: setLength,
          min: 8,
          max: 32,
        }
      ]}
      onGenerate={async () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        let password = '';
        for (let i = 0; i < length; i++) {
          password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
      }}
      actionLabel="Generate Password"
    />
  );
};

// --- Word Counter ---
export const WordCounterTool = () => {
  const [text, setText] = useState('');

  return (
    <GeneratorTool
      toolId="misc-word-count"
      title="Word Counter"
      inputs={[
        {
          label: 'Enter or paste your text',
          type: 'textarea',
          value: text,
          onChange: setText,
        }
      ]}
      onGenerate={async () => {
        const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
        const chars = text.length;
        const charsNoSpaces = text.replace(/\s/g, '').length;
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
        const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;

        return `Words: ${words}\nCharacters: ${chars}\nCharacters (no spaces): ${charsNoSpaces}\nSentences: ${sentences}\nParagraphs: ${paragraphs}`;
      }}
      actionLabel="Count"
    />
  );
};
