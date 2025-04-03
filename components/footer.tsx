import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#1e5a87] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-gray-200 mb-4">
              We provide free online tools to help you with your daily tasks. Our mission is to make technology
              accessible to everyone.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-gray-300">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-gray-300">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-gray-300">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-gray-300">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Popular Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tools/pdf-merger" className="hover:underline">
                  PDF Merger
                </Link>
              </li>
              <li>
                <Link href="/tools/image-resizer" className="hover:underline">
                  Image Resizer
                </Link>
              </li>
              <li>
                <Link href="/tools/file-converter" className="hover:underline">
                  File Converter
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf-to-word" className="hover:underline">
                  PDF to Word
                </Link>
              </li>
              <li>
                <Link href="/tools/image-compressor" className="hover:underline">
                  Image Compressor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-gray-200 mb-4">Subscribe to our newsletter to get updates on new tools and features.</p>
            <form className="flex">
              <input type="email" placeholder="Your email" className="px-3 py-2 text-black rounded-l-md w-full" />
              <button type="submit" className="bg-white text-[#1e5a87] px-4 py-2 rounded-r-md hover:bg-gray-100">
                <Mail className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>© {new Date().getFullYear()} Tools Website. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

