# Theme Studio

An independent visual design editor for creating production-ready
[PrimeNG](https://primeng.org/) themes.
Start from an official preset, edit its design tokens, inspect the result in a live PrimeNG
preview, and export a typed preset that can be owned and maintained with the rest of your Angular
application.

Theme Studio is not affiliated with or endorsed by PrimeTek. PrimeNG is referenced only to
describe compatibility with the PrimeNG component library.

[Live demo](https://prime-ng-theme-fe.vercel.app/) · [Designer](https://prime-ng-theme-fe.vercel.app/designer) · [Changelog](https://prime-ng-theme-fe.vercel.app/changelog)

## What Theme Studio does

- **Visual design editor** — Edit primitive palettes, border radii, semantic roles,
  component-level tokens, custom tokens, typography, and other theme settings.
- **Official starting presets** — Create a theme from Aura, Material, Lara, or Nora.
- **Real-time preview** — Inspect buttons, forms, tables, navigation, panels, overlays, messages,
  and complete sample screens while editing.
- **Multiple preview modes** — Switch between the component preview, login, dashboard, table, and
  sign-up examples.
- **Apply and validate** — Apply the current preset to the complete designer before exporting it.
- **Typed export** — Download the finished theme as a TypeScript preset file.
- **Import and sharing** — Restore a base64 theme token or load a shared theme through the
  `?theme=` URL parameter.
- **Light and dark modes** — Review both color-scheme variants from the landing page and designer.

![Theme Studio design editor](docs/designer.png)

## Landing page

The responsive landing page is based on the structure and visual language of
[Optimus UI](https://optimus.openng.org/). It includes:

- A compact responsive topbar, project announcement, and direct designer action
- A live analytics dashboard that responds to the active PrimeNG theme
- Mobile sample switching for responsive product previews
- An honest capability overview focused on the Design Editor, Accessibility, Responsive Preview,
  and Typed Theme Export
- A searchable, sortable, selectable, and paginated PrimeNG customer preview
- Direct access to the designer, changelog, source repository, and related resources

## Application routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page and live product previews |
| `/designer` | Theme creation, token editing, preview, import, sharing, and export |
| `/changelog` | Versioned release notes |

## Designer workflow

1. Open `/designer`, enter a theme name, and select Aura, Material, Lara, or Nora.
2. Edit primitive, semantic, component, custom, or settings tokens in the left panel.
3. Use the preview navigation to inspect both individual PrimeNG components and complete screens.
4. Select **Apply** to apply the current preset to the full designer.
5. Select **Download** to copy the shareable token or download the TypeScript preset.
6. Restore the theme later by importing the token or opening `/designer?theme=<token>`.

## Tech stack

- Angular 21 standalone components, signals, and OnPush change detection
- PrimeNG 21 and `@primeuix/themes`
- Tailwind CSS 4
- Chart.js
- Vitest and jsdom

## Local development

### Requirements

- Node.js `^20.19.0`, `^22.12.0`, or `>=24.0.0`
- npm 11

### Setup

```bash
npm install
npm start
```

The development server is available at [http://localhost:4200](http://localhost:4200).

### Verification

```bash
# Run the full unit test suite once
npm test -- --watch=false

# Build the production application
npm run build
```

The designer has dedicated coverage for theme creation, imports, editor tabs, token updates,
preview blocks, settings, applying presets, URL sharing, and exports.

## Project structure

```text
src/app/
├── features/
│   ├── landing/             # Optimus-style landing page and live previews
│   │   ├── components/      # Dashboard, customer table, and theme controls
│   │   └── services/        # Landing-page theme state
│   ├── designer/            # Visual theme editor
│   │   ├── blocks/          # Complete preview screens
│   │   ├── components/      # Editor tabs, fields, settings, preview, and export UI
│   │   └── services/        # Theme state, import, sharing, apply, and export logic
│   └── changelog/           # Versioned release notes
├── app.routes.ts
└── theme-presets.ts
```

## Release notes

The in-app [changelog](https://prime-ng-theme-fe.vercel.app/changelog) documents user-facing
changes. The current landing-page rebuild and designer validation are recorded in version 1.5.0.

## Attribution

Portions of the landing-page structure, styles, sample data, and assets are adapted from
[openng-org/optimus-ui](https://github.com/openng-org/optimus-ui) under the MIT License. See
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for the complete notice.
