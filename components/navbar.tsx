"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, FileText, Image, File, Menu, X } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const categories = [
  {
    name: "All",
    icon: <FileText className="h-4 w-4" />,
    tools: [
      "Merge PDF",
      "Split PDF",
      "Resize Image",
      "Crop Image",
      "Extract ZIP",
      "Convert to RAR",
      "Text Case Converter",
      "Word Counter",
    ],
  },
  {
    name: "PDF",
    icon: <FileText className="h-4 w-4" />,
    tools: [
      "Merge PDF",
      "Split PDF",
      "Compress PDF",
      "PDF to Word",
      "PDF to Excel",
      "PDF to PPT",
      "PDF to JPG",
      "Add Page Numbers",
    ],
  },
  {
    name: "Image",
    icon: <Image className="h-4 w-4" />,
    tools: [
      "Resize Image",
      "Crop Image",
      "Convert to JPG",
      "Convert to PNG",
      "Image to PDF",
      "Compress Image",
      "Add Watermark",
      "Remove Background",
    ],
  },
  {
    name: "Files",
    icon: <File className="h-4 w-4" />,
    tools: [
      "Convert to ZIP",
      "Extract ZIP",
      "Convert to RAR",
      "Extract RAR",
      "File Merger",
      "File Splitter",
      "File Compressor",
      "File Encryptor",
    ],
  },
  {
    name: "Text",
    icon: <FileText className="h-4 w-4" />,
    tools: [
      "Text Case Converter",
      "Word Counter",
      "Text Diff Checker",
      "Lorem Ipsum Generator",
      "Text Encoder/Decoder",
      "Markdown Editor",
      "JSON Formatter",
      "HTML Formatter",
    ],
  },
]

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-[#1e5a87] text-white border-b border-gray-300">
      <div className="container mx-auto flex items-center h-14">
        <Link
          href="/"
          className="flex items-center justify-center w-12 h-12 bg-[#1e5a87] border border-white rounded mr-2"
        >
          <File className="h-6 w-6 text-white" />
        </Link>

        <div className="hidden md:flex">
          <NavigationMenu className="max-w-none">
            <NavigationMenuList>
              {categories.map((category) => (
                <NavigationMenuItem key={category.name}>
                  <NavigationMenuTrigger className="bg-[#1e5a87] text-white hover:bg-[#164569] hover:text-white focus:bg-[#164569]">
                    <div className="flex items-center gap-1">
                      {category.icon}
                      <span>{category.name}</span>
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {category.tools.map((tool) => (
                        <li key={tool}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={`/tools/${tool.toLowerCase().replace(/\s+/g, "-")}`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{tool}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {`${category.name} tool for ${tool.toLowerCase()}`}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-[#164569]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <div className="flex-1 mx-2 md:mx-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8 bg-white text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="hidden sm:flex">
          <Link href="/blog" className="text-white hover:text-gray-200 mr-4 py-2">
            Blog
          </Link>
        </div>

        <div className="hidden sm:flex">
          <Link href="/about" className="text-white hover:text-gray-200 mr-4 py-2">
            About Us
          </Link>
        </div>

        <div className="hidden sm:flex">
          <Link href="/contact" className="text-white hover:text-gray-200 mr-4 py-2">
            Contact Us
          </Link>
        </div>

        <Button className="bg-white text-[#1e5a87] hover:bg-gray-100">LOGIN</Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#164569] p-4">
          <Link href="/blog" className="block text-white hover:text-gray-200 py-2 mb-2 border-b border-white/20">
            Blog
          </Link>

          <Link href="/about" className="block text-white hover:text-gray-200 py-2 mb-2 border-b border-white/20">
            About Us
          </Link>

          <Link href="/contact" className="block text-white hover:text-gray-200 py-2 mb-2 border-b border-white/20">
            Contact Us
          </Link>

          {categories.map((category) => (
            <div key={category.name} className="mb-4">
              <div className="flex items-center gap-2 font-medium mb-2">
                {category.icon}
                <span>{category.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pl-4">
                {category.tools.slice(0, 6).map((tool) => (
                  <Link
                    href={`/tools/${tool.toLowerCase().replace(/\s+/g, "-")}`}
                    key={tool}
                    className="text-sm py-1 hover:underline"
                  >
                    {tool}
                  </Link>
                ))}
                <Link href="#" className="text-sm py-1 text-gray-300 hover:underline">
                  View all {category.name} tools...
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </header>
  )
}

