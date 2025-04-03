import { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Users, Award, Clock, Globe, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: "About Us | Tools Website",
  description: "Learn about our mission to provide free, high-quality online tools for everyone.",
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
            
            {/* Hero Section */}
            <div className="bg-[#f0f0d8] rounded-lg p-8 mb-12">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-gray-700 mb-4">
                    We believe that powerful tools should be accessible to everyone. Our mission is to provide high-quality, 
                    free online tools that help people work more efficiently and solve everyday problems.
                  </p>
                  <p className="text-gray-700">
                    Since our founding in 2018, we've helped millions of users around the world convert, edit, and optimize 
                    their files without the need for expensive software or technical expertise.
                  </p>
                </div>
                <div className="md:w-1/2 bg-[#1e5a87] rounded-lg p-6 text-white">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3">
                      <Users className="h-8 w-8 mx-auto mb-2" />
                      <div className="text-2xl font-bold">5M+</div>
                      <div className="text-sm">Users</div>
                    </div>
                    <div className="text-center p-3">
                      <Award className="h-8 w-8 mx-auto mb-2" />
                      <div className="text-2xl font-bold">100+</div>
                      <div className="text-sm">Tools</div>
                    </div>
                    <div className="text-center p-3">
                      <Clock className="h-8 w-8 mx-auto mb-2" />
                      <div className="text-2xl font-bold">5+</div>
                      <div className="text-sm">Years</div>
                    </div>
                    <div className="text-center p-3">
                      <Globe className="h-8 w-8 mx-auto mb-2" />
                      <div className="text-2xl font-bold">190+</div>
                      <div className="text-sm">Countries</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Our Story */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="mb-4">
                Tools Website began with a simple idea: what if everyone had access to powerful tools without needing 
                expensive software or technical knowledge? Our founder, a software engineer frustrated with the lack of 
                accessible tools online, decided to create a solution.
              </p>
              <p className="mb-4">
                Starting with just a handful of PDF tools in 2018, we've grown to offer over 100 different tools across 
                multiple categories. Our team has expanded from a single developer to a dedicated group of engineers, 
                designers, and support specialists all committed to our mission.
              </p>
              <p>
                Today, we serve millions of users worldwide, helping them solve problems and work more efficiently every day. 
                We're proud to remain committed to our original vision: providing high-quality tools that are free, easy to use, 
                and accessible to everyone.
              </p>
            </section>
            
            {/* Our Values */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="bg-[#1e5a87] h-12 w-12 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Accessibility</h3>
                  <p className="text-gray-700">
                    We believe powerful tools should be available to everyone, regardless of technical expertise or budget.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="bg-[#1e5a87] h-12 w-12 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Quality</h3>
                  <p className="text-gray-700">
                    We're committed to providing tools that work reliably and produce high-quality results every time.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="bg-[#1e5a87] h-12 w-12 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Privacy</h3>
                  <p className="text-gray-700">
                    We respect your data and privacy. Your files are processed securely and never stored longer than necessary.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Team */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Our Team</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="text-center">
                    <div className="h-32 w-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                    <h3 className="font-bold mb-1">Team Member {i}</h3>
                    <p className="text-sm text-gray-600 mb-2">Position</p>
                  </div>
                ))}
              </div>
            </section>
            
            {/* CTA */}
            <div className="bg-[#1e5a87] text-white rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Join Us on Our Mission</h2>
              <p className="mb-6">
                We're always looking for talented individuals who share our passion for making technology accessible to everyone.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-white text-[#1e5a87] hover:bg-gray-100">
                  View Open Positions
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-[#164569]">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
