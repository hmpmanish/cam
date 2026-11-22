# Product & Engineering Guidelines

## Core Philosophy
We do not build generic "vibe" products or rely on AI clichés. Every element must be intentional, grounded, and verified. Make no mistakes.

---

## 1. Visual Design & UI
- **No Purple Gradients:** Do not use purple/indigo gradients, gradient meshes, or glowing borders.
- **No Pill-Shaped Buttons:** Avoid `rounded-full` or oval button styling. Use structured standard border radii (e.g., 4px–8px).
- **No Emoji Icons:** Do not use emojis as iconography or UI decorative elements. Use clean SVG icons or standard text labels.
- **No Cursor Animations:** Do not add custom trailing cursors, pointer followers, or interactive mouse particle effects.
- **No Over-The-Top Scroll Animations:** Do not use scroll-jacking, heavy parallax, or distraction-heavy scroll triggers. State transitions must be fast and subtle.
- **No AI-Slop Imagery:** Do not use generic AI-generated photos, synthetic 3D avatars, or cliché stock assets. Use authentic assets or clean structural UI.

---

## 2. Copy & Content Standards
- **No Vague Hero Texts:** State clearly and immediately what the product does, who it is for, and how it functions. No empty taglines (e.g., "The future of workflow, reimagined").
- **No AI-Slop Copy:** Avoid empty buzzwords, corporate fluff, and generic AI cadences.
- **No Em Dashes:** Never use em dashes (`—`) in copy or documentation. Use standard hyphens, colons, or clean sentence structures instead.
- **Zero Fabrication:**
  - No fake reviews or synthetic testimonials.
  - No fake metrics or unbacked claims.
  - No fake customer counters (e.g., "Trusted by 10,000+ happy customers").

---

## 3. Launch Checklist & Gates
The application must not be launched until all of the following criteria are completed:
- [ ] **Custom Domain:** Connected, configured, and verified with valid SSL/TLS.
- [ ] **Favicon:** Production favicon package (SVG, PNG, ICO) created and properly linked.
- [ ] **No AI Attribution:** Any default "Made with AI", "Powered by...", or generator watermarks completely removed.
- [ ] **Privacy Policy:** Dedicated, compliant Privacy Policy page implemented and accessible.
- [ ] **Terms and Conditions:** Dedicated Terms and Conditions page implemented and accessible.
- [ ] **Quality Assurance:** Tested across devices, zero console errors, zero broken assets, zero functional defects.
