import FileUploadTemplate from "../../../templates/FileUploadTemplate";

interface PdfMergerToolProps {
  tool: {
    name: string;
    description: string;
    category: string;
  };
}

export default function PdfMergerTool({ tool }: PdfMergerToolProps) {
  const handleProcess = async (files: File[]) => {
    // Simulate PDF merging process
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(`Merging ${files.length} PDF files...`);
        resolve();
      }, 2000);
    });
  };

  return (
    <FileUploadTemplate
      tool={tool}
      acceptedTypes=".pdf"
      maxFiles={10}
      onProcess={handleProcess}
    />
  );
}