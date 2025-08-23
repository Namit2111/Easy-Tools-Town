import ConverterTemplate from "../../../templates/ConverterTemplate";

interface PdfToWordToolProps {
  tool: {
    name: string;
    description: string;
    category: string;
  };
}

export default function PdfToWordTool({ tool }: PdfToWordToolProps) {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Simulate PDF to Word conversion
    return new Promise<Blob>((resolve) => {
      setTimeout(() => {
        console.log(`Converting ${file.name} from PDF to Word...`);
        // Return the original file as a placeholder
        resolve(file);
      }, 3000);
    });
  };

  return (
    <ConverterTemplate
      tool={tool}
      fromFormat="PDF"
      toFormat="Word"
      acceptedTypes=".pdf"
      onConvert={handleConvert}
    />
  );
}