# Vanlab Website - Next.js Version

This is the Next.js refactored version of the Vanlab portfolio website. The visual result remains exactly the same as the original vanilla HTML/CSS/JS version.

## What Changed

### Architecture
- **Original**: Single `index.html` with vanilla JS and CSS
- **New**: Next.js 14 with App Router, React components, and TypeScript

### File Structure
```
app/
├── layout.tsx          # Root layout with fonts and metadata
├── page.tsx            # Main page component (all sections)
└── globals.css         # Global styles (converted from style.css)
public/
└── assets/            # Images and videos (moved from assets/)
package.json           # Dependencies and scripts
tsconfig.json          # TypeScript configuration
next.config.js         # Next.js configuration
```

### Key Improvements
- **Google Fonts Optimization**: Using `next/font` for automatic font optimization
- **Image Optimization**: Using Next.js `Image` component for automatic lazy loading and optimization
- **Better Performance**: Automatic code splitting and optimizations
- **TypeScript**: Type safety and better DX
- **Modern React**: Using hooks (`useEffect`, `useState`) instead of vanilla JS

### What Stayed the Same
- **All visual styles** - Exact same CSS
- **All animations** - Custom cursor, text reveal, counter animations, marquee
- **All interactions** - Smooth scroll, form handling
- **All content** - Same sections, text, and structure
- **Responsive design** - Same breakpoints and mobile layout

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Build for Production
```bash
npm run build
npm start
```

## Key Files

### `app/layout.tsx`
- Configures Google Fonts (Inter, MuseoModerno)
- Sets up metadata (title, description)
- Root HTML structure

### `app/page.tsx`
- Main page component marked as 'use client' for interactivity
- All sections: Header, Hero, Services, Marquee, Work, Process, Founder, Testimonials, Stats, Contact, Footer
- All JavaScript interactions converted to React hooks

### `app/globals.css`
- All original styles preserved
- CSS custom properties for theming
- Responsive design with mobile breakpoint

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
Build the static export:
```bash
npm run build
```
Deploy the `.next` folder to any hosting platform.

## Notes

- Video path changed from `assets/vanlab-studio.mp4` to `/assets/vanlab-studio.mp4`
- Image paths changed from `assets/` to `/assets/`
- All font families now use CSS variables (`var(--font-inter)`, `var(--font-museo)`)
- Custom cursor, animations, and interactions work identically to original

## Original Files

The original files are preserved:
- `index.html` - Original HTML
- `script.js` - Original vanilla JavaScript  
- `style.css` - Original stylesheet
- `assets/` - Original assets folder

You can compare the original and Next.js versions side by side.
