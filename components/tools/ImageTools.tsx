import React from 'react';
import ConverterTool from '../templates/ConverterTool';
import { convertImageFormat } from '../../services/imageService';

export const ImageConverterTool = () => {
  return (
    <ConverterTool
      toolId="img-convert"
      accept="image/*"
      outputFormatOptions={['JPG', 'PNG']}
      buttonLabel="Convert Format"
      downloadExtension="png"
      onConvert={async (file, option) => {
        return await convertImageFormat(file, option as 'JPG' | 'PNG');
      }}
    />
  );
}

// --- Image Rotator ---
export const ImageRotateTool = () => {
  return (
    <ConverterTool
      toolId="img-rotate"
      accept="image/*"
      outputFormatOptions={['90°', '180°', '270°']}
      buttonLabel="Rotate Image"
      downloadExtension="png"
      onConvert={async (file, option) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          const url = URL.createObjectURL(file);

          img.onload = () => {
            const angle = parseInt(option || '90');
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;

            if (angle === 90 || angle === 270) {
              canvas.width = img.height;
              canvas.height = img.width;
            } else {
              canvas.width = img.width;
              canvas.height = img.height;
            }

            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((angle * Math.PI) / 180);
            ctx.drawImage(img, -img.width / 2, -img.height / 2);
            URL.revokeObjectURL(url);

            canvas.toBlob((blob) => {
              if (blob) resolve(blob);
              else reject(new Error('Failed to create blob'));
            }, 'image/png');
          };

          img.onerror = reject;
          img.src = url;
        });
      }}
    />
  );
};

// --- Grayscale Converter ---
export const ImageGrayscaleTool = () => {
  return (
    <ConverterTool
      toolId="img-gray"
      accept="image/*"
      buttonLabel="Convert to Grayscale"
      downloadExtension="png"
      onConvert={async (file) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          const url = URL.createObjectURL(file);

          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
              const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
              data[i] = data[i + 1] = data[i + 2] = gray;
            }

            ctx.putImageData(imageData, 0, 0);
            URL.revokeObjectURL(url);

            canvas.toBlob((blob) => {
              if (blob) resolve(blob);
              else reject(new Error('Failed to create blob'));
            }, 'image/png');
          };

          img.onerror = reject;
          img.src = url;
        });
      }}
    />
  );
};