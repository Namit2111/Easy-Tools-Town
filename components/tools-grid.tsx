import { useState } from "react"
import Link from "next/link"
import type { Tool } from "@/lib/tools-data"
import { FileText, Image, File, FileType, ChevronDown } from "lucide-react"

interface ToolsGridProps {
  tools: Tool[]
}

export default function ToolsGrid({ tools }: ToolsGridProps) {
  const ITEMS_PER_PAGE = 12; // 2 rows on desktop (4 columns * 2 rows)
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  
  const getToolIcon = (category: string) => {
    switch (category) {
      case "pdf":
        return <FileText className="h-5 w-5 text-[#1e5a87]" />
      case "image":
        return <Image className="h-5 w-5 text-[#1e5a87]" />
      case "file":
        return <File className="h-5 w-5 text-[#1e5a87]" />
      default:
        return <FileType className="h-5 w-5 text-[#1e5a87]" />
    }
  }

  const loadMore = () => {
    setVisibleItems(prev => Math.min(prev + ITEMS_PER_PAGE, tools.length));
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {tools.slice(0, visibleItems).map((tool) => (
          <Link
            href={`/tools/${tool.slug}`}
            key={tool.id}
            className="bg-[#f0f0d8] p-3 md:p-4 rounded-md hover:bg-[#e5e5c3] transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getToolIcon(tool.category)}</div>
              <div>
                <h3 className="font-medium mb-1">{tool.name}</h3>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {visibleItems < tools.length && (
        <div className="flex justify-center">
          <button
            onClick={loadMore}
            className="flex items-center gap-2 bg-[#1e5a87] text-white px-4 py-2 rounded-md hover:bg-[#164569] transition-colors"
          >
            Load More <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}