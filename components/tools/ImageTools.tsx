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
      downloadExtension="png" // Will change dynamically logic-wise but strict for prop
      onConvert={async (file, option) => {
        // Force the file extension based on option for the download
        // The component logic handles blob creation, we just return blob
        return await convertImageFormat(file, option as 'JPG' | 'PNG');
      }}
    />
  );
}