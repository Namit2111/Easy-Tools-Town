import ConverterTemplate from "../../../templates/ConverterTemplate";

interface ImageToPdfToolProps {
  tool: {
    name: string;
    description: string;
    category: string;
  };
}

export default function ImageToPdfTool({ tool }: ImageToPdfToolProps) {
  const handleConvert = async (file: File): Promise<Blob> => {
    // Simulate image to PDF conversion
    return new Promise<Blob>((resolve) => {
      setTimeout(() => {
        console.log(`Converting ${file.name} from image to PDF...`);
        // Return the original file as a placeholder
        resolve(file);
      }, 2500);
    });
  };

  return (
    <ConverterTemplate
      tool={tool}
      fromFormat="Image"
      toFormat="PDF"
      acceptedTypes=".jpg,.jpeg,.png,.gif,.bmp,.webp"
      onConvert={handleConvert}
    />
  );
}