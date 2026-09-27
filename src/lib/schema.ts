import site from '../data/site.json';
import menu from '../data/menu.json';
import faq from '../data/faq.json';
import { peso } from './format';
import type { FaqItem, Product } from './types';

const abs = (path: string) => new URL(path, site.seo.siteUrl).href;

const allPrices = menu.products.flatMap((p) => p.sizes.map((s) => s.price));

/**
 * LocalBusiness for the home page. Everything here traces to site.json or
 * menu.json. Deliberately omitted: street address (not cleared for
 * publication), opening hours (owner hasn't confirmed roasting days), and
 * any rating (no reviews yet). An absent field beats a guessed one.
 */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'FoodEstablishment'],
    '@id': abs('/#business'),
    name: site.name,
    description: site.shortDescription,
    url: site.seo.siteUrl,
    telephone: site.contact.phone,
    image: abs(site.seo.defaultOgImage),
    servesCuisine: 'Filipino',
    priceRange: `${peso(Math.min(...allPrices))}–${peso(Math.max(...allPrices))}`,
    currenciesAccepted: menu.currency,
    paymentAccepted: site.payment.method,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.locality,
      addressRegion: site.location.region,
      addressCountry: site.location.countryCode,
    },
    areaServed: {
      '@type': 'City',
      name: site.location.locality,
      containedInPlace: { '@type': 'AdministrativeArea', name: site.location.region },
    },
    sameAs: [site.contact.facebookUrl],
    makesOffer: menu.products.map((p) => ({
      '@type': 'Offer',
      name: p.name,
      priceCurrency: menu.currency,
      price: Math.min(...p.sizes.map((s) => s.price)),
    })),
  };
}

/** Product schema per menu line, priced in PHP. SPEC.md §7. */
export function productSchema(product: Product) {
  const prices = product.sizes.map((s) => s.price);
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: abs(site.seo.defaultOgImage),
    brand: { '@type': 'Brand', name: site.name },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: menu.currency,
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: prices.length,
      availability: 'https://schema.org/PreOrder',
      areaServed: site.location.label,
      seller: { '@id': abs('/#business') },
    },
  };
}

/** FAQPage — approved entries only, matching what the accordion renders. */
export function faqSchema() {
  const items = (faq.items as FaqItem[]).filter((i) => i.status === 'approved');
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}
