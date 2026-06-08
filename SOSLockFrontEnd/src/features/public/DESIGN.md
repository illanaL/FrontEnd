---
name: Sentinel Trust
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#43474f'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#737780'
  outline-variant: '#c3c6d1'
  surface-tint: '#3a5f94'
  primary: '#001e40'
  on-primary: '#ffffff'
  primary-container: '#003366'
  on-primary-container: '#799dd6'
  inverse-primary: '#a7c8ff'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#291c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#433000'
  on-tertiary-container: '#c59300'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a7c8ff'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#1f477b'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#ffdf9f'
  tertiary-fixed-dim: '#f9bd22'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5c4300'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
  surface-alt: '#F9FBFF'
  emergency-red: '#DC2626'
  success-green: '#059669'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  max-width: 1280px
---

## Brand & Style
The brand personality for this design system is centered on **unwavering reliability, emergency responsiveness, and professional security**. As a locksmith marketplace, the UI must immediately instill a sense of safety and technical competence. 

The design style follows a **Corporate / Modern** aesthetic with a lean toward **High-Contrast Precision**. It utilizes a structured, systematic approach to information architecture to ensure users in high-stress emergency situations can navigate the platform with zero friction. The visual language is "built to last"—clean lines, substantial weights, and a focus on clarity over decorative flourishes.

## Colors
The palette is anchored by **Sentinel Blue** (`#003366`), a deep, authoritative navy that evokes the stability of a physical security institution. This is supported by an **Action Blue** (`#2563EB`) for primary interactions and a **Security Yellow** (`#FBBF24`) used sparingly for critical warnings or "Emergency Call" highlights, creating high visibility against the darker tones.

The neutral scale uses a very dark navy-black (`#111827`) for text to maintain high contrast. Backgrounds alternate between pure white and a subtle, cool-tinted light blue (`#F9FBFF`) to differentiate sections without losing the clean, professional atmosphere.

## Typography
We utilize **Hanken Grotesk** for its sharp, contemporary geometry and exceptional legibility. Its high x-height and technical feel align with the locksmith industry's precision. For headlines, we use heavy weights (700-800) to convey authority and urgency.

**JetBrains Mono** is introduced for labels, badges, and status indicators. This monospaced font adds a "technical specification" aesthetic that reinforces the idea of skilled craftsmanship and precise mechanical work. It should be used for metadata, price points, and status tags (e.g., "ON THE WAY").

## Layout & Spacing
The layout follows a **Fixed Grid** model for desktop to maintain a compact, trustworthy feel, switching to a fluid model for mobile. We use an 8px baseline rhythm to ensure mathematical harmony across all components.

- **Desktop:** 12-column grid with 24px gutters. Content is centered with a max width of 1280px to prevent excessive line lengths in the marketplace listings.
- **Mobile:** 4-column fluid grid with 16px margins.
- **Reflow:** In emergency booking flows, content should be stacked vertically with large, "fat-finger" friendly touch targets (minimum 56px height).

## Elevation & Depth
To maintain a grounded and professional appearance, we avoid excessive shadows. Hierarchy is established primarily through **Tonal Layers** and **Low-Contrast Outlines**.

- **Level 0 (Base):** White or Surface-Alt (#F9FBFF).
- **Level 1 (Cards/Surface):** White background with a 1px solid border in a subtle cool gray.
- **Level 2 (Active/Emergency):** A soft, diffused shadow (0px 4px 20px rgba(0, 51, 102, 0.08)) is used only for high-priority elements like "Book Now" sticky buttons or floating emergency contact bars.

Interactive elements use slight inset shadows on "active" states to simulate a tactile, mechanical press.

## Shapes
The shape language is **Soft** but disciplined. We use a base radius of 4px (`0.25rem`) for most components. This creates a modern look while maintaining the "hard edges" associated with metal, tools, and security hardware. 

- **Primary Buttons:** 4px radius.
- **Input Fields:** 4px radius.
- **Badges/Chips:** Full pill-shape (8px+) to distinguish them from actionable buttons.
- **Containers:** 8px (`rounded-lg`) for large content blocks or service cards.

## Components
- **Buttons:** Primary buttons use Sentinel Blue with bold white text. The "Emergency" button variant uses Security Yellow with Black text for maximum disruption. Buttons should have a heavy, solid appearance.
- **Input Fields:** Use a 1px border. In "focus" state, the border thickens to 2px and changes to Action Blue. Labels should be persistent or use a clear float to ensure the user never loses context.
- **Service Cards:** Use Level 1 elevation (border-only). Header sections of cards should use a light blue tint to separate the locksmith's name/title from their rating and price.
- **Trust Badges:** Specialized components for "Verified Pro" or "Insured," using the monospaced label font and small, precise icons.
- **Locksmith Profile Lists:** Dense information layouts using JetBrains Mono for technical specs (e.g., "Available in 20 min", "Licensed in [Region]").
- **Checkboxes/Radios:** Use Action Blue for the "checked" state. The design should be boxy and robust, reinforcing the "locking" metaphor.