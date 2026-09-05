---
name: Apex Dark Analytics
colors:
  surface: '#10131a'
  surface-dim: '#10131a'
  surface-bright: '#363940'
  surface-container-lowest: '#0b0e14'
  surface-container-low: '#191c22'
  surface-container: '#1d2026'
  surface-container-high: '#272a31'
  surface-container-highest: '#32353c'
  on-surface: '#e1e2eb'
  on-surface-variant: '#bac9cc'
  inverse-surface: '#e1e2eb'
  inverse-on-surface: '#2e3037'
  outline: '#849396'
  outline-variant: '#3b494c'
  surface-tint: '#00daf3'
  primary: '#c3f5ff'
  on-primary: '#00363d'
  primary-container: '#00e5ff'
  on-primary-container: '#00626e'
  inverse-primary: '#006875'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffe7e8'
  on-tertiary: '#67001b'
  tertiary-container: '#ffc1c4'
  on-tertiary-container: '#b40036'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#9cf0ff'
  primary-fixed-dim: '#00daf3'
  on-primary-fixed: '#001f24'
  on-primary-fixed-variant: '#004f58'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdadb'
  tertiary-fixed-dim: '#ffb2b7'
  on-tertiary-fixed: '#40000d'
  on-tertiary-fixed-variant: '#92002a'
  background: '#10131a'
  on-background: '#e1e2eb'
  surface-variant: '#32353c'
typography:
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-numeric-lg:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.03em
  label-numeric-md:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: -0.02em
  label-numeric-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0em
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter-xs: 0.25rem
  gutter-sm: 0.5rem
  gutter-md: 0.75rem
  gutter-lg: 1rem
  margin-mobile: 1rem
  card-padding-compact: 0.875rem
  card-padding-spacious: 1.25rem
  touch-target-min: 2.75rem
---

## Brand & Style

This design system delivers a high-precision, executive-tier mobile sales command center. It balances the analytical clarity of Bloomberg terminals with the tactile, luminous refinement of contemporary high-end fintech. 

The aesthetic is built on **Technical Dark Minimalist with Luminous High-Contrast Accents**. By submerging the canvas into deep, optical slate-indigo, information surfaces recede smoothly, allowing vibrant data beacons—emerald, electric cyan, and soft coral—to communicate real-time velocity, performance delta, and risk states instantly.

### Tone & Experience
- **Authoritative & Discreet:** Eliminates visual noise, gimmicky gradients, and heavy shadows. Everything serves legibility and analytical speed.
- **Precision Engineered:** Ultra-sharp geometric typography paired with tabular numeric figures creates absolute rhythm across multi-column financial layouts.
- **Tactile Fluidity:** Components are specifically shaped and sized for one-handed thumb navigation, rapid metric toggle switching, and continuous vertical triage on high-DPI OLED screens.

## Colors

The color architecture is optimized exclusively for OLED and dark mobile displays, maximizing dynamic range while eliminating glare and optical vibration.

### Surface Tiers
- **Canvas Base (`#0B0E14`):** An ultra-deep obsidian-indigo base that grounds the mobile viewport.
- **Card Surface (`#121722`):** Elevated structural background for metrics cards, pipeline containers, and lists.
- **Interactive Surface (`#1B2232`):** Pill filters, inactive switches, and nested micro-containers.
- **Border / Divider (`#252E42`):** Crisp 1px structural strokes that maintain separation without visual friction.

### High-Contrast Data Accents
- **Primary Accent (`#00E5FF` - Electric Cyan):** Designates active targets, current quotas, focus states, and primary navigational triggers.
- **Secondary Accent (`#10B981` - Emerald Growth):** Reserved for positive growth trajectory, upward delta flags, and surplus revenue states.
- **Tertiary Accent (`#F43F5E` - Rose Alert):** Highlights overdue pipelines, conversion drops, churn risks, and critical alerts.
- **Warning Accent (`#F59E0B` - Amber Pace):** Flags stalled deals and secondary performance indicators.

### Functional Typography Spectrum
- **Text Primary (`#F8FAFC`):** Highest contrast white for primary metrics, card headlines, and critical currency values.
- **Text Secondary (`#94A3B8`):** Muted slate for metric metadata, subheadings, and axis labels.
- **Text Muted (`#475569`):** Low-contrast tone for passive timestamps, currency codes, and disabled states.

## Typography

Typography enforces cognitive hierarchy across dense financial summaries. 

### Typographic Hierarchy & Roles
- **Headlines (`Space Grotesk`):** Delivers sharp, futuristic confidence to top-level balance cards, views, and section dividers. Always tracked tightly to maintain structural density.
- **Body (`Hanken Grotesk`):** Provides clean, distraction-free neutral readability across customer names, product categories, and transaction descriptors.
- **Financial & Data Metrics (`JetBrains Mono`):** Applied to currency amounts, progress ring percentages, and delta badges. The fixed tabular figures prevent layout jitter during real-time data streaming and ease comparative vertical scanning across rows.
- **Meta & Overlines (`Space Grotesk Uppercase`):** Micro-labels in all caps with wide letter spacing (`0.08em`) to demarcate sub-sections without dominating visual weight.

## Layout & Spacing

Designed primarily for single-column mobile viewports (375px to 430px base portrait screens) with strict touch-geometry rules.

### Layout Mechanics
- **Base Grid & Margins:** Fluid vertical flow bounded by a mandatory `16px` (`margin-mobile`) horizontal viewport safe area.
- **Card Spacing:** All metric cards, pipeline modules, and transaction blocks stack vertically with an `8px` or `12px` gap to maximize visible data above the fold while maintaining separation.
- **Dual Column Sub-Grids:** Inside metric overviews, an asymmetrical or balanced 2-column grid (`gutter-sm: 8px`) displays secondary metric cards (e.g., Conversion Rate vs. Churn Risk).
- **Safe Interaction Zones:** Fixed bottom navigation and floating quick-filter drawers incorporate a minimum `44px` (`touch-target-min`) tap zone with dedicated padding for modern mobile home indicators.

## Elevation & Depth

Visual separation relies on tonal layering, micro-borders, and subtle luminescence rather than muddy drop shadows.

### Elevation Architecture
1. **Level 0 (App Shell / Canvas):** Deepest tone (`#0B0E14`). Completely flat.
2. **Level 1 (Data Cards & Rows):** `#121722` bounded by a crisp `1px solid #252E42` border. No shadow required on OLED, as edge contrast creates separation.
3. **Level 2 (Active States & Floating Panels):** `#1B2232` with a subtle top highlight (`1px solid #334155`) to replicate physical edge reflection.
4. **Level 3 (Modal Sheets & Floating Bottom Bars):** `#121722` with a 90% opacity alpha blur (`backdrop-filter: blur(16px)`) and a diffuse ambient glow: `0 12px 32px rgba(0, 0, 0, 0.6)`.

### Luminous Data Accents
Key interactive anchors and critical data points utilize restrained neon glow halos:
- **Positive Surge:** `box-shadow: 0 0 12px rgba(16, 185, 129, 0.25)` on status pills and milestone indicators.
- **Current Run-Rate Focus:** `box-shadow: 0 0 16px rgba(0, 229, 255, 0.2)` on high-priority action rings and active pill filters.

## Shapes

The design system employs controlled geometric rounding that balances modern software polish with data density.

### Shape Scales
- **Base Cards & Graph Containers:** `16px` (`rounded-lg`) corner radii offer a smooth handheld envelope while maintaining clean structural alignment on narrow displays.
- **Pills & Status Tags:** Fully rounded pill geometry (`9999px`) to distinguish categorical and temporal tags from rectangular metric surfaces.
- **Progress Bars & Pipeline Fill:** Semi-rounded ends (`6px`) to ensure precise visual alignment against container axes without distortion at low percentage values.
- **Micro UI & Steppers:** `8px` (`rounded`) for compact square icon buttons and segment switch handles.

## Components

### Metric Cards
- **Structure:** Compact `#121722` surface with 1px border (`#252E42`), internal padding of `14px`.
- **Top Row:** Metric title (`label-caps`, `#94A3B8`) paired with an icon or trend pill badge.
- **Core Value:** Primary revenue or deal amount displayed in `label-numeric-lg` (`#F8FAFC`).
- **Delta Indicator:** Sub-metric row featuring an emerald growth badge (`+18.4% vs last week`) or rose alert badge (`-4.2% vs target`), wrapped in an ultra-subtle tinted pill (`10% fill`).

### Quick-Filter Pills & Segmented Switches
- **Container:** Horizontal sliding rail with snap points, padded with `4px` gutters.
- **Pill Attributes:** Inactive pills feature `#1B2232` background and `#94A3B8` text. Active pill snaps to high-contrast cyan-accented border (`#00E5FF`), deep indigo fill, and white label.
- **Thumb Switches:** Two- or three-way toggle switch for switching between metrics (e.g., "MRR", "ARR", "Net Churn") within an inset dark track.

### Progress Rings & Pipeline Bar Charts
- **Radial Rings:** Concentric, thin-stroke (4px–6px) SVG rings with flat track backings (`#1E293B`) and vibrant accent fore fills (`#00E5FF`, `#10B981`). Numeric achievement percentage anchored precisely in the geometric center using `label-numeric-sm`.
- **Pipeline Stage Bars:** Horizontal stacked or tiered horizontal bar charts. Each bar displays stage label, deal count, and volume with rounded terminal caps, using graded opacities of cyan and emerald.

### Sales Transaction & Activity List
- **Row Architecture:** Edge-to-edge list item with top and bottom hair-line borders (`#1E2638`). Tap feedback triggers a background flash to `#1B2232`.
- **Left Column:** Client or company avatar badge with categorical initial and status indicator dot (e.g., closed-won, in-escrow, failed).
- **Center Column:** Deal title (`title-md`) stacked over timestamp and sales owner name (`body-sm`, `#94A3B8`).
- **Right Column:** Transaction value right-aligned in `label-numeric-md` with dynamic color coding: emerald for closed/received revenue, neutral slate for pending/commit.

### Alert Banners
- Inset cards with soft rose edge-tinting (`1px solid rgba(244, 63, 94, 0.4)`), `#1A1520` background, and high-visibility alert icon, used to immediately notify the rep of deals stalled past 14 days.