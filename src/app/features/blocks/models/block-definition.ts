import { Type } from '@angular/core';

import { SidebarClassicPreview } from '../block-previews/sidebar-classic';
import { SidebarGroupedPreview } from '../block-previews/sidebar-grouped';
import { SidebarIconsOnlyPreview } from '../block-previews/sidebar-icons-only';
import { SidebarAvatarProfilePreview } from '../block-previews/sidebar-avatar-profile';
import { SidebarSearchPreview } from '../block-previews/sidebar-search';
import { SidebarPanelMenuPreview } from '../block-previews/sidebar-panel-menu';
import { SidebarHeaderFooterPreview } from '../block-previews/sidebar-header-footer';
import { SidebarBadgesPreview } from '../block-previews/sidebar-badges';
import { SidebarDarkPreview } from '../block-previews/sidebar-dark';
import { SidebarMiniTooltipsPreview } from '../block-previews/sidebar-mini-tooltips';

export interface BlockDefinition {
  id: string;
  name: string;
  description: string;
  category: string;
  previewComponent: Type<unknown>;
  htmlCode: string;
  tsCode?: string;
}

export const SIDEBAR_BLOCKS: BlockDefinition[] = [
  {
    id: 'sidebar-classic',
    name: 'Classic Sidebar',
    description: 'Icon + label menu items with active state highlight',
    category: 'sidebar',
    previewComponent: SidebarClassicPreview,
    htmlCode: `<nav class="w-56 bg-surface-0 border-r border-surface-200 flex flex-col py-3 h-screen">
  <div class="px-4 mb-3">
    <span class="text-xs font-semibold text-surface-400 uppercase tracking-wider">Menu</span>
  </div>
  @for (item of items; track item.label) {
    <a
      class="flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors"
      [class]="item.active
        ? 'bg-primary/10 text-primary border-r-2 border-primary'
        : 'text-surface-600 hover:bg-surface-100'"
    >
      <i class="pi" [class]="item.icon"></i>
      <span>{{ item.label }}</span>
    </a>
  }
</nav>`,
    tsCode: `items = [
  { icon: 'pi-home', label: 'Dashboard', active: true },
  { icon: 'pi-inbox', label: 'Inbox', active: false },
  { icon: 'pi-calendar', label: 'Calendar', active: false },
  { icon: 'pi-chart-bar', label: 'Analytics', active: false },
  { icon: 'pi-cog', label: 'Settings', active: false },
];`,
  },
  {
    id: 'sidebar-grouped',
    name: 'Grouped Sidebar',
    description: 'Sections with group headers like "Main" and "Settings"',
    category: 'sidebar',
    previewComponent: SidebarGroupedPreview,
    htmlCode: `<nav class="w-56 bg-surface-0 border-r border-surface-200 flex flex-col py-3 h-screen overflow-y-auto">
  @for (group of groups; track group.title) {
    <div class="px-4 pt-3 pb-1.5">
      <span class="text-[0.65rem] font-bold text-surface-400 uppercase tracking-widest">
        {{ group.title }}
      </span>
    </div>
    @for (item of group.items; track item.label) {
      <a
        class="flex items-center gap-3 px-4 py-2 text-sm cursor-pointer transition-colors"
        [class]="item.active
          ? 'bg-primary/10 text-primary'
          : 'text-surface-600 hover:bg-surface-100'"
      >
        <i class="pi" [class]="item.icon"></i>
        <span>{{ item.label }}</span>
      </a>
    }
  }
</nav>`,
    tsCode: `groups = [
  {
    title: 'Main',
    items: [
      { icon: 'pi-home', label: 'Dashboard', active: true },
      { icon: 'pi-inbox', label: 'Messages', active: false },
      { icon: 'pi-calendar', label: 'Schedule', active: false },
    ],
  },
  {
    title: 'Settings',
    items: [
      { icon: 'pi-user', label: 'Profile', active: false },
      { icon: 'pi-lock', label: 'Security', active: false },
      { icon: 'pi-bell', label: 'Notifications', active: false },
    ],
  },
];`,
  },
  {
    id: 'sidebar-icons-only',
    name: 'Icons Only',
    description: 'Narrow collapsed sidebar with centered icons',
    category: 'sidebar',
    previewComponent: SidebarIconsOnlyPreview,
    htmlCode: `<nav class="w-16 bg-surface-0 border-r border-surface-200 flex flex-col items-center py-4 gap-1 h-screen">
  <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-contrast mb-4">
    <i class="pi pi-bolt text-sm"></i>
  </div>
  @for (item of items; track item.icon) {
    <a
      class="w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
      [class]="item.active
        ? 'bg-primary/10 text-primary'
        : 'text-surface-500 hover:bg-surface-100 hover:text-surface-700'"
    >
      <i class="pi" [class]="item.icon"></i>
    </a>
  }
</nav>`,
    tsCode: `items = [
  { icon: 'pi-home', active: true },
  { icon: 'pi-inbox', active: false },
  { icon: 'pi-calendar', active: false },
  { icon: 'pi-chart-bar', active: false },
  { icon: 'pi-cog', active: false },
];`,
  },
  {
    id: 'sidebar-avatar-profile',
    name: 'Avatar Profile',
    description: 'User avatar and profile info at top with sign-out footer',
    category: 'sidebar',
    previewComponent: SidebarAvatarProfilePreview,
    htmlCode: `<!-- Requires: import { Avatar } from 'primeng/avatar'; -->
<nav class="w-56 bg-surface-0 border-r border-surface-200 flex flex-col h-screen">
  <div class="flex items-center gap-3 p-4 border-b border-surface-200">
    <p-avatar label="JD" shape="circle"
      [style]="{ 'background-color': 'var(--p-primary-color)', color: 'var(--p-primary-contrast-color)' }" />
    <div class="min-w-0">
      <div class="text-sm font-semibold text-surface-800 truncate">Jane Doe</div>
      <div class="text-xs text-surface-400 truncate">Product Designer</div>
    </div>
  </div>
  <div class="flex-1 py-2 overflow-y-auto">
    @for (item of items; track item.label) {
      <a
        class="flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors"
        [class]="item.active
          ? 'bg-primary/10 text-primary'
          : 'text-surface-600 hover:bg-surface-100'"
      >
        <i class="pi" [class]="item.icon"></i>
        <span>{{ item.label }}</span>
      </a>
    }
  </div>
  <div class="p-3 border-t border-surface-200">
    <a class="flex items-center gap-3 px-2 py-2 text-sm text-surface-500
      hover:bg-surface-100 rounded-lg cursor-pointer transition-colors">
      <i class="pi pi-sign-out"></i>
      <span>Sign Out</span>
    </a>
  </div>
</nav>`,
    tsCode: `// Import Avatar: import { Avatar } from 'primeng/avatar';

items = [
  { icon: 'pi-home', label: 'Dashboard', active: true },
  { icon: 'pi-folder', label: 'Projects', active: false },
  { icon: 'pi-users', label: 'Team', active: false },
  { icon: 'pi-chart-bar', label: 'Reports', active: false },
  { icon: 'pi-cog', label: 'Settings', active: false },
];`,
  },
  {
    id: 'sidebar-search',
    name: 'Search Sidebar',
    description: 'Search input at top with filtered menu items',
    category: 'sidebar',
    previewComponent: SidebarSearchPreview,
    htmlCode: `<!-- Requires: import { InputText } from 'primeng/inputtext'; -->
<nav class="w-56 bg-surface-0 border-r border-surface-200 flex flex-col h-screen">
  <div class="p-3">
    <span class="p-input-icon-left w-full">
      <i class="pi pi-search text-xs"></i>
      <input pInputText type="text" placeholder="Search..."
        class="w-full text-sm" [ngModel]="query()"
        (ngModelChange)="query.set($event)" />
    </span>
  </div>
  <div class="flex-1 py-1 overflow-y-auto">
    @for (item of filteredItems(); track item.label) {
      <a
        class="flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors"
        [class]="item.active
          ? 'bg-primary/10 text-primary'
          : 'text-surface-600 hover:bg-surface-100'"
      >
        <i class="pi" [class]="item.icon"></i>
        <span>{{ item.label }}</span>
      </a>
    } @empty {
      <div class="px-4 py-3 text-xs text-surface-400">No results found</div>
    }
  </div>
</nav>`,
    tsCode: `// Imports: InputText from 'primeng/inputtext', FormsModule
import { signal, computed } from '@angular/core';

query = signal('');

allItems = signal([
  { icon: 'pi-home', label: 'Dashboard', active: true },
  { icon: 'pi-inbox', label: 'Inbox', active: false },
  { icon: 'pi-calendar', label: 'Calendar', active: false },
  { icon: 'pi-chart-bar', label: 'Analytics', active: false },
  { icon: 'pi-users', label: 'Team', active: false },
  { icon: 'pi-cog', label: 'Settings', active: false },
]);

filteredItems = computed(() => {
  const q = this.query().toLowerCase();
  if (!q) return this.allItems();
  return this.allItems().filter(item =>
    item.label.toLowerCase().includes(q)
  );
});`,
  },
  {
    id: 'sidebar-panel-menu',
    name: 'Panel Menu',
    description: 'Expandable nested sub-menus using PanelMenu',
    category: 'sidebar',
    previewComponent: SidebarPanelMenuPreview,
    htmlCode: `<!-- Requires: import { PanelMenu } from 'primeng/panelmenu'; -->
<nav class="w-56 bg-surface-0 border-r border-surface-200 h-screen overflow-y-auto">
  <div class="p-2">
    <p-panelmenu [model]="menuItems" [multiple]="true" />
  </div>
</nav>`,
    tsCode: `// Import: PanelMenu from 'primeng/panelmenu'
import { MenuItem } from 'primeng/api';

menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    items: [
      { label: 'Overview', icon: 'pi pi-chart-line' },
      { label: 'Stats', icon: 'pi pi-chart-bar' },
    ],
  },
  {
    label: 'Content',
    icon: 'pi pi-file',
    items: [
      { label: 'Articles', icon: 'pi pi-file-edit' },
      { label: 'Media', icon: 'pi pi-image' },
      { label: 'Categories', icon: 'pi pi-tags' },
    ],
  },
  {
    label: 'Users',
    icon: 'pi pi-users',
    items: [
      { label: 'List', icon: 'pi pi-list' },
      { label: 'Roles', icon: 'pi pi-shield' },
    ],
  },
  { label: 'Settings', icon: 'pi pi-cog' },
];`,
  },
  {
    id: 'sidebar-header-footer',
    name: 'Header & Footer',
    description: 'Logo branding header with version footer',
    category: 'sidebar',
    previewComponent: SidebarHeaderFooterPreview,
    htmlCode: `<nav class="w-56 bg-surface-0 border-r border-surface-200 flex flex-col h-screen">
  <div class="flex items-center gap-2 px-4 py-3 border-b border-surface-200">
    <div class="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
      <i class="pi pi-bolt text-xs text-primary-contrast"></i>
    </div>
    <span class="text-sm font-bold text-surface-800">Acme App</span>
  </div>
  <div class="flex-1 py-2 overflow-y-auto">
    @for (item of items; track item.label) {
      <a
        class="flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors"
        [class]="item.active
          ? 'bg-primary/10 text-primary'
          : 'text-surface-600 hover:bg-surface-100'"
      >
        <i class="pi" [class]="item.icon"></i>
        <span>{{ item.label }}</span>
      </a>
    }
  </div>
  <div class="px-4 py-3 border-t border-surface-200 text-[0.65rem] text-surface-400 text-center">
    Acme App v2.4.1
  </div>
</nav>`,
    tsCode: `items = [
  { icon: 'pi-home', label: 'Dashboard', active: true },
  { icon: 'pi-inbox', label: 'Messages', active: false },
  { icon: 'pi-folder', label: 'Projects', active: false },
  { icon: 'pi-chart-bar', label: 'Analytics', active: false },
  { icon: 'pi-cog', label: 'Settings', active: false },
  { icon: 'pi-question-circle', label: 'Help', active: false },
];`,
  },
  {
    id: 'sidebar-badges',
    name: 'Badge Counts',
    description: 'Menu items with notification badge counts',
    category: 'sidebar',
    previewComponent: SidebarBadgesPreview,
    htmlCode: `<!-- Requires: import { Badge } from 'primeng/badge'; -->
<nav class="w-56 bg-surface-0 border-r border-surface-200 flex flex-col py-3 h-screen">
  <div class="px-4 mb-2">
    <span class="text-xs font-semibold text-surface-400 uppercase tracking-wider">Navigation</span>
  </div>
  @for (item of items; track item.label) {
    <a
      class="flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors"
      [class]="item.active
        ? 'bg-primary/10 text-primary'
        : 'text-surface-600 hover:bg-surface-100'"
    >
      <i class="pi" [class]="item.icon"></i>
      <span class="flex-1">{{ item.label }}</span>
      @if (item.badge) {
        <p-badge [value]="item.badge" [severity]="item.severity" />
      }
    </a>
  }
</nav>`,
    tsCode: `// Import: Badge from 'primeng/badge'

items = [
  { icon: 'pi-home', label: 'Dashboard', active: true, badge: null, severity: null },
  { icon: 'pi-inbox', label: 'Inbox', active: false, badge: '12', severity: 'danger' },
  { icon: 'pi-bell', label: 'Notifications', active: false, badge: '3', severity: 'warn' },
  { icon: 'pi-users', label: 'Team', active: false, badge: null, severity: null },
  { icon: 'pi-calendar', label: 'Events', active: false, badge: '5', severity: 'info' },
  { icon: 'pi-cog', label: 'Settings', active: false, badge: null, severity: null },
];`,
  },
  {
    id: 'sidebar-dark',
    name: 'Dark Sidebar',
    description: 'Always-dark sidebar with light content area',
    category: 'sidebar',
    previewComponent: SidebarDarkPreview,
    htmlCode: `<nav class="w-56 bg-surface-900 flex flex-col py-3 h-screen">
  <div class="flex items-center gap-2 px-4 mb-4">
    <div class="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
      <i class="pi pi-bolt text-xs text-primary-contrast"></i>
    </div>
    <span class="text-sm font-bold text-surface-0">DarkPanel</span>
  </div>
  @for (item of items; track item.label) {
    <a
      class="flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors"
      [class]="item.active
        ? 'bg-white/10 text-surface-0'
        : 'text-surface-400 hover:bg-white/5 hover:text-surface-200'"
    >
      <i class="pi" [class]="item.icon"></i>
      <span>{{ item.label }}</span>
    </a>
  }
  <div class="flex-1"></div>
  <div class="px-4 pt-3 border-t border-surface-700">
    <a class="flex items-center gap-3 px-0 py-2 text-sm text-surface-400
      cursor-pointer hover:text-surface-200 transition-colors">
      <i class="pi pi-sign-out"></i>
      <span>Logout</span>
    </a>
  </div>
</nav>`,
    tsCode: `items = [
  { icon: 'pi-home', label: 'Dashboard', active: true },
  { icon: 'pi-inbox', label: 'Messages', active: false },
  { icon: 'pi-folder', label: 'Projects', active: false },
  { icon: 'pi-chart-bar', label: 'Analytics', active: false },
  { icon: 'pi-cog', label: 'Settings', active: false },
];`,
  },
  {
    id: 'sidebar-mini-tooltips',
    name: 'Mini with Tooltips',
    description: 'Narrow icon sidebar with PrimeNG tooltip on hover',
    category: 'sidebar',
    previewComponent: SidebarMiniTooltipsPreview,
    htmlCode: `<!-- Requires: import { Tooltip } from 'primeng/tooltip'; -->
<nav class="w-14 bg-surface-0 border-r border-surface-200 flex flex-col items-center py-3 gap-1 h-screen">
  <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-contrast mb-3">
    <i class="pi pi-th-large text-sm"></i>
  </div>
  @for (item of items; track item.icon) {
    <a
      class="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
      [class]="item.active
        ? 'bg-primary/10 text-primary'
        : 'text-surface-500 hover:bg-surface-100 hover:text-surface-700'"
      [pTooltip]="item.label" tooltipPosition="right"
    >
      <i class="pi" [class]="item.icon"></i>
    </a>
  }
  <div class="flex-1"></div>
  <a class="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer
    text-surface-500 hover:bg-surface-100 hover:text-surface-700 transition-colors"
    pTooltip="Settings" tooltipPosition="right">
    <i class="pi pi-cog"></i>
  </a>
</nav>`,
    tsCode: `// Import: Tooltip from 'primeng/tooltip'

items = [
  { icon: 'pi-home', label: 'Home', active: true },
  { icon: 'pi-inbox', label: 'Inbox', active: false },
  { icon: 'pi-calendar', label: 'Calendar', active: false },
  { icon: 'pi-chart-bar', label: 'Analytics', active: false },
  { icon: 'pi-users', label: 'Team', active: false },
];`,
  },
];
