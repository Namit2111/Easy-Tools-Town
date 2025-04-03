import Link from "next/link"
import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { blogPosts } from "@/lib/blog-data"

export const metadata: Metadata = {
  title: "Blog | Tools Website",
  description: "Read our latest articles about tools, productivity, and technology",
}

export default function BlogPage() {
  // Group posts by category
  const categories = blogPosts.reduce(
    (acc, post) => {
      if (!acc[post.category]) {
        acc[post.category] = []
      }
      acc[post.category].push(post)
      return acc
    },
    {} as Record<string, typeof blogPosts>,
  )

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2">Our Blog</h1>
            <p className="text-lg text-gray-600">Tips, tutorials, and insights about our tools and productivity</p>
          </div>

          {/* Featured post */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Post</h2>
            <div className="bg-[#f0f0d8] rounded-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 h-64 md:h-auto bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden"></div>
                </div>
                <div className="md:w-1/2 p-6 md:p-8">
                  <div className="mb-2">
                    <span className="bg-[#1e5a87] text-white px-3 py-1 rounded-full text-sm">
                      {blogPosts[0].category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{blogPosts[0].title}</h3>
                  <p className="text-gray-600 mb-4">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span>{blogPosts[0].date}</span>
                    <span className="mx-2">•</span>
                    <span>{blogPosts[0].readTime} min read</span>
                  </div>
                  <Link
                    href={`/blog/${blogPosts[0].slug}`}
                    className="inline-block bg-[#1e5a87] text-white px-4 py-2 rounded-md hover:bg-[#164569] transition-colors"
                  >
                    Read Article
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Posts by category */}
          {Object.entries(categories).map(([category, posts]) => (
            <section key={category} className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{category}</h2>
                <Link
                  href={`/blog/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-[#1e5a87] hover:underline"
                >
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
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
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}

