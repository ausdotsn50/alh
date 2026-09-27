export interface Size {
  weightKg: number;
  weightLabel: string;
  servesMin: number;
  servesMax: number;
  servesLabel: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  weightBasis: string;
  weightBasisLabel: string;
  blurb: string;
  description: string;
  image: string;
  imageAlt: string;
  /** object-position for landscape crops of a portrait source. */
  imageFocus: 'top' | 'center';
  freebie: string | null;
  prefillKey: PrefillKey;
  sizes: Size[];
}

export interface Menu {
  products: Product[];
  currency: string;
  currencySymbol: string;
}

export type PrefillKey = 'generic' | 'whole' | 'belly' | 'sizing';

export interface NavItem {
  label: string;
  href: string;
}

export interface Site {
  name: string;
  tagline: string;
  shortDescription: string;
  location: {
    locality: string;
    region: string;
    country: string;
    countryCode: string;
    label: string;
  };
  contact: {
    phone: string;
    phoneHref: string;
    facebookPageId: string;
    facebookUrl: string;
    messengerBase: string;
  };
  ordering: {
    leadTime: string;
    leadTimeShort: string;
    leadTimeLong: string;
    channel: string;
  };
  delivery: { freeWithin: string; short: string; outsideNote: string };
  payment: {
    method: string;
    qrAccountNameMasked: string;
    scanNote: string;
    /** The supplied QR is a full phone screenshot, not a cropped code. */
    qrIsFullScreenshot: boolean;
    confirmFirst: string;
    depositPolicy: { status: 'draft' | 'confirmed'; text: string };
    feesNote: string;
  };
  nav: NavItem[];
  messengerPrefill: Record<PrefillKey, string>;
  seo: {
    siteUrl: string;
    siteUrlIsProvisional: boolean;
    defaultOgImage: string;
    locale: string;
  };
}

export type FaqStatus = 'approved' | 'blocked';

export interface FaqItem {
  id: string;
  status: FaqStatus;
  q: string;
  a: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  occasion?: string;
}
