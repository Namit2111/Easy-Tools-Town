import FileUploadTemplate from "../../../templates/FileUploadTemplate";

interface ImageResizerToolProps {
  tool: {
    name: string;
    description: string;
    category: string;
  };
}

export default function ImageResizerTool({ tool }: ImageResizerToolProps) {
  const handleProcess = async (files: File[]) => {
    // Simulate image resizing process
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(`Resizing ${files.length} image(s)...`);
        resolve();
      }, 2000);
    });
  };

  return (
    <FileUploadTemplate
      tool={tool}
      acceptedTypes=".jpg,.jpeg,.png,.gif,.bmp,.webp"
      maxFiles={5}
      onProcess={handleProcess}
    />
  );
}