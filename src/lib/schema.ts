import { Product, Article } from '../types';
import { SiteSettings } from './api';
import { SITE_URL, SITE_NAME, BUSINESS, absoluteUrl, toMetaDescription } from './site';
import { productPath, articlePath } from './routes';

// schema.org JSON-LD builders. Rendered server-side so crawlers see them in the raw HTML.

export function organizationSchema(settings: SiteSettings) {
  const sameAs = [
    settings.social_facebook_url,
    settings.social_instagram_url,
    settings.social_tiktok_url,
    settings.social_youtube_url,
  ].filter((u) => typeof u === 'string' && /^https?:\/\//.test(u));

  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'WholesaleStore'],
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/plant/logo.jpg'),
    image: absoluteUrl('/og-image.jpg'),
    description:
      'Wholesale supplier of premium vegan and vegetarian foods for restaurants, retailers and home kitchens.',
    email: BUSINESS.email,
    telephone: BUSINESS.phones[0],
    address: { '@type': 'PostalAddress', ...BUSINESS.address },
    contactPoint: BUSINESS.phones.map((telephone) => ({
      '@type': 'ContactPoint',
      telephone,
      email: BUSINESS.email,
      contactType: 'sales',
      areaServed: 'US',
      availableLanguage: ['English'],
    })),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-US',
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productSchema(product: Product) {
  const images = Array.from(new Set([product.image, ...(product.images ?? [])].filter(Boolean)));
  const description = toMetaDescription([product.details, product.description].filter(Boolean).join(' '), 500);
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${absoluteUrl(productPath(product.slug ?? product.id))}#product`,
    name: product.name,
    url: absoluteUrl(productPath(product.slug ?? product.id)),
    image: images,
    ...(description ? { description } : {}),
    category: product.categoryLabel,
    ...(product.brand ? { brand: { '@type': 'Brand', name: product.brand } } : {}),
    ...(product.unit ? { size: product.unit } : {}),
    seller: { '@id': `${SITE_URL}/#organization` },
  };
}

export function productListSchema(products: Product[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Vegan & Vegetarian Products',
    numberOfItems: products.length,
    itemListElement: products
      .filter((p) => p.slug)
      .map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: absoluteUrl(productPath(p.slug!)),
        name: p.name,
      })),
  };
}

function isoDate(value: string): string | undefined {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

export function articleSchema(article: Article) {
  const url = absoluteUrl(articlePath(article.slug ?? article.id));
  const published = isoDate(article.date);
  return {
    '@context': 'https://schema.org',
    '@type': article.youtube_url ? 'VideoObject' : 'Article',
    ...(article.youtube_url
      ? {
          name: article.title,
          description: toMetaDescription(article.excerpt || article.content) || article.title,
          thumbnailUrl: article.youtube_thumbnail || article.image,
          embedUrl: article.youtube_url,
          ...(published ? { uploadDate: published } : {}),
        }
      : {
          headline: article.title,
          description: toMetaDescription(article.excerpt || article.content),
          ...(article.image ? { image: [article.image] } : {}),
          ...(published ? { datePublished: published } : {}),
          author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        }),
    url,
    mainEntityOfPage: url,
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

/** Serializes JSON-LD safely for inline <script> (prevents `</script>` breakouts). */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data, (_k, v) => (v === undefined ? undefined : v)).replace(/</g, '\\u003c');
}
