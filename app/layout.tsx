import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Plantsource Wholesale',
  description: 'Purity In Every Bite',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
