# Plan Landing Page 2026
> Research-based · Standardy technologiczne i wizualne · Motyw: jasny, biała sekcja hero

---

## Struktura sekcji

### 1. Navbar
Sticky, glassmorphism-lite (`backdrop-filter: blur`), transparent na starcie → solid po scrollu. Logo + 3–4 linki + jeden CTA button. Brak hamburger na mobile — drawer z bottom sheet.

**Tagi:** `position: sticky` · `backdrop-filter` · `scroll-driven`

---

### 2. Hero — white full-screen ⭐
100svh, biała (`#fff`). Headline oversized (`clamp(48px, 7vw, 88px)`), variable font — waga animowana przy wejściu z 200→700. Podtytuł max 2 linijki, `max-width: 42ch`. Dwa CTA: primary filled + secondary ghost.

Tło: czysty biel + bardzo delikatny noise texture SVG (`opacity: 0.03`) lub subtelny dot grid CSS. **Brak stock photo w hero.**

**Tagi:** `clamp()` · `font-variation-settings` · `100svh` · No stock photos

```
┌─────────────────────────────────────────────┐
│  ✦ New — v2.0 just launched                 │
│                                             │
│  The faster way                             │
│  to build products                          │
│                                             │
│  A clean, focused platform for teams        │
│  who care about craft.                      │
│                                             │
│  [Get started free]  [See how it works →]   │
└─────────────────────────────────────────────┘
  white hero · noise texture · variable font
```

---

### 3. Social proof / Logo strip
Marquee (CSS animation, infinite scroll) lub statyczna siatka. Monochromatyczne loga (grayscale + hover: color). Sekcja bardzo wąska — 80–100px wysokości max.

---

### 4. Features / Value props
3–4 karty w gridzie (`auto-fit, minmax(280px, 1fr)`). Każda: ikona SVG inline (nie font) + bold headline + 2 zdania opisu. Scroll reveal: `fade + translateY(20px)` via Intersection Observer. Brak tła — karty na białym tle z delikatnym borderem.

**Tagi:** `IntersectionObserver` · `CSS Grid`

---

### 5. Product showcase / Demo
Sticky scroll — użytkownik scrolluje, UI zmienia się w lewej kolumnie. Prawa: krótki opis punktowy. Alternatywa: browser mockup z UI screenshot + animacja cursor. Lottie lub CSS-only animation.

**Tagi:** `position: sticky` · `scroll-timeline`

---

### 6. Testimonials
Masonry grid lub 3-kolumnowy layout. Każda opinia: awatar (initials circle), imię, stanowisko, max 3 zdania. Brak carouseli — pełne pokazanie treści. Tło sekcji: lekkie off-white (`#FAFAFA`).

---

### 7. Pricing
3 plany w flex row. Środkowy: `border: 2px accent` + badge "Most popular". Toggle monthly/yearly (CSS transition cen). Prosta tabela porównawcza pod kartami (opcjonalnie). CTA per plan.

---

### 8. FAQ
Accordion. `<details>` / `<summary>` bez JS. Animacja height via CSS grid trick (`grid-template-rows: 0fr → 1fr`). Max 8 pytań.

**Tagi:** `details / summary` · No JS

---

### 9. CTA final + Email capture
Duży headline centered, inline form (email + button). Tło: ciemne (`#111`) lub nasycony accent kolor — jedyna ciemna sekcja na stronie, kontrast z białym hero.

---

### 10. Footer
4-kolumnowy grid. Linki nawigacyjne + social icons (SVG inline) + copyright. Minimalistyczny, lekki. Brak heavy imagery.

---

## Specyfikacja techniczna

### Typografia
- 1 variable font (Google Fonts: **Inter** lub **Geist**) — jedno źródło, jeden plik
- Headline: `clamp(48px, 7vw, 88px)`, waga animowana CSS
- Body: `17px / 1.7`
- Brak więcej niż 2 krojów pisma

### Kolory
- Paleta: biały `#FFF` + off-white `#FAFAFA` + charcoal `#111` + 1 accent (np. indigo `#4F46E5` lub stone `#6B7280`)
- Ciemna sekcja tylko w CTA footer
- Monochromatic podejście — mniej to więcej

### Animacje
- CSS-only gdzie możliwe (`transform + opacity` = GPU-accelerated)
- Scroll reveal: `IntersectionObserver` API
- Scroll-driven animations (CSS `animation-timeline`) dla progress
- **Zawsze:** `@media (prefers-reduced-motion: reduce)`
- Brak GSAP w pierwszym ładowaniu

### Wydajność (Core Web Vitals)
| Metryka | Target |
|---------|--------|
| LCP | < 2.5s |
| CLS | = 0 |
| INP | < 200ms |
| Lighthouse score | ≥ 95 |

- Hero image: `fetchpriority="high"`, brak lazy loading dla ATF
- Czcionki: `font-display: swap` + `<link rel="preload">`
- Obrazy: WebP + `loading="lazy"` (poniżej fold)
- Brak zewnętrznych skryptów ładowanych synchronicznie

### CSS architektura
- Custom properties w `:root`: `--color-*`, `--space-*`, `--radius-*`
- BEM lub utility-first (Tailwind)
- Brak `!important`
- Reset: `modern-normalize`

### Responsywność
- Mobile-first approach
- Breakpointy: `480px` / `768px` / `1024px` / `1280px`
- Thumb zones — CTA w dolnej połowie ekranu na mobile
- Fluid spacing: `clamp()` zamiast fixed margin
- `svh` / `dvh` zamiast `vh` dla hero na iOS Safari

### Scroll smoothing
- `scroll-behavior: smooth` w CSS
- Scroll snapping dla sekcji (opcjonalnie: `scroll-snap-type: y mandatory`)
- `Lenis.js` jeśli potrzeba easing (lightweight, ~3kb)

### Dostępność (WCAG 2.1 AA)
- Kontrast tekst/tło ≥ 4.5:1
- `focus-visible` outline na elementach interaktywnych
- ARIA labels na ikonach dekoracyjnych
- Skip-to-content link
- Accordion przez `<details>/<summary>` (semantyczny HTML)

### HTML semantyka
- Kolejność: `<header>` → `<nav>` → `<main>` → `<section>` → `<footer>`
- Jedna `<h1>` na stronie (hero headline)
- Hierarchia nagłówków: h1 → h2 → h3, bez pomijania

### Bundle / zależności
- Brak jQuery, brak Bootstrap
- Vanilla JS lub minimal framework (Astro / Next.js)
- `IntersectionObserver` — natywny, brak polyfill
- Lottie tylko jeśli potrzebna złożona animacja (< 50kb)

---

## Trendy 2026 zastosowane w projekcie

| Trend | Implementacja |
|-------|---------------|
| **Typography-led hero** | Headline jako główny element wizualny, nie zdjęcie. Variable font z animowaną wagą, kinetic na scroll lub hover. |
| **Micro-interactions** | Hover na CTA (scale + shadow), checkbox toggle animowany, form fields z reakcją na input. CSS-only pierwszeństwo. |
| **Content-first layout** | Generous whitespace, limited color palette, single prominent CTA. Zero elementów dekoracyjnych bez sensu. |
| **Mobile-native first** | Thumb zones, gesture-friendly, vertical-first media. Brak desktop-cropped layoutów na mobile. |
| **Scroll reveal staggered** | Sekcje wchodzą z fade+translateY. Stagger delay między kartami. IntersectionObserver, nie scroll event. |
| **Dark mode ready** | CSS custom properties w `:root`. `@media (prefers-color-scheme: dark)` automatyczny. Toggle opcjonalnie. |

---

## Uzasadnienie decyzji projektowych

### Dlaczego biały hero bez stock photo?
W 2026 typografia sama w sobie niesie cały design — oversized headline na białym tle tworzy pewny, minimalistyczny efekt. Sekcje hero coraz częściej używają kinetic letteringu i variable fonts reagujących na interakcję zamiast polegać na kosztownych zasobach graficznych.

### Dlaczego CSS animacje zamiast bibliotek?
CSS-based animations są znacznie lżejsze od JavaScript-driven. IntersectionObserver to wyraźny zwycięzca nad starymi metodami scroll event — dostarcza płynne doświadczenie bez obciążania przeglądarki i bez blokowania main thread.

### Dlaczego wydajność jest priorytetem?
Google Core Web Vitals wpływają na rankingi organiczne i Quality Score dla kampanii płatnych. Strona ładująca się wolno lub nieoczekiwanie przesuwająca layout straci użytkowników zanim ci zobaczą ofertę.

### Dlaczego content-first layout?
Clean design stawiający treść na pierwszym miejscu: generous whitespace, clear visual hierarchy i limited color palette sprawia, że content jest łatwy do skanowania. Każdy dodatkowy element wizualny bez funkcji konwersyjnej to koszt — uwagi użytkownika, czasu ładowania, czytelności.

---

*Plan stworzony na podstawie researchu trendów: Figma Web Design Trends 2026, Moburst Landing Page Trends 2026, SaaSFrame Blog, Lovable Design Guides, Fontfabric Typography Trends 2026.*
