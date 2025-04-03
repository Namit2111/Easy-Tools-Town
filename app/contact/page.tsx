import { Metadata } from "next"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: "Contact Us | Tools Website",
  description: "Get in touch with our team for support, feedback, or business inquiries.",
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Have questions, feedback, or need assistance? We're here to help! 
              Fill out the form below or use one of our contact methods.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-[#f0f0d8] p-6 rounded-lg text-center">
                <div className="bg-[#1e5a87] h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold mb-2">Email Us</h3>
                <p className="text-gray-600 mb-3">For general inquiries and support</p>
                <Link href="mailto:support@toolswebsite.com" className="text-[#1e5a87] hover:underline">
                  support@toolswebsite.com
                </Link>
              </div>
              
              <div className="bg-[#f0f0d8] p-6 rounded-lg text-center">
                <div className="bg-[#1e5a87] h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold mb-2">Call Us</h3>
                <p className="text-gray-600 mb-3">Monday to Friday, 9am - 5pm</p>
                <Link href="tel:+11234567890" className="text-[#1e5a87] hover:underline">
                  +1 (123) 456-7890
                </Link>
              </div>
              
              <div className="bg-[#f0f0d8] p-6 rounded-lg text-center">
                <div className="bg-[#1e5a87] h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-3">Get instant help from our team</p>
                <Button className="bg-[#1e5a87] hover:bg-[#164569]">
                  Start Chat
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2 bg-[#1e5a87] text-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Our Office</h3>
                      <p className="text-sm text-gray-200">
                        123 Tools Street<br />
                        San Francisco, CA 94107<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Business Hours</h3>
                      <p className="text-sm text-gray-200">
                        Monday - Friday: 9:00 AM - 5:00 PM<br />
                        Saturday & Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium mb-3">Follow Us</h3>
                  <div className="flex space-x-4">
                    <Link href="#" className="bg-white/20 h-8 w-8 rounded-full flex items-center justify-center hover:bg-white/30">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </Link>
                    <Link href="#" className="bg-white/20 h-8 w-8 rounded-full flex items-center justify-center hover:bg-white/30">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </Link>
                    <Link href="#" className="bg-white/20 h-8 w-8 rounded-full flex items-center justify-center hover:bg-white/30">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-6">Send Us a Message</h2>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Your Name
                      </label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <Input id="email" type="email" placeholder="john@example.com" required />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Subject
                    </label>
                    <Input id="subject" placeholder="How can we help you?" required />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <Textarea 
                      id="message" 
                      placeholder="Please describe your question or issue in detail..." 
                      rows={5}
                      required
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input type="checkbox" id="privacy" className="mr-2" required />
                    <label htmlFor="privacy" className="text-sm text-gray-600">
                      I agree to the <Link href="/privacy-policy" className="text-[#1e5a87] hover:underline">Privacy Policy</Link>
                    </label>
                  </div>
                  
                  <Button type="submit" className="bg-[#1e5a87] hover:bg-[#164569] w-full md:w-auto">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
            
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#f0f0d8] p-6 rounded-lg">
                  <h3 className="font-bold mb-2">Are your tools really free?</h3>
                  <p className="text-gray-700">
                    Yes, all our basic tools are completely free to use. We also offer premium features for users who need additional capabilities.
                  </p>
                </div>
                <div className="bg-[#f0f0d8] p-6 rounded-lg">
                  <h3 className="font-bold mb-2">How do you handle my files?</h3>
                  <p className="text-gray-700">
                    Your privacy is important to us. Files are processed securely and automatically deleted after processing. We never access your content.
                  </p>
                </div>
                <div className="bg-[#f0f0d8] p-6 rounded-lg">
                  <h3 className="font-bold mb-2">Can I use your tools for commercial purposes?</h3>
                  <p className="text-gray-700">
                    Yes, our tools can be used for both personal and commercial purposes within the limits of our fair usage policy.
                  </p>
                </div>
                <div className="bg-[#f0f0d8] p-6 rounded-lg">
                  <h3 className="font-bold mb-2">How do I report a bug?</h3>
                  <p className="text-gray-700">
                    If you encounter any issues, please use the contact form above or email us directly at support@toolswebsite.com.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
