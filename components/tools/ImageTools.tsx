import React from 'react';
import GenerativeTool from '../templates/GenerativeTool';
import ConverterTool from '../templates/ConverterTool';
import { generateImage, generateImageDescription } from '../../services/geminiService';
import { convertImageFormat } from '../../services/imageService';

export const ImageGenTool = () => {
  return (
    <GenerativeTool
      toolId="img-gen"
      inputPlaceholder="e.g. A cyberpunk cat eating noodles in neo-tokyo"
      buttonLabel="Forge Image"
      onGenerate={async (prompt) => {
        return await generateImage(prompt);
      }}
      renderResult={(imgSrc) => (
        <div className="border-4 border-black p-2 bg-white inline-block">
          <img src={imgSrc} alt="Generated" className="max-w-full h-auto" />
          <a href={imgSrc} download="generated-image.png" className="block text-center mt-2 underline font-bold bg-black text-white py-2">DOWNLOAD</a>
        </div>
      )}
    />
  );
};

export const ImageCapTool = () => {
  return (
    <GenerativeTool
      toolId="img-cap"
      inputType="image"
      buttonLabel="Interpret Vision"
      onGenerate={async (file: File) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = async () => {
            try {
              const base64 = (reader.result as string).split(',')[1];
              const text = await generateImageDescription(base64, "Describe this image in detail.");
              resolve(text);
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

export const ImageConverterTool = () => {
  return (
    <ConverterTool
      toolId="img-convert"
      accept="image/*"
      outputFormatOptions={['JPG', 'PNG']}
      buttonLabel="Convert Format"
      downloadExtension="png" // Will change dynamically logic-wise but strict for prop
      onConvert={async (file, option) => {
         // Force the file extension based on option for the download
         // The component logic handles blob creation, we just return blob
         return await convertImageFormat(file, option as 'JPG' | 'PNG');
      }}
    />
  );
}