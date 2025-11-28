import React from 'react';
import ConverterTool from '../templates/ConverterTool';
import { convertImageFormat } from '../../services/imageService';
import ToolLayout from '../ToolLayout';

// --- Placeholders ---
export const ImageGenTool = () => <ToolLayout toolId="img-gen"><div>Placeholder for ImageGenTool</div></ToolLayout>;
export const ImageCapTool = () => <ToolLayout toolId="img-cap"><div>Placeholder for ImageCapTool</div></ToolLayout>;

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