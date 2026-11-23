import type { ImageMetadata } from 'astro';

const files = import.meta.glob<ImageMetadata>('../assets/boxes/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });

const byName = new Map<string, ImageMetadata>();
for (const [path, img] of Object.entries(files)) {
  const base = path.split('/').pop()?.replace(/\.\w+$/, '');
  if (base) byName.set(base, img);
}

export const slug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export interface BoxArt {
  cover?: ImageMetadata;
  spine?: ImageMetadata;
}

export const boxArt = (name: string): BoxArt => {
  const s = slug(name);
  const cover = byName.get(s);
  const spine = byName.get(`${s}-spine`);
  return { ...(cover && { cover }), ...(spine && { spine }) };
};
