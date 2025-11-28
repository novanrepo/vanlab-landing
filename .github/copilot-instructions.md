# Vanlab Website - AI Coding Agent Instructions

## Project Overview
Single-page portfolio website for Vanlab, an artisan no-code/low-code software development agency. Built with vanilla HTML, CSS, and JavaScript - no build tools or frameworks. Direct file editing and browser preview workflow.

## Architecture & Structure

### Core Files
- `index.html` - Single-page site with all sections (hero, services, work, about, testimonials, contact)
- `style.css` - Complete styling with CSS custom properties, animations, and responsive breakpoints
- `script.js` - Vanilla JS for interactions (custom cursor, smooth scroll, counter animations, form handling)
- `assets/` - Images (logo.png, novan-profile.png, contact-bg.jpg)

### Design System (CSS Variables in `:root`)
```css
--primary: #0ED7B5 (teal accent color - used everywhere)
--bg-color: #050505 (dark background)
--surface-color: #111111 (card backgrounds)
--text-muted: #a1a1a1 (secondary text)
--font-heading: 'MuseoModerno' (all headings and brand text)
--font-body: 'Inter' (body copy)
```

**Critical**: Always use CSS variables for colors. Never hardcode `#0ED7B5` - use `var(--primary)` instead.

## Key Patterns & Conventions

### Section Structure
Every major section follows this pattern:
```html
<section class="section-name">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Title</h2>
            <p class="section-subtitle">Subtitle</p>
        </div>
        <!-- section-specific content -->
    </div>
</section>
```

### Card Components
All cards (service-card, work-card, testimonial-card, expertise-item) share styling:
- `background: rgba(255, 255, 255, 0.03)` - semi-transparent white
- `border: 1px solid rgba(255, 255, 255, 0.05)` - subtle border
- `:hover` - translates up (`translateY(-10px)`) and border becomes `var(--primary)`

### Custom Cursor System
- `.cursor-dot` and `.cursor-outline` elements track mouse movement
- Interactive elements (`a`, `button`, cards) scale cursor outline on hover
- Implemented in `script.js` with `mousemove` listener and CSS transforms
- **When adding new interactive elements**: Add to `interactiveElements` selector in `script.js`

### Animations & Effects

#### Text Reveal (Hero Section)
- `.reveal-text` spans animate in with staggered delays
- Uses opacity + `translateY(20px)` with `cubic-bezier(0.25, 0.8, 0.25, 1)`
- Delays calculated: `${index * 0.2}s`

#### Floating Background Circles
- `.circle-1` and `.circle-2` with `blur(80px)` filter
- `@keyframes float` - translates elements in infinite loop
- Creates ambient visual interest without competing with content

#### Counter Animation (Stats Section)
- Scroll-triggered: Animates when `.stats` enters viewport
- `hasAnimated` flag prevents re-triggering
- Uses `requestAnimationFrame` for smooth counting from 0 to `data-target` value

#### Infinite Marquee
- `.marquee-content` with duplicated tech stack names
- `@keyframes scroll` translates `-50%` for seamless loop
- `animation: scroll 20s linear infinite`

### Smooth Scroll Navigation
All `href="#section"` links handled by JavaScript:
```javascript
anchor.addEventListener('click', function (e) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
});
```

### Form Handling
Contact form uses `e.preventDefault()` with simple alert feedback. No backend integration - form data not captured. To add real submission:
1. Update form action/method or
2. Replace alert with fetch/AJAX call in `script.js`

## Responsive Design
- Single breakpoint: `@media (max-width: 768px)`
- Grid layouts use `auto-fit, minmax()` for fluid columns
- Mobile hides `.nav`, shows `.mobile-menu-btn` (not functional - only styled)

**To implement mobile menu**: Add click handler to `.mobile-menu-btn` that toggles `.nav` display/transform.

## Development Workflow

### Testing Changes
1. Edit files directly
2. Save (changes persist immediately in OneDrive)
3. Refresh browser (no build step required)
4. Test responsive: Use browser DevTools device emulation

### Adding New Sections
1. Follow section structure pattern above
2. Add matching entry in header `.nav-list` with `href="#new-section"`
3. Create corresponding styles in `style.css` following existing conventions
4. Add animation triggers in `script.js` if needed

### Color/Theme Changes
- Update CSS variables in `:root` only
- `--primary` affects: buttons, links, borders, icons, accents throughout
- Glow effects use `--primary-glow: rgba(14, 215, 181, 0.4)`

## Tech Stack Reference
Website showcases these no-code/low-code platforms in marquee:
Flutterflow, Directus, Framer, Firebase, Supabase, Filament, Weweb, Claude code, Frappe, NextJS, n8n

**When editing**: Maintain this list in `.marquee-content` (duplicated for infinite scroll effect).

## Common Modifications

### Adding Portfolio Work Item
Edit `.work-grid` in `index.html`:
```html
<div class="work-card">
    <div class="work-image">
        <div class="work-placeholder" style="background: linear-gradient(...)"></div>
    </div>
    <div class="work-info">
        <h3>Project Name</h3>
        <p>Description</p>
        <div class="work-tags">
            <span>Tech1</span>
            <span>Tech2</span>
        </div>
    </div>
</div>
```

### Updating Founder Profile
- Image: Replace `assets/novan-profile.png`
- Text: Edit `.founder-info` section in `index.html`
- Experience badge: Update `.founder-badge` `.badge-number` data-target

### Changing Stats
Edit `data-target` attributes in `.stat-item` elements. Animation automatically adjusts.

## Files Not to Modify
- `style.css.backup` - Backup file, leave untouched

## Browser Support
Uses modern CSS (custom properties, grid, blur) and JS (arrow functions, template literals). Targets evergreen browsers. No IE11 support needed.
