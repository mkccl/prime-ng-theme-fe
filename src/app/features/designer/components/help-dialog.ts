import { ChangeDetectionStrategy, Component, computed, model, signal } from '@angular/core';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionPanel,
} from 'primeng/accordion';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';

interface HelpToken {
  name: string;
  cssVariable: string;
  description: string;
}

interface HelpSection {
  title: string;
  description: string;
  tokens?: HelpToken[];
  tips?: string[];
}

interface HelpCategory {
  name: string;
  sections: HelpSection[];
}

export const HELP_CONTENT: HelpCategory[] = [
  {
    name: 'Primitive Tokens',
    sections: [
      {
        title: 'Base Colors',
        description:
          'Primitive color palettes define the raw color values your theme is built from. Each color has shades from 50 (lightest) to 950 (darkest).',
        tokens: [
          {
            name: 'primary.50–950',
            cssVariable: '--p-primary-50 … --p-primary-950',
            description: 'Primary brand color shades used throughout the UI.',
          },
          {
            name: 'surface.0–950',
            cssVariable: '--p-surface-0 … --p-surface-950',
            description: 'Neutral surface shades for backgrounds, cards, and panels.',
          },
          {
            name: 'zinc / slate / gray / etc.',
            cssVariable: '--p-zinc-50 … --p-zinc-950',
            description: 'Additional neutral palettes available as surface alternatives.',
          },
        ],
        tips: [
          'Click any color swatch to open the color picker.',
          'Changing a primitive color updates all semantic tokens that reference it.',
        ],
      },
      {
        title: 'Border Radius',
        description: 'Controls the roundness of UI elements at the primitive level.',
        tokens: [
          {
            name: 'borderRadius.none',
            cssVariable: '--p-border-radius-none',
            description: 'No rounding (0).',
          },
          {
            name: 'borderRadius.xs–2xl',
            cssVariable: '--p-border-radius-xs … --p-border-radius-2xl',
            description: 'Incremental rounding from extra-small to extra-extra-large.',
          },
        ],
      },
    ],
  },
  {
    name: 'Semantic Tokens',
    sections: [
      {
        title: 'Primary',
        description:
          'Semantic primary tokens map to your brand color and are used for buttons, links, and active states.',
        tokens: [
          {
            name: 'primary.color',
            cssVariable: '--p-primary-color',
            description: 'Main brand color used for primary actions.',
          },
          {
            name: 'primary.contrastColor',
            cssVariable: '--p-primary-contrast-color',
            description: 'Text color on primary backgrounds.',
          },
          {
            name: 'primary.hoverColor',
            cssVariable: '--p-primary-hover-color',
            description: 'Primary color on hover state.',
          },
          {
            name: 'primary.activeColor',
            cssVariable: '--p-primary-active-color',
            description: 'Primary color on active/pressed state.',
          },
        ],
      },
      {
        title: 'Surface',
        description: 'Surface tokens control backgrounds, borders, and text colors.',
        tokens: [
          {
            name: 'colorScheme.light.surface.ground',
            cssVariable: '--p-surface-ground',
            description: 'Page background color.',
          },
          {
            name: 'colorScheme.light.surface.section',
            cssVariable: '--p-surface-section',
            description: 'Distinct section background color.',
          },
          {
            name: 'colorScheme.light.surface.card',
            cssVariable: '--p-surface-card',
            description: 'Card and panel background color.',
          },
        ],
      },
      {
        title: 'Form Fields',
        description: 'Tokens for input fields, dropdowns, and other form elements.',
        tokens: [
          {
            name: 'formField.background',
            cssVariable: '--p-form-field-background',
            description: 'Background color of form inputs.',
          },
          {
            name: 'formField.borderColor',
            cssVariable: '--p-form-field-border-color',
            description: 'Border color of form inputs.',
          },
          {
            name: 'formField.focusBorderColor',
            cssVariable: '--p-form-field-focus-border-color',
            description: 'Border color when an input is focused.',
          },
        ],
      },
      {
        title: 'Overlay & Navigation',
        description: 'Tokens for dialogs, menus, tooltips, and navigation elements.',
        tokens: [
          {
            name: 'overlay.background',
            cssVariable: '--p-overlay-background',
            description: 'Background for overlay panels (dialogs, popovers).',
          },
          {
            name: 'navigation.item.activeBackground',
            cssVariable: '--p-navigation-item-active-background',
            description: 'Background of active navigation items.',
          },
        ],
      },
      {
        title: 'List Tokens',
        description: 'Tokens for list items in dropdowns, listboxes, and menus.',
        tokens: [
          {
            name: 'list.option.selectedBackground',
            cssVariable: '--p-list-option-selected-background',
            description: 'Background color of selected list items.',
          },
          {
            name: 'list.option.selectedColor',
            cssVariable: '--p-list-option-selected-color',
            description: 'Text color of selected list items.',
          },
        ],
      },
    ],
  },
  {
    name: 'Component Tokens',
    sections: [
      {
        title: 'Per-Component Overrides',
        description:
          'Component tokens let you override semantic tokens for specific components. Each component has a "root" section for shared styles and optional "colorScheme" sections for light/dark mode variants.',
        tokens: [
          {
            name: 'button.root.borderRadius',
            cssVariable: '--p-button-border-radius',
            description: 'Override border radius specifically for buttons.',
          },
          {
            name: 'datatable.root.borderColor',
            cssVariable: '--p-datatable-border-color',
            description: 'Override border color specifically for data tables.',
          },
        ],
        tips: [
          'Component tokens take priority over semantic tokens.',
          'Use the "root" section for styles that apply in both light and dark mode.',
          'Use the "colorScheme.light" and "colorScheme.dark" sections for mode-specific overrides.',
          'Not all components have tokens — only those with dedicated customization points.',
        ],
      },
    ],
  },
  {
    name: 'Custom Tokens',
    sections: [
      {
        title: 'Adding Custom Tokens',
        description:
          'Custom tokens let you define your own design tokens that are generated as CSS variables alongside the built-in ones. They are useful for extending the theme with application-specific values.',
        tips: [
          'Enter a path like "myapp.header.background" and a value.',
          'Values can be raw CSS values (e.g., "#ff0000", "1rem") or references to other tokens.',
          'Reference syntax: use {primary.500} to reference the primary 500 shade.',
          'Custom tokens appear as CSS variables: --p-myapp-header-background.',
          'You can use custom tokens in your own components via var(--p-myapp-header-background).',
        ],
      },
    ],
  },
  {
    name: 'Settings',
    sections: [
      {
        title: 'Font Family',
        description:
          'Controls the global font family used throughout your theme. Accepts any valid CSS font-family value.',
        tips: [
          'Use a comma-separated list for fallbacks: "Inter var, sans-serif".',
          'Make sure custom fonts are loaded in your application.',
        ],
      },
      {
        title: 'Font Size',
        description: 'Controls the base font size for the theme. Affects all relative sizing.',
        tips: [
          'The default is typically "14px".',
          'Changing this will affect all components that use relative units.',
        ],
      },
    ],
  },
  {
    name: 'General Concepts',
    sections: [
      {
        title: 'Token Hierarchy',
        description:
          'PrimeNG uses a three-layer token system: Primitive → Semantic → Component. Primitive tokens are raw values. Semantic tokens reference primitives and provide meaning. Component tokens optionally override semantic tokens for specific components.',
        tips: [
          'Changes to primitive tokens cascade through semantic and component tokens.',
          'Semantic tokens provide the bulk of your theming.',
          'Component tokens are optional fine-tuning.',
        ],
      },
      {
        title: 'Reference Syntax',
        description:
          'Token values can reference other tokens using curly-brace syntax: {path.to.token}. This creates a dynamic link — when the referenced token changes, the referencing token updates automatically.',
        tokens: [
          {
            name: '{primary.500}',
            cssVariable: '—',
            description: 'References the 500 shade of the primary color.',
          },
          {
            name: '{surface.0}',
            cssVariable: '—',
            description: 'References the lightest surface color.',
          },
          {
            name: '{form.field.background}',
            cssVariable: '—',
            description: 'References the form field background token.',
          },
        ],
        tips: [
          'Type { in a token field to browse available tokens.',
          'References are resolved at build time into CSS variable chains.',
        ],
      },
      {
        title: 'Dark Mode',
        description:
          'Semantic tokens support separate values for light and dark color schemes. The editor shows a "colorScheme" section with "light" and "dark" sub-sections where you can define mode-specific values.',
        tips: [
          'Use the moon/sun toggle in the header to preview dark mode.',
          'Only semantic and component tokens have color scheme variants.',
          'Primitive tokens are shared across both modes.',
        ],
      },
    ],
  },
];

@Component({
  selector: 'design-help-dialog',
  standalone: true,
  imports: [
    Dialog,
    InputText,
    Accordion,
    AccordionContent,
    AccordionHeader,
    AccordionPanel,
  ],
  templateUrl: './help-dialog.html',
  styleUrl: './help-dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpDialog {
  readonly helpVisible = model(false);
  protected readonly searchQuery = signal('');

  protected readonly filteredContent = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return HELP_CONTENT;

    return HELP_CONTENT.map((category) => {
      const categoryNameMatch = category.name.toLowerCase().includes(query);
      const filteredSections = category.sections.filter((section) => {
        if (categoryNameMatch) return true;
        if (section.title.toLowerCase().includes(query)) return true;
        if (section.description.toLowerCase().includes(query)) return true;
        if (section.tokens?.some((t) => t.name.toLowerCase().includes(query))) return true;
        if (section.tokens?.some((t) => t.description.toLowerCase().includes(query))) return true;
        if (section.tips?.some((tip) => tip.toLowerCase().includes(query))) return true;
        return false;
      });
      return { ...category, sections: filteredSections };
    }).filter((category) => category.sections.length > 0);
  });

  protected onSearchInput(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }
}
