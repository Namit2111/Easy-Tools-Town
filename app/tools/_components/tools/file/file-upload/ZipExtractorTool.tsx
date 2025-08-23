import FileUploadTemplate from "../../../templates/FileUploadTemplate";

interface ZipExtractorToolProps {
  tool: {
    name: string;
    description: string;
    category: string;
  };
}

export default function ZipExtractorTool({ tool }: ZipExtractorToolProps) {
  const handleProcess = async (files: File[]) => {
    // Simulate ZIP extraction process
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(`Extracting ${files.length} ZIP file(s)...`);
        resolve();
      }, 2000);
    });
  };

  return (
    <FileUploadTemplate
      tool={tool}
      acceptedTypes=".zip,.rar,.7z"
      maxFiles={3}
      onProcess={handleProcess}
    />
  );
}