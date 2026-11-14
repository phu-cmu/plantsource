import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F7F4EF] text-[#1C1C1C] flex items-center justify-center px-6">
      <div className="max-w-lg text-center space-y-6">
        <p className="text-[#edc14d] font-sans text-xs font-bold tracking-widest uppercase">404</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">Page not found</h1>
        <p className="font-sans text-base text-[#556260] font-light leading-relaxed">
          The page you are looking for doesn&apos;t exist or has moved.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            href="/"
            className="bg-[#FDD05A] hover:bg-[#edc14d] text-[#362800] px-8 py-4 rounded-full font-sans text-xs font-bold tracking-widest uppercase transition-all"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="border border-[#edc14d]/30 hover:border-[#edc14d] text-[#1C1C1C] px-8 py-4 rounded-full font-sans text-xs font-bold tracking-widest uppercase transition-all"
          >
            Our Foods
          </Link>
        </div>
      </div>
    </main>
  )
}
