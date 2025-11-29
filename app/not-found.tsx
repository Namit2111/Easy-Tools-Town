import Link from 'next/link';
import NeoButton from '@/components/NeoButton';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-black bg-[#fdf6e3]">
      <div className="text-center max-w-2xl">
        <div className="text-9xl font-black mb-4">404</div>
        <h1 className="text-4xl font-black uppercase mb-4 bg-[#ff6b6b] inline-block px-4 py-2 border-3 border-black neo-shadow">
          PAGE NOT FOUND
        </h1>
        <p className="text-xl font-bold mb-8 mt-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/">
            <NeoButton variant="primary" className="text-lg px-8 py-4">
              Go Home
            </NeoButton>
          </Link>
          <Link href="/tools">
            <NeoButton variant="secondary" className="text-lg px-8 py-4">
              Browse Tools
            </NeoButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

