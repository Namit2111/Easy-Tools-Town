import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getBlogPostBySlug, blogPosts } from "@/lib/blog-data"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} | Tools Website Blog`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Find related posts (same category, excluding current post)
  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <article className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Link href="/blog" className="text-[#1e5a87] hover:underline mb-4 inline-block">
                ← Back to Blog
              </Link>

              <div className="mb-2">
                <span className="bg-[#1e5a87] text-white px-3 py-1 rounded-full text-sm">{post.category}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

              <div className="flex items-center text-gray-600 mb-8">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime} min read</span>
                <span className="mx-2">•</span>
                <span>By {post.author}</span>
              </div>

              <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
            </div>

            <div className="prose max-w-none">
              {post.content.split("\n").map((line, index) => {
                if (line.startsWith("# ")) {
                  return (
                    <h1 key={index} className="text-3xl font-bold my-4">
                      {line.substring(2)}
                    </h1>
                  )
                } else if (line.startsWith("## ")) {
                  return (
                    <h2 key={index} className="text-2xl font-bold my-3">
                      {line.substring(3)}
                    </h2>
                  )
                } else if (line.startsWith("### ")) {
                  return (
                    <h3 key={index} className="text-xl font-bold my-2">
                      {line.substring(4)}
                    </h3>
                  )
                } else if (line.trim() === "") {
                  return <div key={index} className="my-4"></div>
                } else {
                  return (
                    <p key={index} className="my-2">
                      {line}
                    </p>
                  )
                }
              })}
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </article>

          {relatedPosts.length > 0 && (
            <div className="max-w-3xl mx-auto mt-16">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link href={`/blog/${relatedPost.slug}`} key={relatedPost.id} className="group">
                    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-40 bg-gray-200"></div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-[#1e5a87] transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{relatedPost.date}</span>
                          <span className="mx-2">•</span>
                          <span>{relatedPost.readTime} min read</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

