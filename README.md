# 🌍 Interactive 3D Globe CV

An immersive, interactive CV experience built with React, Three.js, and TypeScript. Navigate through your professional journey on a 3D globe with smooth animations and stunning visual effects.

![Globe CV Preview](./preview.gif)

## ✨ Features

- **Interactive 3D Globe** - Navigate a realistic Earth with atmosphere effects
- **Journey Visualization** - Your career milestones as markers on the globe
- **Flight Paths** - Animated arcs connecting your journey points
- **Smooth Animations** - GSAP-powered camera transitions
- **Responsive Design** - Works on desktop and mobile
- **Customizable** - Easy to add your own milestones and styling

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── three/           # 3D components (Globe, Markers, Camera)
│   │   ├── Globe.tsx
│   │   ├── Marker.tsx
│   │   ├── CameraController.tsx
│   │   ├── FlightPath.tsx
│   │   └── Scene.tsx
│   ├── ui/              # UI overlays
│   │   ├── MilestoneCard.tsx
│   │   ├── Navigation.tsx
│   │   └── LoadingScreen.tsx
│   └── GlobeCanvas.tsx  # Main canvas wrapper
├── hooks/               # Custom React hooks
│   ├── useJourneyNavigation.ts
│   └── useSmoothScroll.ts
├── utils/               # Utility functions
│   └── coordinates.ts   # Lat/Lng to 3D conversion
├── data/
│   └── journey.ts       # ⭐ YOUR JOURNEY DATA
├── types/               # TypeScript definitions
├── constants/           # Configuration
└── styles/              # Global styles
```

## 🎨 Customization

### Add Your Journey

Edit `src/data/journey.ts` to add your milestones:

```typescript
export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: 'my-job',
    title: 'Senior Developer',
    location: 'Paris, France',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    startDate: '2022',
    endDate: null,
    description: 'Building amazing products...',
    type: 'work',
    technologies: ['React', 'TypeScript', 'Node.js'],
  },
  // Add more milestones...
];
```

### Milestone Types

- `origin` - Your hometown/birthplace (green)
- `education` - Schools and certifications (blue)
- `work` - Professional experience (purple)
- `project` - Notable side projects (orange)
- `current` - Your current position (red)

### Colors & Theming

Edit `src/constants/config.ts` to customize colors:

```typescript
export const COLORS = {
  PRIMARY: '#6366f1',      // Accent color
  ATMOSPHERE: '#3b82f6',   // Globe glow
  MARKERS: {
    origin: '#22c55e',
    education: '#3b82f6',
    // ...
  },
};
```

## 🛠 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Three.js** - 3D rendering
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers
- **GSAP** - Animations
- **Lenis** - Smooth scrolling
- **Vite** - Build tool

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

WebGL 2.0 required for best experience.

## 🎯 Performance Tips

1. Use Chrome for best WebGL performance
2. Close other GPU-intensive tabs
3. On mobile, the scene automatically reduces quality
4. Lower `WIDTH_SEGMENTS` in config for older devices

## 📝 License

MIT License - Feel free to use this for your own CV!

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

---

Made with ❤️ and Three.js
