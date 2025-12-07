import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: {
    default: 'Easy Tools Town - Free Online PDF, Image & Document Tools',
    template: '%s | Easy Tools Town',
  },
  description: 'Free online tools for PDF merging, image compression, image resizing, UUID generation, and more. No login required. Fast, secure, and runs entirely in your browser.',
  keywords: ['pdf merger', 'image compressor', 'image resizer', 'pdf tools', 'online tools', 'free tools', 'uuid generator', 'lorem ipsum', 'word counter', 'document tools', 'image converter'],
  authors: [{ name: 'Easy Tools Town' }],
  creator: 'Easy Tools Town',
  publisher: 'Easy Tools Town',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://easytoolstown.com',
    siteName: 'Easy Tools Town',
    title: 'Easy Tools Town - Free Online PDF, Image & Document Tools',
    description: 'Free online tools for PDF merging, image compression, resizing, and more. No login required. Fast and secure.',
    images: [
      {
        url: 'https://easytoolstown.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Easy Tools Town',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Easy Tools Town - Free Online PDF, Image & Document Tools',
    description: 'Free online tools for PDF merging, image compression, resizing, and more. No login required.',
    images: ['https://easytoolstown.com/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className={`${spaceGrotesk.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

