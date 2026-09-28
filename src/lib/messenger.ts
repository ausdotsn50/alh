import site from '../data/site.json';
import type { PrefillKey, Product, Size } from './types';

/**
 * Builds an m.me link with a ?text= prefill.
 *
 * SPEC.md §4: prefill via ?text= is not reliably honoured across Messenger
 * clients. When it is dropped the customer still lands in the right chat,
 * which is a working outcome — so nothing in the UI may depend on the
 * prefilled text arriving. Button labels must stand on their own.
 */
export function messengerUrl(text?: string): string {
  if (!text) return site.contact.messengerBase;
  return `${site.contact.messengerBase}?text=${encodeURIComponent(text)}`;
}

/** Link for one of the canned prefills in site.json. */
export function messengerFor(key: PrefillKey): string {
  return messengerUrl(site.messengerPrefill[key]);
}

/** Link for a specific size: names the product and size, with bracketed
 *  placeholders for the date and address that the customer overwrites in
 *  Messenger before sending (the owner needs both to confirm). */
export function messengerForSize(product: Product, size: Size): string {
  return messengerUrl(
    [
      `Hi ${site.name}! I'd like to order:`,
      `• ${product.name}, ${size.weightLabel} (${size.servesLabel})`,
      '',
      'Date: [date needed]',
      `Delivery address: [barangay, ${site.location.locality}]`,
      '',
      'Is this date available?',
    ].join('\n')
  );
}

