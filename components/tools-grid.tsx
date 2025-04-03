import Link from "next/link"
import type { Tool } from "@/lib/tools-data"
import { FileText, Image, File, FileType } from "lucide-react"

interface ToolsGridProps {
  tools: Tool[]
}

export default function ToolsGrid({ tools }: ToolsGridProps) {
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {tools.map((tool) => (
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
  )
}

