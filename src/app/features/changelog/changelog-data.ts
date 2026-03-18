export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  changes: { type: 'added' | 'changed' | 'fixed' | 'removed'; text: string }[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '1.3.0',
    date: '2026-03-18',
    title: 'Enhanced Landing Page & System Dark Mode',
    changes: [
      { type: 'added', text: '3 new component preview cards: Messages, Avatars, and Slider' },
      { type: 'added', text: 'Block Previews section with interactive Login, Dashboard, Data Table, and Sign Up cards' },
      { type: 'added', text: 'Features section highlighting 6 key capabilities' },
      { type: 'added', text: 'CTA banner linking to the designer' },
      { type: 'changed', text: 'Dark mode now defaults to system preference (prefers-color-scheme)' },
      { type: 'fixed', text: 'Theme settings button alignment with nav icons' },
    ],
  },
  {
    version: '1.2.0',
    date: '2026-03-18',
    title: 'Analytics, Social Sharing & Changelog',
    changes: [
      { type: 'added', text: 'Vercel Analytics for traffic insights' },
      { type: 'added', text: 'Open Graph and Twitter Card meta tags for rich link previews' },
      { type: 'added', text: 'Copy share link button in the designer header' },
      { type: 'added', text: 'This changelog page' },
    ],
  },
  {
    version: '1.1.0',
    date: '2026-03-15',
    title: 'Semantic Color Sync & Block Components',
    changes: [
      { type: 'added', text: 'Block components from DiegoGeoDev fork (translated & genericized)' },
      { type: 'fixed', text: 'Semantic tab color swatches now sync correctly on token change' },
      { type: 'fixed', text: 'Semantic token changes propagate to designer service' },
    ],
  },
  {
    version: '1.0.0',
    date: '2026-03-01',
    title: 'Initial Release',
    changes: [
      { type: 'added', text: 'Visual theme designer with real-time preview' },
      { type: 'added', text: 'Support for Aura, Material, Lara, and Nora presets' },
      { type: 'added', text: 'Primitive, Semantic, Component, Custom, and Settings editor tabs' },
      { type: 'added', text: 'Theme export as TypeScript preset file' },
      { type: 'added', text: 'Theme import/share via base64-encoded URL' },
      { type: 'added', text: 'Dark mode toggle' },
      { type: 'added', text: 'Landing page with live component previews' },
    ],
  },
];
