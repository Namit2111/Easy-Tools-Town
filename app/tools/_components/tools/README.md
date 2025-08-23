# Tools Folder Structure

This folder contains all tool implementations organized hierarchically:

```
tools/
├── index.ts                     # Main exports for all tools
├── {category}/                  # Tool category (pdf, image, file, text)
│   ├── index.ts                 # Category exports
│   └── {template-type}/         # Template type (file-upload, converter, text-input, generator)
│       └── {ToolName}Tool.tsx   # Individual tool implementation
```

## Current Structure

### Text Tools (`text/`)
- `text-input/WordCounterTool.tsx` - Count words, characters, paragraphs
- `generator/PasswordGeneratorTool.tsx` - Generate secure passwords

### PDF Tools (`pdf/`)
- `file-upload/PdfMergerTool.tsx` - Combine multiple PDFs
- `converter/PdfToWordTool.tsx` - Convert PDF to Word document

### Image Tools (`image/`)
- `file-upload/ImageResizerTool.tsx` - Resize images
- `converter/ImageToPdfTool.tsx` - Convert images to PDF

### File Tools (`file/`)
- `file-upload/ZipExtractorTool.tsx` - Extract ZIP archives
- `converter/FileConverterTool.tsx` - Convert between file formats

## Adding New Tools

1. **Choose the right location**: `{category}/{template-type}/`
2. **Create the tool component**: Follow naming convention `{ToolName}Tool.tsx`
3. **Export in category index**: Add to `{category}/index.ts`
4. **Import in main client**: Add to `ToolPageClient.tsx`
5. **Add to switch statement**: Route the tool slug to the component

## Template Types

- **file-upload**: Tools that process uploaded files (drag & drop, multiple files)
- **converter**: Tools that convert between formats (single file, clear input/output)
- **text-input**: Tools that process text input (large text areas, instant processing)
- **generator**: Tools that generate content (configurable options, multiple outputs)

## Benefits of This Structure

- **Scalable**: Easy to add new categories and tools
- **Organized**: Clear separation by category and template type
- **Maintainable**: Related tools are grouped together
- **Discoverable**: Easy to find and understand tool relationships
- **Type-Safe**: Clean imports and exports with TypeScript support