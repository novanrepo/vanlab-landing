# Vanlab Website - AI Coding Agent Instructions

## Project Overview
Single-page portfolio website for Vanlab, an artisan no-code/low-code software development agency. **Migrated to Next.js 14** with TypeScript, maintaining 100% visual and functional parity with the original vanilla site. Uses App Router, React hooks, and optimized fonts/images.

## Architecture & Structure

### Core Files (Next.js)
- `app/layout.tsx` - Root layout with font optimization (Inter + MuseoModerno), metadata
- `app/page.tsx` - Client component with all sections and React-based interactions
- `app/globals.css` - Complete styling with CSS custom properties, animations, and responsive breakpoints
- `public/assets/` - Static assets (logo.png, novan-profile.png, vanlab-studio.mp4)
- `package.json` - Dependencies: Next.js 14, React 18, TypeScript
- `next.config.js` - Next.js configuration
- `tsconfig.json` - TypeScript configuration

### Legacy Files (Can be deleted after verification)
- `index.html` - Original HTML (replaced by app/page.tsx)
- `style.css` - Original CSS (migrated to app/globals.css)
- `script.js` - Original vanilla JS (converted to React hooks in page.tsx)
- `assets/` - Original assets folder (now using public/assets/)

### Design System (CSS Variables in `app/globals.css`)
```css
/* Colors */
--primary: #0ED7B5 (teal accent color - used everywhere)
--bg-color: #050505 (dark background)
--surface-color: #111111 (card backgrounds)
--text-muted: #a1a1a1 (secondary text)
--primary-glow: rgba(14, 215, 181, 0.4) (glow effects)

/* Fonts (via next/font/google in layout.tsx) */
--font-inter: Inter font family variable (body copy)
--font-museo: MuseoModerno font family variable (headings/brand)
```

**Critical**: 
- Always use CSS variables for colors. Never hardcode `#0ED7B5` - use `var(--primary)` instead.
- Font families are injected via Next.js font optimization - reference with `var(--font-inter)` or `var(--font-museo)`
- For inline styles in TSX, use: `style={{ fontFamily: 'var(--font-museo)' }}`

## Key Patterns & Conventions

### Component Structure (app/page.tsx)
The entire site is a single client component (`'use client'`) because it uses interactive features. All sections are in `app/page.tsx`:
```tsx
export default function Home() {
  // React hooks for state and effects
  const [hasAnimated, setHasAnimated] = useState(false)
  
  useEffect(() => {
    // All vanilla JS converted to React effects
  }, [])
  
  return (
    <>
      <div className="cursor-dot"></div>
      <div className="cursor-outline"></div>
      <header>...</header>
      <main>
        <section className="hero">...</section>
        <section id="services">...</section>
        {/* More sections */}
      </main>
      <footer>...</footer>
    </>
  )
}
```

### Section Structure
Every major section follows this pattern:
```tsx
<section className="section-name">
    <div className="container">
        <div className="section-header">
            <h2 className="section-title">Title</h2>
            <p className="section-subtitle">Subtitle</p>
        </div>
        {/* section-specific content */}
    </div>
</section>
```

### Image Optimization
Use Next.js `Image` component for automatic optimization:
```tsx
import Image from 'next/image'

<Image 
  src="/assets/logo.png" 
  alt="Vanlab Logo" 
  width={120} 
  height={40}
  priority // for above-the-fold images
/>
```

**Asset paths**: 
- Original: `assets/logo.png`
- Next.js: `/assets/logo.png` (references `public/assets/logo.png`)

### Card Components
All cards (service-card, work-card, testimonial-card, expertise-item) share styling:
- `background: rgba(255, 255, 255, 0.03)` - semi-transparent white
- `border: 1px solid rgba(255, 255, 255, 0.05)` - subtle border
- `:hover` - translates up (`translateY(-10px)`) and border becomes `var(--primary)`

### Custom Cursor System
- `.cursor-dot` and `.cursor-outline` elements track mouse movement
- Interactive elements (`a`, `button`, cards) scale cursor outline on hover
- Implemented in `useEffect` hook in `app/page.tsx` with `mousemove` listener
- **When adding new interactive elements**: Add to `interactiveElements` selector in the cursor effect hook

### React Patterns Used

#### Event Handlers
```tsx
// Smooth scroll
const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault()
  const href = e.currentTarget.getAttribute('href')
  const target = document.querySelector(href!)
  target?.scrollIntoView({ behavior: 'smooth' })
}

// Form submission
const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  alert('Thank you! We will get back to you soon.')
}
```

#### State Management
```tsx
const [hasAnimated, setHasAnimated] = useState(false) // For counter animation
```

#### Effects (useEffect)
All vanilla JS functionality converted to React hooks:
- Custom cursor tracking
- Text reveal animations
- Smooth scroll navigation
- Stats counter with scroll trigger
- Event listeners cleanup on unmount

### Animations & Effects

#### Text Reveal (Hero Section)
- `.reveal-text` spans animate in with staggered delays
- Uses opacity + `translateY(20px)` with `cubic-bezier(0.25, 0.8, 0.25, 1)`
- Delays calculated in `useEffect`: `${index * 0.2}s`

#### Floating Background Circles
- `.circle-1` and `.circle-2` with `blur(80px)` filter
- `@keyframes float` - translates elements in infinite loop
- Creates ambient visual interest without competing with content

#### Counter Animation (Stats Section)
- Scroll-triggered: Animates when `.stats` enters viewport
- `hasAnimated` state prevents re-triggering
- Uses `requestAnimationFrame` for smooth counting from 0 to `data-target` value
- Implemented in `useEffect` with scroll event listener

#### Infinite Marquee
- `.marquee-content` with duplicated tech stack names
- `@keyframes scroll` translates `-50%` for seamless loop
- `animation: scroll 20s linear infinite`

### Smooth Scroll Navigation
All navigation handled in `useEffect` with click event listeners:
```tsx
anchors.forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href')!)
    target?.scrollIntoView({ behavior: 'smooth' })
  })
})
```

### Form Handling
Contact form uses `onSubmit` handler:
```tsx
const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  alert('Thank you! We will get back to you soon.')
}
```
No backend integration - form data not captured. To add real submission:
1. Create API route in `app/api/contact/route.ts`
2. Update form handler to fetch the API route
3. Add email notification service (SendGrid, Resend, etc.)

## Responsive Design
- Single breakpoint: `@media (max-width: 768px)`
- Grid layouts use `auto-fit, minmax()` for fluid columns
- Mobile hides `.nav`, shows `.mobile-menu-btn` (not functional - only styled)

**To implement mobile menu**: Add state management (`useState`) for menu toggle in `app/page.tsx` and update button `onClick` handler.

## Development Workflow

### Running the Project
```bash
# Install dependencies (first time only)
npm install

# Development server with hot reload
npm run dev
# Opens at http://localhost:3000

# Production build
npm run build
npm start

# Type checking
npx tsc --noEmit
```

### Making Changes
1. Edit files in `app/` directory
2. Changes auto-reload in browser (Fast Refresh)
3. Check terminal for TypeScript/build errors
4. Test responsive: Use browser DevTools device emulation

### Adding New Sections
1. Edit `app/page.tsx` to add new section following the TSX pattern
2. Add matching entry in header navigation
3. Add styles to `app/globals.css` following existing conventions
4. Add any interactive logic to `useEffect` hooks in page.tsx

### Color/Theme Changes
- Update CSS variables in `:root` only (in `app/globals.css`)
- `--primary` affects: buttons, links, borders, icons, accents throughout
- Glow effects use `--primary-glow: rgba(14, 215, 181, 0.4)`

## Tech Stack Reference
Website showcases these no-code/low-code platforms in marquee:
Flutterflow, Directus, Framer, Firebase, Supabase, Filament, Weweb, Claude code, Frappe, NextJS, n8n

**When editing**: Maintain this list in `.marquee-content` (duplicated for infinite scroll effect).

## Common Modifications

### Adding Portfolio Work Item
Edit `.work-grid` in `app/page.tsx`:
```tsx
<div className="work-card">
    <div className="work-image">
        <Image 
          src="/assets/project-image.png" 
          alt="Project Name"
          width={400}
          height={250}
        />
    </div>
    <div className="work-info">
        <h3>Project Name</h3>
        <p>Description</p>
        <div className="work-tags">
            <span>Tech1</span>
            <span>Tech2</span>
        </div>
    </div>
</div>
```

### Updating Founder Profile
- Image: Replace `public/assets/novan-profile.png`
- Text: Edit `.founder-info` section in `app/page.tsx`
- Experience badge: Update `.founder-badge` `.badge-number` data-target

### Changing Stats
Edit `data-target` attributes in `.stat-item` elements in `app/page.tsx`. Animation automatically adjusts.

## Files to Keep

The original files are preserved and can be deleted once you're satisfied:
- `index.html`
- `script.js`
- `style.css`
- `style.css.backup`
- `assets/` folder (keep for reference, but using `public/assets/` now)

## Browser Support
Uses modern CSS (custom properties, grid, blur) and JS (arrow functions, template literals). Targets evergreen browsers. No IE11 support needed.
