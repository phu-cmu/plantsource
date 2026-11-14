import type { Metadata, Viewport } from 'next'
import './globals.css'
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '@/src/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Wholesale Vegan & Vegetarian Food Supplier | Plantsource',
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Plantsource Wholesale supplies premium vegan and vegetarian foods, from plant-based chicken and seafood to ham and snacks, for restaurants, retailers and home kitchens.',
  applicationName: SITE_NAME,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [DEFAULT_OG_IMAGE],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F7F4EF',
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
