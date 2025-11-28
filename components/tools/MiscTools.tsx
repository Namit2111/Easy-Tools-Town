import React from 'react';
import ConverterTool from '../templates/ConverterTool';

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
