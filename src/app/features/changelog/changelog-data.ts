export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  changes: { type: 'added' | 'changed' | 'fixed' | 'removed'; text: string }[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '1.6.0',
    date: '2026-07-25',
    title: 'Starter Themes & Live Designer Preview',
    changes: [
      {
        type: 'added',
        text: 'Ready-to-customize shadcn, Bootstrap, and Material starter themes with matching colors, typography, spacing, and component styles',
      },
      {
        type: 'added',
        text: 'Responsive starter theme gallery with visual previews and direct links into the designer',
      },
      {
        type: 'added',
        text: 'Live component preview while choosing a starter theme, including its font family and type scale',
      },
      {
        type: 'added',
        text: 'Live GitHub star count in the landing page repository action',
      },
      {
        type: 'changed',
        text: 'Theme creation now uses a clearer foundation-first flow while keeping existing theme imports available',
      },
      {
        type: 'fixed',
        text: 'shadcn starter theme table headers and filters now keep the correct dark surface in dark mode',
      },
    ],
  },
  {
    version: '1.5.0',
    date: '2026-07-22',
    title: 'Optimus-Style Landing Page & Designer Validation',
    changes: [
      {
        type: 'added',
        text: 'Source-faithful Optimus-style landing page with responsive navigation, announcement, product dashboard, feature cards, and footer',
      },
      {
        type: 'added',
        text: 'Interactive live preview with analytics periods, responsive sample switching, and light or dark theme support',
      },
      {
        type: 'added',
        text: 'Searchable, sortable, selectable, and paginated customer data preview using PrimeNG',
      },
      {
        type: 'changed',
        text: 'Feature messaging now focuses on the actual Design Editor, Accessibility, Responsive Preview, and Typed Theme Export capabilities',
      },
      {
        type: 'changed',
        text: 'Component showcase is now presented as a Live Preview instead of a standalone component library',
      },
      {
        type: 'fixed',
        text: 'Verified theme creation, token editing, real-time preview updates, applying themes, URL sharing, import, and TypeScript export against the current Angular and PrimeNG releases',
      },
    ],
  },
  {
    version: '1.4.0',
    date: '2026-07-19',
    title: 'Interactive Landing Page & Dependency Refresh',
    changes: [
      { type: 'added', text: 'Interactive hero preview with live primary color controls and theme statistics' },
      { type: 'added', text: 'How It Works walkthrough and expanded landing page presentation' },
      { type: 'changed', text: 'Updated Angular and Angular tooling to the latest version 21 releases' },
      { type: 'changed', text: 'Updated Tailwind CSS, Vitest, jsdom, TypeScript, RxJS, and npm tooling' },
      { type: 'fixed', text: 'Kept PrimeNG on the latest open-source release to avoid license failures' },
    ],
  },
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
