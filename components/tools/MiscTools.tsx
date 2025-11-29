import React, { useState } from 'react';
import ConverterTool from '../templates/ConverterTool';
import GeneratorTool from '../templates/GeneratorTool';
import TextInputTool from '../templates/TextInputTool';
import ToolLayout from '../ToolLayout';
import NeoButton from '../NeoButton';
import { QRCodeSVG } from 'qrcode.react';
import { marked } from 'marked';

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

// --- Lorem Ipsum Generator ---
export const LoremIpsumTool = () => {
  const [paragraphs, setParagraphs] = useState(3);
  const [result, setResult] = useState('');

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'at', 'vero', 'eos',
    'accusamus', 'iusto', 'odio', 'dignissimos', 'ducimus', 'blanditiis',
    'praesentium', 'voluptatum', 'deleniti', 'atque', 'corrupti', 'quos', 'dolores',
    'quas', 'molestias', 'excepturi', 'obcaecati', 'cupiditate', 'provident'
  ];

  const generateSentence = () => {
    const length = Math.floor(Math.random() * 10) + 8;
    const words = [];
    for (let i = 0; i < length; i++) {
      words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
    }
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ') + '.';
  };

  const generateParagraph = () => {
    const sentences = Math.floor(Math.random() * 4) + 4;
    const result = [];
    for (let i = 0; i < sentences; i++) {
      result.push(generateSentence());
    }
    return result.join(' ');
  };

  const handleGenerate = () => {
    const paras = [];
    for (let i = 0; i < paragraphs; i++) {
      paras.push(generateParagraph());
    }
    setResult(paras.join('\n\n'));
  };

  return (
    <ToolLayout toolId="misc-lorem">
      <div className="space-y-5">
        <div className="bg-white border-2 border-black p-5 space-y-4">
          <div>
            <label className="block font-bold uppercase text-sm mb-2">Number of Paragraphs: {paragraphs}</label>
            <input
              type="range"
              value={paragraphs}
              onChange={(e) => setParagraphs(Number(e.target.value))}
              min={1}
              max={10}
              className="w-full"
            />
          </div>
          <NeoButton onClick={handleGenerate} className="w-full py-3">Generate Lorem Ipsum</NeoButton>
        </div>

        {result && (
          <div className="bg-[#fdffb6] border-2 border-black p-5 neo-shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-black uppercase">Generated Text</h3>
              <button
                onClick={() => navigator.clipboard.writeText(result)}
                className="px-3 py-1 bg-black text-white font-bold text-sm border-2 border-black hover:bg-white hover:text-black transition-all"
              >
                Copy
              </button>
            </div>
            <textarea
              readOnly
              value={result}
              className="w-full p-3 border-2 border-black font-mono text-sm h-48 bg-white"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

// --- UUID Generator ---
export const UuidGeneratorTool = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const handleGenerate = () => {
    const newUuids = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(generateUUID());
    }
    setUuids(newUuids);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
  };

  return (
    <ToolLayout toolId="misc-uuid">
      <div className="space-y-5">
        <div className="bg-white border-2 border-black p-5 space-y-4">
          <div>
            <label className="block font-bold uppercase text-sm mb-2">Number of UUIDs: {count}</label>
            <input
              type="range"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              min={1}
              max={20}
              className="w-full"
            />
          </div>
          <NeoButton onClick={handleGenerate} className="w-full py-3">Generate UUID{count > 1 ? 's' : ''}</NeoButton>
        </div>

        {uuids.length > 0 && (
          <div className="bg-[#bdb2ff] border-2 border-black p-5 neo-shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-black uppercase">Generated UUIDs</h3>
              <button
                onClick={copyAll}
                className="px-3 py-1 bg-black text-white font-bold text-sm border-2 border-black hover:bg-white hover:text-black transition-all"
              >
                Copy All
              </button>
            </div>
            <div className="space-y-2">
              {uuids.map((uuid, index) => (
                <div key={index} className="flex items-center gap-2 bg-white p-2 border-2 border-black">
                  <code className="flex-1 font-mono text-sm">{uuid}</code>
                  <button
                    onClick={() => navigator.clipboard.writeText(uuid)}
                    className="px-2 py-1 bg-black text-white text-xs font-bold hover:bg-gray-800"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

// --- QR Code Generator ---
export const QrCodeTool = () => {
  return (
    <TextInputTool
      toolId="misc-qrcode"
      placeholder="Enter URL or text to generate QR code..."
      generateLabel="Generate QR Code"
      resultType="display"
      onGenerate={async (text) => {
        return (
          <div className="flex flex-col items-center justify-center p-6 bg-white">
            <QRCodeSVG value={text} size={256} />
            <p className="mt-4 font-mono text-sm break-all text-center max-w-full">{text}</p>
          </div>
        );
      }}
    />
  );
};

// --- Slug Generator ---
export const SlugGeneratorTool = () => {
  return (
    <TextInputTool
      toolId="misc-slug"
      placeholder="Enter text to convert to slug..."
      generateLabel="Generate Slug"
      resultType="copy"
      onGenerate={async (text) => {
        return text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }}
    />
  );
};

// --- URL Encoder/Decoder ---
export const UrlEncoderDecoderTool = () => {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  return (
    <TextInputTool
      toolId="misc-url"
      placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter URL to decode...'}
      generateLabel={mode === 'encode' ? 'Encode URL' : 'Decode URL'}
      resultType="copy"
      additionalControls={
        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="mode"
              checked={mode === 'encode'}
              onChange={() => setMode('encode')}
              className="w-4 h-4"
            />
            <span className="font-bold">Encode</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="mode"
              checked={mode === 'decode'}
              onChange={() => setMode('decode')}
              className="w-4 h-4"
            />
            <span className="font-bold">Decode</span>
          </label>
        </div>
      }
      onGenerate={async (text) => {
        try {
          return mode === 'encode' ? encodeURIComponent(text) : decodeURIComponent(text);
        } catch (e) {
          return 'Error: Invalid URL encoding';
        }
      }}
    />
  );
};

// --- Markdown to HTML ---
export const MarkdownToHtmlTool = () => {
  return (
    <TextInputTool
      toolId="misc-markdown"
      placeholder="# Markdown Text\n\nEnter your markdown here..."
      generateLabel="Convert to HTML"
      resultType="copy"
      textAreaRows={12}
      onGenerate={async (text) => {
        return marked(text);
      }}
    />
  );
};

