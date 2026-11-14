import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import App from '@/src/App'
import { fetchProducts, fetchStories, fetchSettings } from '@/src/lib/api'
import { parseRoute, productPath, articlePath, VIEW_PATHS, ParsedRoute } from '@/src/lib/routes'
import { toMetaDescription, SITE_NAME, DEFAULT_OG_IMAGE } from '@/src/lib/site'
import {
  organizationSchema,
  websiteSchema,
  breadcrumbSchema,
  productSchema,
  productListSchema,
  articleSchema,
  jsonLdString,
} from '@/src/lib/schema'
import type { Product, Article } from '@/src/types'

// Pages are statically generated and refreshed in the background (ISR) so HTML can be cached.
export const revalidate = 300
// Unknown product / story slugs added after the build are rendered on first request.
export const dynamicParams = true

type PageProps = { params: Promise<{ slug?: string[] }> }

// Lets Google show large image previews for indexable pages (404s get Next's own noindex).
const ROBOTS: Metadata['robots'] = { index: true, follow: true, 'max-image-preview': 'large' }

export async function generateStaticParams() {
  const [products, stories] = await Promise.all([fetchProducts(), fetchStories()])
  const staticPaths = Object.values(VIEW_PATHS).map((p) => p.split('/').filter(Boolean))
  return [
    ...staticPaths.map((slug) => ({ slug })),
    ...products.filter((p) => p.slug).map((p) => ({ slug: ['shop', p.slug!] })),
    ...stories.filter((s) => s.slug).map((s) => ({ slug: ['journal', s.slug!] })),
  ]
}

interface Resolved {
  route: ParsedRoute
  products: Product[]
  stories: Article[]
  product?: Product
  article?: Article
}

async function resolve(slug: string[] | undefined): Promise<Resolved | null> {
  const route = parseRoute(slug)
  if (!route) return null

  const [products, stories] = await Promise.all([fetchProducts(), fetchStories()])

  if (route.productSlug) {
    const product = products.find((p) => p.slug === route.productSlug)
    if (!product) return null
    return { route, products, stories, product }
  }
  if (route.articleSlug) {
    const article = stories.find((s) => s.slug === route.articleSlug)
    if (!article) return null
    return { route, products, stories, article }
  }
  return { route, products, stories }
}

const PAGE_META: Record<string, { title: string; description: string; absolute?: boolean }> = {
  home: {
    title: 'Wholesale Vegan & Vegetarian Food Supplier | Plantsource',
    absolute: true,
    description:
      'Plantsource Wholesale supplies premium vegan and vegetarian foods, from plant-based chicken and seafood to ham and snacks, for restaurants, retailers and home kitchens.',
  },
  shop: {
    title: 'Vegan & Vegetarian Food Products',
    description:
      'Browse our wholesale range of plant-based foods: vege chicken, fish, tuna, ham, bacon, dry goods and snacks from trusted brands. Ideal for restaurants and retailers.',
  },
  story: {
    title: 'Our Story: Your Trusted Plant-Based Food Partner',
    description:
      'Plantsource sources premium vegan and vegetarian products from trusted, internationally certified manufacturers, with high standards for quality, taste and food safety.',
  },
  journal: {
    title: 'Plant-Based Recipes, News & Media',
    description:
      'New products, seasonal plant-based recipes, industry insights and media from Plantsource Wholesale.',
  },
  contact: {
    title: 'Contact Us for Wholesale Inquiries',
    description:
      'Contact Plantsource Wholesale in Tampa, FL for wholesale pricing and orders of vegan and vegetarian foods. Call 813-464-0647 or email our team.',
  },
  'shipping-policy': {
    title: 'Shipping & Refund Policy',
    description:
      'Processing times, delivery and local pick-up options, frozen-food handling and refunds for Plantsource Wholesale orders.',
  },
  catalog: {
    title: '2026 Product Catalog',
    description:
      'Flip through the Plantsource Wholesale 2026 catalog of vegan and vegetarian foods: plant-based meats, seafood alternatives, dry goods and snacks.',
  },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const resolved = await resolve(slug)
  // Next.js adds <meta name="robots" content="noindex"> to 404 responses itself.
  if (!resolved) return { title: 'Page Not Found' }

  const { route, product, article } = resolved

  if (product) {
    const path = productPath(product.slug!)
    const title = `${product.name}${product.brand ? ` by ${product.brand}` : ''}`
    const description =
      toMetaDescription(
        `${product.name}: ${product.categoryLabel.toLowerCase()} plant-based food${product.unit ? `, ${product.unit}` : ''}${
          product.brand ? `, by ${product.brand}` : ''
        }. ${product.details} ${product.description}`,
      ) || PAGE_META.shop.description
    return {
      title,
      description,
      alternates: { canonical: path },
      robots: ROBOTS,
      openGraph: { type: 'website', url: path, title: `${title} | ${SITE_NAME}`, description, images: [{ url: product.image, alt: product.name }] },
      twitter: { card: 'summary_large_image', title: `${title} | ${SITE_NAME}`, description, images: [product.image] },
    }
  }

  if (article) {
    const path = articlePath(article.slug!)
    const description = toMetaDescription(article.excerpt || article.content) || PAGE_META.journal.description
    const image = article.image || DEFAULT_OG_IMAGE
    return {
      title: article.title,
      description,
      alternates: { canonical: path },
      robots: ROBOTS,
      openGraph: { type: 'article', url: path, title: article.title, description, images: [{ url: image, alt: article.title }] },
      twitter: { card: 'summary_large_image', title: article.title, description, images: [image] },
    }
  }

  const meta = PAGE_META[route.view]
  const path = VIEW_PATHS[route.view]
  const fullTitle = meta.absolute ? meta.title : `${meta.title} | ${SITE_NAME}`
  return {
    title: meta.absolute ? { absolute: meta.title } : meta.title,
    description: meta.description,
    alternates: { canonical: path },
    robots: ROBOTS,
    openGraph: { url: path, title: fullTitle, description: meta.description },
    twitter: { title: fullTitle, description: meta.description },
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const resolved = await resolve(slug)
  if (!resolved) notFound()

  const { route, products, stories, product, article } = resolved
  const settings = await fetchSettings()

  const schemas: unknown[] = []
  if (route.view === 'home') schemas.push(organizationSchema(settings), websiteSchema())
  if (route.view === 'contact') schemas.push(organizationSchema(settings))
  if (route.view === 'shop' && !product && products.length) schemas.push(productListSchema(products))
  if (product) {
    schemas.push(
      productSchema(product),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/shop' },
        { name: product.name, path: productPath(product.slug!) },
      ]),
    )
  }
  if (article) {
    schemas.push(
      articleSchema(article),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Explore', path: '/journal' },
        { name: article.title, path: articlePath(article.slug!) },
      ]),
    )
  }

  // Only send each view the data it renders, to keep the HTML / RSC payload small.
  const viewProducts =
    route.view === 'shop' ? products : route.view === 'home' ? products.filter((p) => p.isFeatured) : []
  const viewStories =
    route.view === 'journal' ? stories : route.view === 'home' ? stories.filter((s) => s.slug).slice(0, 2) : []

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(s) }} />
      ))}
      <Suspense fallback={null}>
        <App initialProducts={viewProducts} initialStories={viewStories} initialSettings={settings} />
      </Suspense>
    </>
  )
}
