export interface Tool {
  id: string
  name: string
  description: string
  category: string
  subcategory: string
  slug: string
  template: 'file-upload' | 'text-input' | 'converter' | 'generator'
  popular?: boolean
}

// Tool categories with subcategories for better organization
export const toolCategories = {
  pdf: {
    name: "PDF Tools",
    icon: "FileText",
    subcategories: {
      processing: "PDF Processing",
      conversion: "PDF Conversion"
    }
  },
  image: {
    name: "Image Tools", 
    icon: "Image",
    subcategories: {
      editing: "Image Editing",
      conversion: "Image Conversion"
    }
  },
  file: {
    name: "File Tools",
    icon: "File", 
    subcategories: {
      compression: "File Compression",
      conversion: "File Conversion"
    }
  },
  text: {
    name: "Text Tools",
    icon: "FileType",
    subcategories: {
      processing: "Text Processing", 
      generation: "Text Generation"
    }
  }
};

export const toolsData = {
  // Featured tools - one from each category
  featuredTools: [
    {
      id: "1",
      name: "PDF Merger",
      description: "Combine multiple PDFs into one",
      category: "pdf",
      subcategory: "processing",
      slug: "pdf-merger",
      template: "file-upload" as const,
      popular: true,
    },
    {
      id: "2", 
      name: "Image Resizer",
      description: "Resize your images easily",
      category: "image",
      subcategory: "editing",
      slug: "image-resizer", 
      template: "file-upload" as const,
      popular: true,
    },
    {
      id: "3",
      name: "ZIP Extractor", 
      description: "Extract files from ZIP archives",
      category: "file",
      subcategory: "compression",
      slug: "zip-extractor",
      template: "file-upload" as const,
      popular: true,
    },
    {
      id: "4",
      name: "Word Counter",
      description: "Count words, characters and paragraphs", 
      category: "text",
      subcategory: "processing",
      slug: "word-counter",
      template: "text-input" as const,
      popular: true,
    },
  ],

  // 2 tools per category, using different templates
  pdfTools: [
    {
      id: "p1",
      name: "PDF Merger",
      description: "Combine multiple PDFs into one",
      category: "pdf",
      subcategory: "processing", 
      slug: "pdf-merger",
      template: "file-upload" as const,
      popular: true,
    },
    {
      id: "p2", 
      name: "PDF to Word",
      description: "Convert PDF to editable Word document",
      category: "pdf",
      subcategory: "conversion",
      slug: "pdf-to-word",
      template: "converter" as const,
      popular: true,
    },
  ],

  imageTools: [
    {
      id: "i1",
      name: "Image Resizer", 
      description: "Resize your images easily",
      category: "image",
      subcategory: "editing",
      slug: "image-resizer",
      template: "file-upload" as const,
      popular: true,
    },
    {
      id: "i2",
      name: "Image to PDF",
      description: "Convert images to PDF format",
      category: "image", 
      subcategory: "conversion",
      slug: "image-to-pdf",
      template: "converter" as const,
      popular: true,
    },
  ],

  fileTools: [
    {
      id: "f1",
      name: "ZIP Extractor",
      description: "Extract files from ZIP archives", 
      category: "file",
      subcategory: "compression",
      slug: "zip-extractor",
      template: "file-upload" as const,
      popular: true,
    },
    {
      id: "f2",
      name: "File Converter",
      description: "Convert between file formats",
      category: "file",
      subcategory: "conversion", 
      slug: "file-converter",
      template: "converter" as const,
      popular: true,
    },
  ],

  textTools: [
    {
      id: "t1",
      name: "Word Counter",
      description: "Count words, characters and paragraphs",
      category: "text",
      subcategory: "processing",
      slug: "word-counter", 
      template: "text-input" as const,
      popular: true,
    },
    {
      id: "t2",
      name: "Password Generator", 
      description: "Generate secure passwords",
      category: "text",
      subcategory: "generation",
      slug: "password-generator",
      template: "generator" as const,
      popular: true,
    },
  ],
}

export function getToolBySlug(slug: string): Tool|undefined{

  const allTools = [...toolsData.pdfTools, ...toolsData.imageTools, ...toolsData.fileTools, ...toolsData.textTools]

  return allTools.find((tool) => tool.slug === slug)
}

