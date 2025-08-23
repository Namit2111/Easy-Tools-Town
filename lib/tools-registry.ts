import { Tool, toolsData, toolCategories } from './tools-data';

// Registry for managing tools with hierarchy
export class ToolsRegistry {
  private static instance: ToolsRegistry;
  private tools: Map<string, Tool> = new Map();
  private categoryMap: Map<string, Tool[]> = new Map();
  private subcategoryMap: Map<string, Tool[]> = new Map();

  private constructor() {
    this.initializeTools();
  }

  public static getInstance(): ToolsRegistry {
    if (!ToolsRegistry.instance) {
      ToolsRegistry.instance = new ToolsRegistry();
    }
    return ToolsRegistry.instance;
  }

  private initializeTools() {
    // Flatten all tools from toolsData
    const allTools = [
      ...toolsData.pdfTools,
      ...toolsData.imageTools,
      ...toolsData.fileTools,
      ...toolsData.textTools,
    ];

    // Build maps for efficient lookup
    allTools.forEach(tool => {
      this.tools.set(tool.slug, tool);
      
      // Group by category
      if (!this.categoryMap.has(tool.category)) {
        this.categoryMap.set(tool.category, []);
      }
      this.categoryMap.get(tool.category)!.push(tool);

      // Group by subcategory
      const subcategoryKey = `${tool.category}.${tool.subcategory}`;
      if (!this.subcategoryMap.has(subcategoryKey)) {
        this.subcategoryMap.set(subcategoryKey, []);
      }
      this.subcategoryMap.get(subcategoryKey)!.push(tool);
    });
  }

  // Get tool by slug
  public getTool(slug: string): Tool | undefined {
    return this.tools.get(slug);
  }

  // Get all tools in a category
  public getToolsByCategory(category: string): Tool[] {
    return this.categoryMap.get(category) || [];
  }

  // Get all tools in a subcategory
  public getToolsBySubcategory(category: string, subcategory: string): Tool[] {
    const key = `${category}.${subcategory}`;
    return this.subcategoryMap.get(key) || [];
  }

  // Get featured tools
  public getFeaturedTools(): Tool[] {
    return toolsData.featuredTools;
  }

  // Get related tools (same category, different subcategory)
  public getRelatedTools(tool: Tool, limit: number = 4): Tool[] {
    const categoryTools = this.getToolsByCategory(tool.category);
    return categoryTools
      .filter(t => t.slug !== tool.slug)
      .slice(0, limit);
  }

  // Get all categories with metadata
  public getCategories() {
    return toolCategories;
  }

  // Get tools by template type
  public getToolsByTemplate(template: Tool['template']): Tool[] {
    return Array.from(this.tools.values()).filter(tool => tool.template === template);
  }

  // Search tools by name or description
  public searchTools(query: string): Tool[] {
    const searchTerm = query.toLowerCase();
    return Array.from(this.tools.values()).filter(tool => 
      tool.name.toLowerCase().includes(searchTerm) ||
      tool.description.toLowerCase().includes(searchTerm)
    );
  }

  // Get tool statistics
  public getStats() {
    const totalTools = this.tools.size;
    const categoryCounts = new Map<string, number>();
    const templateCounts = new Map<string, number>();

    Array.from(this.tools.values()).forEach(tool => {
      // Count by category
      categoryCounts.set(
        tool.category, 
        (categoryCounts.get(tool.category) || 0) + 1
      );

      // Count by template
      templateCounts.set(
        tool.template,
        (templateCounts.get(tool.template) || 0) + 1
      );
    });

    return {
      totalTools,
      categoryCounts: Object.fromEntries(categoryCounts),
      templateCounts: Object.fromEntries(templateCounts),
    };
  }
}

// Export singleton instance
export const toolsRegistry = ToolsRegistry.getInstance();

// Helper functions for backward compatibility
export function getToolBySlug(slug: string): Tool | undefined {
  return toolsRegistry.getTool(slug);
}

export function getRelatedTools(tool: Tool, limit?: number): Tool[] {
  return toolsRegistry.getRelatedTools(tool, limit);
}