import type { ImageMetadata } from 'astro';

/**
 * Registry so data files can reference a photo by filename while components
 * still hand Astro a real static import (required by astro:assets).
 *
 * The four owner-supplied files live in src/assets/images/. Swapping a photo
 * is a file drop at the same name — no code change. See CLAUDE.md.
 */
const files = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/images/*.{jpg,jpeg,png,webp}',
  { eager: true }
);

const byName = new Map<string, ImageMetadata>(
  Object.entries(files).map(([path, mod]) => [path.split('/').pop()!, mod.default])
);

export function img(filename: string): ImageMetadata {
  const found = byName.get(filename);
  if (!found) {
    throw new Error(
      `Image "${filename}" not found in src/assets/images/. ` +
        `Available: ${[...byName.keys()].join(', ') || '(none)'}`
    );
  }
  return found;
}
