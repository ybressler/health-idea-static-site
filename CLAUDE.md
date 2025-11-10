# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
CareCompass is a healthcare concierge static website that helps people find the perfect doctor and book appointments. The service matches patients with ideal doctors based on their specific needs, verifies insurance coverage, and handles appointment booking.

## Technology Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Deployment**: GitHub Pages via GitHub Actions
- **Future**: May migrate to Astro 5.x (similar to Chickadee Labs project)

## Design Philosophy

**CONFIRMED DESIGN DIRECTION**: The current design is approved and should be maintained.

**Design Inspiration**: Modern wellness brands like Headway, Headspace, Capsule, and Tend

**Key Design Principles**:
- **Soft, calming aesthetics**: Creating a comforting healthcare experience
- **Generous whitespace**: Reducing cognitive load and providing breathing room
- **Rounded elements**: All corners use border-radius for a gentle, approachable feel
- **Modern typography**: Inter font family for clean, contemporary readability
- **Smooth transitions**: Subtle animations that enhance without distracting

**Approved Color Palette**:
```
Primary:   #4ECDC4  (Soft Teal) - Main brand color
Accent:    #FFB366  (Warm Coral) - CTAs and highlights
Secondary: #A78BFA  (Soft Purple) - Supporting elements

Backgrounds:
- White:   #FFFFFF
- Cream:   #FDFBF7
- Light:   #F7FAFC

Text:
- Dark:    #2D3748
- Medium:  #4A5568
- Light:   #718096
```

## Design Guidelines

When making design changes:
1. **Maintain the soft, calming aesthetic** - This is core to the healthcare concierge experience
2. **Use generous whitespace** - Don't overcrowd elements
3. **Keep rounded corners** - All interactive elements should feel approachable
4. **Preserve smooth animations** - Transitions should be subtle and purposeful
5. **Stay true to the color palette** - Don't introduce new colors without approval

## Project Structure
```
.
├── index.html          # Main HTML file with all sections
├── styles.css          # Complete styling with responsive breakpoints
├── script.js           # Interactive features and animations
├── .github/workflows/  # GitHub Actions deployment
└── README.md          # Project documentation
```

## Development Commands

Since this is vanilla HTML/CSS/JS:
```bash
# Local development - just open in browser
open index.html

# Or use a simple server
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## Responsive Breakpoints
- **Desktop**: 1024px and above (full layout)
- **Tablet**: 768px - 1023px (2-column grids)
- **Mobile**: Below 768px (single column, optimized navigation)
- **Small mobile**: Below 480px (further spacing adjustments)

## Content & Messaging

**Voice**: Warm, supportive, empowering
- Use plain English, avoid medical jargon
- Focus on patient empowerment and ease
- Emphasize the "concierge" white-glove service aspect

**Tone**: Professional yet approachable, caring but not patronizing

## GitHub Pages Configuration
- **Deployment**: Automatic via GitHub Actions on push to main branch
- **Site URL**: Configured in repository settings

## Key Features

### Current Sections
1. **Hero**: Clear value proposition with stats and dual CTAs
2. **How It Works**: 3-step process explanation
3. **Features**: 6 key benefits in card layout
4. **Testimonials**: Social proof with customer stories
5. **CTA**: Email capture with clear benefits
6. **Footer**: Links and legal information

### Interactive Elements
- Smooth scroll navigation
- Scroll-triggered animations
- Form validation
- Responsive navigation
- Hover effects on cards and buttons

## Future Roadmap
- Mobile hamburger menu enhancement
- Backend integration for email capture
- Doctor search functionality
- Real-time appointment booking
- Patient testimonial carousel
- Blog integration
- Insurance verification tool
- Potential migration to Astro framework

## Related Projects
See Chickadee Labs static site (`~/Documents/Code/dee-dee/Chickadee-Labs-static-site/`) for Astro-based implementation patterns if/when we migrate to a framework.
