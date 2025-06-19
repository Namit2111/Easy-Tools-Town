"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import Navbar from "@/components/navbar"
import ToolsGrid from "@/components/tools-grid"
import CategorySection from "@/components/category-section"
import Footer from "@/components/footer"
import { toolsData } from "@/lib/tools-data"
import { Button } from "@/components/ui/button"
import { blogPosts } from "@/lib/blog-data"

export default function Home() {
  const [activeTab, setActiveTab] = useState("All Tools")

  // Filter tools based on active tab
  const getActiveTools = () => {
    switch (activeTab) {
      case "All Tools":
        return Object.values(toolsData).flat()
      case "PDF Tools":
        return toolsData.pdfTools
      case "Image Tools":
        return toolsData.imageTools
      case "File Tools":
        return toolsData.fileTools
      case "Text Tools":
        return toolsData.textTools
      default:
        return toolsData.featuredTools
    }
  }

  const tabCategories = ["All Tools","PDF Tools", "Image Tools", "File Tools", "Text Tools"]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold">Every Tool you will ever need</h1>
            <p className="text-lg">Every pdf image file tool</p>
          </div>
          <div className="w-full h-full flex justify-center items-center">
          <div className="bg-[#f0f0d8] w-fit  flex justify-center items-center border border-gray-300 rounded-lg p-2 mb-8 overflow-x-auto">
            <div className="flex">
              {tabCategories.map((category) => (
                <button
                  key={category}
                  className={`rounded-lg py-2 px-4 md:px-6 text-center mx-1 transition-colors ${
                    activeTab === category ? "bg-[#1e5a87] text-white" : "bg-[#d8d8c0] text-gray-800 hover:bg-[#c8c8b0]"
                  }`}
                  onClick={() => setActiveTab(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div></div>

          <div className="bg-[#1e5a87] rounded-lg p-6 mb-12">
            <ToolsGrid tools={getActiveTools()} />
          </div>

          {/* Free Tools Section */}
          <section className="mb-12 bg-gradient-to-r from-[#1e5a87] to-[#2a7cb4] text-white rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">100% Free Tools</h2>
                <p className="text-lg opacity-90 mb-4">
                  All our tools are completely free to use. No hidden fees, no subscriptions, no limits.
                </p>
                <Button className="bg-white text-[#1e5a87] hover:bg-gray-100">Explore All Tools</Button>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
                {toolsData.featuredTools.slice(0, 4).map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.slug}`}
                    className="bg-white/10 backdrop-blur-sm p-3 rounded-lg flex flex-col items-start hover:bg-white/20 transition-colors"
                  >
                    <div className="flex items-center mb-1">
                      <Star className="h-5 w-5 text-yellow-300 mr-2" />
                      <span className="text-sm font-medium">{tool.name}</span>
                    </div>
                    <span className="text-xs opacity-80">{tool.description}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <CategorySection title="PDF tools" tools={toolsData.pdfTools.slice(0, 8)} />

          <CategorySection title="Image tools" tools={toolsData.imageTools.slice(0, 8)} />

          {/* Latest Blog Posts Section */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Latest Blog Posts</h2>
              <Link href="/blog" className="text-[#1e5a87] hover:underline flex items-center">
                View all posts <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.slice(0, 3).map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                  <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-48 bg-gray-200 relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                        <span className="text-white font-medium">{post.category}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-[#1e5a87] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

