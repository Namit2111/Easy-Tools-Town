import type { Tool } from "@/lib/tools-data"
import ToolsGrid from "./tools-grid"

interface CategorySectionProps {
  title: string
  tools: Tool[]
}

export default function CategorySection({ title, tools }: CategorySectionProps) {
  return (
    <section className="mb-8 md:mb-12">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{title}</h2>
      <ToolsGrid tools={tools} />
    </section>
  )
}

