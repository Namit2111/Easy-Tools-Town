import ConverterTemplate from "../../../templates/ConverterTemplate";

interface FileConverterToolProps {
  tool: {
    name: string;
    description: string;
    category: string;
  };
}

export default function FileConverterTool({ tool }: FileConverterToolProps) {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Simulate file conversion
    return new Promise<Blob>((resolve) => {
      setTimeout(() => {
        console.log(`Converting ${file.name} to different format...`);
        // Return the original file as a placeholder
        resolve(file);
      }, 2500);
    });
  };

  return (
    <ConverterTemplate
      tool={tool}
      fromFormat="File"
      toFormat="File"
      acceptedTypes="*"
      onConvert={handleConvert}
    />
  );
}