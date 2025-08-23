# Tools System Documentation

## Overview

The tools system has been completely overhauled to be simpler, more maintainable, and hierarchical. We now have **8 focused tools** (2 per category) using different template types for maximum variety and maintainability.

## Architecture

### Hierarchical Structure

Tools are organized with categories and subcategories for better scalability:

```
Category → Subcategory → Tools
├── PDF Tools
│   ├── PDF Processing → PDF Merger (file-upload)
│   └── PDF Conversion → PDF to Word (converter)
├── Image Tools  
│   ├── Image Editing → Image Resizer (file-upload)
│   └── Image Conversion → Image to PDF (converter)
├── File Tools
│   ├── File Compression → ZIP Extractor (file-upload)
│   └── File Conversion → File Converter (converter)
└── Text Tools
    ├── Text Processing → Word Counter (text-input)
    └── Text Generation → Password Generator (generator)
```

### Templates

Each tool uses one of four base templates:

1. **FileUploadTemplate** - For tools that process uploaded files
   - Drag & drop support
   - Multiple file selection
   - File type validation
   - Progress indication

2. **TextInputTemplate** - For tools that process text input
   - Large text area support
   - Real-time processing
   - Copy/download results

3. **ConverterTemplate** - For file format conversion tools
   - Clear input/output format indication
   - Single file processing
   - Format-specific validation

4. **GeneratorTemplate** - For content generation tools
   - Configurable options
   - Multiple generation modes
   - Customizable output

### Current Tools (8 total)

#### Featured Tools (4)
- PDF Merger (file-upload)
- Image Resizer (file-upload) 
- ZIP Extractor (file-upload)
- Word Counter (text-input)

#### By Category (2 per category, different templates)
- **PDF Tools**: PDF Merger (file-upload) + PDF to Word (converter)
- **Image Tools**: Image Resizer (file-upload) + Image to PDF (converter)  
- **File Tools**: ZIP Extractor (file-upload) + File Converter (converter)
- **Text Tools**: Word Counter (text-input) + Password Generator (generator)

## Tools Registry System

The system uses a centralized registry (`lib/tools-registry.ts`) for managing tools:

```typescript
import { toolsRegistry } from '@/lib/tools-registry';

// Get tool by slug
const tool = toolsRegistry.getTool('pdf-merger');

// Get tools by category
const pdfTools = toolsRegistry.getToolsByCategory('pdf');

// Get tools by subcategory  
const pdfProcessing = toolsRegistry.getToolsBySubcategory('pdf', 'processing');

// Search tools
const results = toolsRegistry.searchTools('convert');

// Get statistics
const stats = toolsRegistry.getStats();
```

## Adding New Tools

### Method 1: Use Existing Templates

Add to the appropriate category in `lib/tools-data.ts`:

```typescript
{
  id: "new-tool",
  name: "New Tool", 
  description: "Tool description",
  category: "text",
  subcategory: "processing",
  slug: "new-tool",
  template: "text-input" as const,
}
```

### Method 2: Create Custom Implementation

For complex tools, create a component in the appropriate category/template folder:

```typescript
// app/tools/_components/tools/text/text-input/NewTextTool.tsx
import TextInputTemplate from "../../../templates/TextInputTemplate";

export default function NewTextTool({ tool }) {
  const processText = (text: string): string => {
    // Custom processing logic
    return processedText;
  };

  return (
    <TextInputTemplate
      tool={tool}
      placeholder="Enter text..."
      onProcess={processText}
    />
  );
}
```

Then:
1. Export it in the category index file (`tools/text/index.ts`)
2. Import it in `ToolPageClient.tsx`
3. Add it to the switch statement

### Method 3: Add New Category

1. Add category to `toolCategories` in `tools-data.ts`
2. Create new tool array (e.g., `videoTools`)
3. Add to registry initialization
4. Update UI components as needed

## Benefits

1. **Highly Scalable** - Hierarchical structure supports growth
2. **Reduced Complexity** - 8 focused tools instead of 60+
3. **Template Variety** - Each category uses different template types
4. **Consistent UX** - All tools follow the same interaction patterns
5. **Maintainable** - Centralized registry and shared templates
6. **Type Safe** - Full TypeScript support throughout

## File Structure

```
app/tools/
├── [slug]/
│   └── page.tsx                 # Server component
├── _components/
│   ├── ToolPageClient.tsx       # Main client component
│   ├── templates/               # Reusable templates (4 types)
│   │   ├── FileUploadTemplate.tsx
│   │   ├── TextInputTemplate.tsx
│   │   ├── ConverterTemplate.tsx
│   │   └── GeneratorTemplate.tsx
│   └── tools/                   # Hierarchical tool organization
│       ├── index.ts             # Main exports
│       ├── text/
│       │   ├── index.ts
│       │   ├── text-input/
│       │   │   └── WordCounterTool.tsx
│       │   └── generator/
│       │       └── PasswordGeneratorTool.tsx
│       ├── pdf/
│       │   ├── index.ts
│       │   ├── file-upload/
│       │   │   └── PdfMergerTool.tsx
│       │   └── converter/
│       │       └── PdfToWordTool.tsx
│       ├── image/
│       │   ├── index.ts
│       │   ├── file-upload/
│       │   │   └── ImageResizerTool.tsx
│       │   └── converter/
│       │       └── ImageToPdfTool.tsx
│       └── file/
│           ├── index.ts
│           ├── file-upload/
│           │   └── ZipExtractorTool.tsx
│           └── converter/
│               └── FileConverterTool.tsx
└── lib/
    ├── tools-data.ts            # Tool definitions & categories
    └── tools-registry.ts        # Centralized tool management
```

## Future Enhancements

- Add more categories (video, audio, etc.)
- Implement actual file processing logic
- Add progress tracking for long operations
- Create tool categories page with subcategory filtering
- Add advanced search and filtering
- Tool usage analytics
- Batch processing capabilities