import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tools Website - Every Tool You Will Ever Need",
  description: "Free online tools for PDF, image, and file processing. Convert, compress, and edit your files easily.",
  keywords: "online tools, pdf tools, image tools, file tools, free tools",
  openGraph: {
    title: "Tools Website - Every Tool You Will Ever Need",
    description: "Free online tools for PDF, image, and file processing",
    url: "https://tools-website.com",
    siteName: "Tools Website",
    locale: "en_US",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'