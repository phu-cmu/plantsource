// Site-wide constants used for metadata, canonical URLs, sitemap and structured data.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://plantsourcewholesale.com').replace(/\/$/, '');
export const SITE_NAME = 'Plantsource Wholesale';
export const DEFAULT_OG_IMAGE = '/og-image.jpg';

export const BUSINESS = {
  email: 'plantsourcewholesale@gmail.com',
  phones: ['+1-813-464-0647', '+1-813-464-0383'],
  address: {
    streetAddress: '3204 E Fifth Ave',
    addressLocality: 'Tampa',
    addressRegion: 'FL',
    postalCode: '33605',
    addressCountry: 'US',
  },
};

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Plain-text excerpt for meta descriptions: strips HTML, collapses whitespace, trims to ~max chars on a word boundary. */
export function toMetaDescription(text: string | undefined | null, max = 158): string {
  const plain = (text ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
  if (plain.length <= max) return plain;
  const cut = plain.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:/-]+$/, '')}…`;
}
