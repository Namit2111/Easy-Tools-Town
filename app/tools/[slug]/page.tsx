// "use client"

// import type React from "react"

// import { useState } from "react"
// import Link from "next/link"
// import { notFound } from "next/navigation"
// import { FileText, Image, File, FileType, Upload, Download, Share2, Info } from "lucide-react"
// import Navbar from "@/components/navbar"
// import Footer from "@/components/footer"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { getToolBySlug, toolsData } from "@/lib/tools-data"

// interface ToolPageProps {
//   params: Promise<{
//     slug: string
//   }>
// }

// export default async function ToolPage({ params }: ToolPageProps) {
//   const { slug } = await params;
//   const tool = getToolBySlug(slug)
//   const [files, setFiles] = useState<File[]>([])
//   const [isProcessing, setIsProcessing] = useState(false)
//   const [isComplete, setIsComplete] = useState(false)

//   if (!tool) {
//     notFound()
//   }

//   const getToolIcon = (category: string, size = 5) => {
//     const className = `h-${size} w-${size} ${size > 5 ? "text-[#1e5a87]" : "text-[#1e5a87]"}`

//     switch (category) {
//       case "pdf":
//         return <FileText className={className} />
//       case "image":
//         return <Image className={className} />
//       case "file":
//         return <File className={className} />
//       default:
//         return <FileType className={className} />
//     }
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFiles(Array.from(e.target.files))
//     }
//   }

//   const handleProcess = () => {
//     if (files.length === 0) return

//     setIsProcessing(true)

//     // Simulate processing
//     setTimeout(() => {
//       setIsProcessing(false)
//       setIsComplete(true)
//     }, 2000)
//   }

//   const handleReset = () => {
//     setFiles([])
//     setIsComplete(false)
//   }

//   // Find related tools (same category, excluding current tool)
//   const relatedTools = Object.values(toolsData)
//     .flat()
//     .filter((t) => t.category === tool.category && t.id !== tool.id)
//     .slice(0, 4)

//   return (
//     <>
//       <Navbar />
//       <main className="min-h-screen bg-white">
//         <div className="container mx-auto px-4 py-8">
//           <div className="mb-8">
//             <nav className="flex mb-4" aria-label="Breadcrumb">
//               <ol className="inline-flex items-center space-x-1 md:space-x-3">
//                 <li className="inline-flex items-center">
//                   <Link href="/" className="text-gray-700 hover:text-[#1e5a87]">
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <div className="flex items-center">
//                     <span className="mx-2 text-gray-400">/</span>
//                     <Link href="/" className="text-gray-700 hover:text-[#1e5a87]">
//                       Tools
//                     </Link>
//                   </div>
//                 </li>
//                 <li>
//                   <div className="flex items-center">
//                     <span className="mx-2 text-gray-400">/</span>
//                     <span className="text-gray-500">{tool.name}</span>
//                   </div>
//                 </li>
//               </ol>
//             </nav>

//             <div className="flex items-center gap-3 mb-2">
//               {getToolIcon(tool.category, 8)}
//               <h1 className="text-3xl md:text-4xl font-bold">{tool.name}</h1>
//             </div>

//             <p className="text-lg text-gray-600 mb-6">{tool.description}</p>
//           </div>

//           <div className="bg-[#f0f0d8] rounded-lg p-6 mb-12">
//             <Tabs defaultValue="upload" className="w-full">
//               <TabsList className="grid w-full grid-cols-3 mb-6">
//                 <TabsTrigger value="upload">Upload</TabsTrigger>
//                 <TabsTrigger value="options">Options</TabsTrigger>
//                 <TabsTrigger value="help">Help</TabsTrigger>
//               </TabsList>

//              

//              

//               <TabsContent value="help">
//                
//               </TabsContent>
//             </Tabs>
//           </div>

//           {/* Related Tools */}
//          
//         </div>
//       </main>
//       <Footer />
//     </>
//   )
// }

// app/tools/[slug]/page.tsx (Server Component)
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getToolBySlug, toolsData } from "@/lib/tools-data";
import ToolPageClient from "../_components/ToolPageClient";

interface ToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug }= await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  // Find related tools (same category, excluding current tool)
  const relatedTools = Object.values(toolsData)
    .flat()
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <ToolPageClient tool={tool} relatedTools={relatedTools} />
        </div>
      </main>
      <Footer />
    </>
  );
}
