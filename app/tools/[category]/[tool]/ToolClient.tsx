'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { TOOLS } from '@/lib/constants';

// PDF Tools
import {
  PdfBase64Tool, PdfInfoTool, PdfRenameTool, PdfViewTool,
  PdfMergerTool, PdfPageCountTool, PdfToTextTool, PdfToImageTool,
  ImageToPdfTool
} from '@/components/tools/PdfTools';

// Image Tools
import {
  ImageConverterTool, ImageRotateTool, ImageGrayscaleTool,
  ImageCompressorTool, ImageResizerTool, ImageCropperTool,
  ImageToBase64Tool, ImageFiltersTool, ImageFlipTool, ColorPickerTool
} from '@/components/tools/ImageTools';

// DOCX Tools
import {
  DocxBase64Tool, DocxInfoTool, DocxRenameTool, DocxValidateTool,
  DocxWordCountTool, DocxToTextTool, TextToDocxTool, HtmlToDocxTool
} from '@/components/tools/DocxTools';

// Misc Tools
import {
  JsonMinifyTool, FileBase64Tool, PasswordGeneratorTool, WordCounterTool,
  LoremIpsumTool, UuidGeneratorTool, QrCodeTool, SlugGeneratorTool,
  UrlEncoderDecoderTool, MarkdownToHtmlTool
} from '@/components/tools/MiscTools';
import SantaGiftPredictor from '@/components/tools/SantaGiftPredictor';

interface Props {
  params: Promise<{ category: string; tool: string }>;
}

const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
  // PDF
  'pdf-base64': PdfBase64Tool,
  'pdf-info': PdfInfoTool,
  'pdf-rename': PdfRenameTool,
  'pdf-view': PdfViewTool,
  'pdf-merge': PdfMergerTool,
  'pdf-pagecount': PdfPageCountTool,
  'pdf-text': PdfToTextTool,
  'pdf-image': PdfToImageTool,
  'pdf-from-image': ImageToPdfTool,

  // Image
  'image-convert': ImageConverterTool,
  'image-rotate': ImageRotateTool,
  'image-grayscale': ImageGrayscaleTool,
  'image-compress': ImageCompressorTool,
  'image-resize': ImageResizerTool,
  'image-crop': ImageCropperTool,
  'image-base64': ImageToBase64Tool,
  'image-filters': ImageFiltersTool,
  'image-flip': ImageFlipTool,
  'image-colorpicker': ColorPickerTool,

  // DOCX
  'docx-base64': DocxBase64Tool,
  'docx-info': DocxInfoTool,
  'docx-rename': DocxRenameTool,
  'docx-validate': DocxValidateTool,
  'docx-wordcount': DocxWordCountTool,
  'docx-text': DocxToTextTool,
  'docx-from-text': TextToDocxTool,
  'docx-from-html': HtmlToDocxTool,

  // Misc
  'misc-minify': JsonMinifyTool,
  'misc-base64': FileBase64Tool,
  'misc-password': PasswordGeneratorTool,
  'misc-wordcount': WordCounterTool,
  'misc-lorem': LoremIpsumTool,
  'misc-uuid': UuidGeneratorTool,
  'misc-qrcode': QrCodeTool,
  'misc-slug': SlugGeneratorTool,
  'misc-url': UrlEncoderDecoderTool,
  'misc-markdown': MarkdownToHtmlTool,
  'misc-santa-predictor': SantaGiftPredictor,
};

export default function ToolClient({ params }: Props) {
  const { category, tool } = use(params);

  const toolKey = `${category}-${tool}`;
  const ToolComponent = TOOL_COMPONENTS[toolKey];

  // Find the tool data
  const toolData = TOOLS.find(t => t.path === `/tools/${category}/${tool}`);

  if (!ToolComponent || !toolData) {
    notFound();
  }

  return <ToolComponent />;
}

