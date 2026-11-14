import type { MetadataRoute } from 'next'
import { fetchProducts, fetchStories } from '@/src/lib/api'
import { VIEW_PATHS, productPath, articlePath } from '@/src/lib/routes'
import { absoluteUrl } from '@/src/lib/site'

export const revalidate = 3600

const PRIORITY: Record<string, number> = {
  '/': 1,
  '/shop': 0.9,
  '/catalog': 0.7,
  '/story': 0.6,
  '/contact': 0.6,
  '/journal': 0.5,
  '/shipping-policy': 0.3,
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, stories] = await Promise.all([fetchProducts(), fetchStories()])

  const pages: MetadataRoute.Sitemap = Object.values(VIEW_PATHS).map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === '/shop' || path === '/' ? 'weekly' : 'monthly',
    priority: PRIORITY[path] ?? 0.5,
  }))

  const productEntries: MetadataRoute.Sitemap = products
    .filter((p) => p.slug)
    .map((p) => ({
      url: absoluteUrl(productPath(p.slug!)),
      changeFrequency: 'monthly',
      priority: 0.8,
      images: Array.from(new Set([p.image, ...(p.images ?? [])].filter(Boolean))),
    }))

  const storyEntries: MetadataRoute.Sitemap = stories
    .filter((s) => s.slug)
    .map((s) => {
      const d = new Date(s.date)
      return {
        url: absoluteUrl(articlePath(s.slug!)),
        ...(Number.isNaN(d.getTime()) ? {} : { lastModified: d }),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        ...(s.image ? { images: [s.image] } : {}),
      }
    })

  return [...pages, ...productEntries, ...storyEntries]
}
