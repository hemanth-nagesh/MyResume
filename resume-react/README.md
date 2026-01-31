# Hemanth's Resume - React + TypeScript

A modern, responsive resume website built with React, TypeScript, and Vite.

## Features

✨ **Modern Tech Stack**
- React 18 with TypeScript
- Vite for fast development
- Pure CSS (no heavy CSS frameworks)

📱 **Fully Responsive**
- Mobile-first design
- Optimized for all screen sizes
- Smooth animations and transitions

🎨 **Beautiful UI**
- Clean, professional design
- Smooth scroll navigation
- Interactive elements
- Typing animation in hero section
- Animated skill bars
- Project cards with hover effects

## Sections

1. **Hero** - Introduction with animated typing effect
2. **About** - Personal information and bio
3. **Skills** - Technical skills with animated progress bars
4. **Projects** - Showcase of 6 AI/ML projects
5. **Resume** - Education and experience timeline
6. **Contact** - Contact form and information

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd resume-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
```

The optimized files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
resume-react/
├── src/
│   ├── components/       # React components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Resume.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── styles/          # CSS styles
│   │   └── index.css
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── vite-env.d.ts    # TypeScript declarations
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── vite.config.ts       # Vite config
└── README.md            # This file
```

## Customization

### Update Personal Information

Edit the data in the component files:

- **About**: `src/components/About.tsx` - Personal info and bio
- **Skills**: `src/components/Skills.tsx` - Skill names and percentages
- **Projects**: `src/components/Projects.tsx` - Project details
- **Resume**: `src/components/Resume.tsx` - Education and experience
- **Contact**: `src/components/Contact.tsx` - Contact information

### Change Colors

Edit the CSS variables in `src/styles/index.css`:

```css
:root {
  --accent-color: #0563bb;     /* Primary accent color */
  --heading-color: #45505b;    /* Heading text color */
  --default-color: #272829;    /* Default text color */
}
```

### Add Profile Image

Place your image at:
```
public/assets/profile-img.jpg
```

### Add Resume PDF

Place your resume PDF at:
```
public/assets/E_Hemanth_Nagesh_2023.pdf
```

## Performance

- ⚡️ Fast loading with Vite
- 🎯 Lazy loading for project images
- 📦 Optimized production builds
- 🚀 Minimal bundle size

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal use.

## Credits

Built with ❤️ using React, TypeScript, and Vite.
