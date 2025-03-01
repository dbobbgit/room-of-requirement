/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base colors
        background: {
          DEFAULT: '#121212', // Dark base for cyberpunk
          paper: '#1e1e1e', // Dark paper background
          accent: '#2a2a2a', // Slightly purplish dark tint
        },
        // Text colors
        text: {
          primary: '#ffffff', // Light text for dark backgrounds
          secondary: '#b3b3b3', // Secondary text
          disabled: '#757575',
        },
        // Accent colors with house inspirations
        accent: {
          primary: '#7928CA', // Magical purple (blends wizardry with cyberpunk)
          secondary: '#00A3FF', // Bright blue (cyberpunk neon / Ravenclaw-inspired)
          tertiary: '#50C878', // Emerald green (Slytherin-inspired)
          quaternary: '#FF5555', // Crimson (Gryffindor-inspired)
          gold: '#D4AF37', // Hogwarts gold
          bronze: '#CD7F32', // Ravenclaw bronze
        },
        // UI elements
        ui: {
          border: '#3A3A4A',
          divider: 'rgba(255, 255, 255, 0.12)',
          highlight: '#7928CA50', // Semi-transparent purple
        },
        'accent-primary': '#ff4081',
        'accent-secondary': '#64ffda',
        'accent-tertiary': '#ffab40',
        'accent-quaternary': '#448aff',
        'fight-club': {
          dark: '#101010',
          'green-dark': '#0e100e',
          pink: '#ff0099',
          'pink-dark': '#cc0077',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        plex: ['"IBM Plex Sans"', 'sans-serif'],
        bebasneue: ['"Bebas Neue"', 'sans-serif'],
        specialelite: ['"Special Elite"', 'cursive'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'spatter-in': 'spatterIn 0.3s ease-out forwards',
        'drip-in': 'dripIn 0.7s ease-out forwards',
        flicker: 'flicker 1.5s linear infinite',
        horizontalShift: 'horizontalShift 0.2s ease-in-out infinite',
        glitchFlipX: 'glitchFlipX 400ms ease-out forwards',
        glitchFlipY: 'glitchFlipY 400ms ease-out forwards',
        glitchSlideUp: 'glitchSlideUp 300ms ease-out forwards',
        glitchSlideDown: 'glitchSlideDown 300ms ease-out forwards',
        glitchJitter: 'glitchJitter 250ms steps(5) infinite',
        'subtle-flicker': 'subtleFlicker 8s ease-in-out infinite',
      },
      keyframes: {
        spatterIn: {
          '0%': { opacity: '0', transform: 'scale(0)' },
          '100%': { opacity: '0.8', transform: 'scale(1)' },
        },
        dripIn: {
          '0%': { height: '0' },
          '100%': { height: 'var(--final-height)' },
        },
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: 1 },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: 0.5 },
        },
        horizontalShift: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(2px)' },
        },
        glitchFlipX: {
          '0%': { transform: 'perspective(400px) rotateX(0deg)' },
          '30%': { transform: 'perspective(400px) rotateX(180deg) scale(1.2)' },
          '70%': { transform: 'perspective(400px) rotateX(-30deg) scale(0.8)' },
          '100%': { transform: 'perspective(400px) rotateX(0deg)' },
        },
        glitchFlipY: {
          '0%': { transform: 'perspective(400px) rotateY(0deg)' },
          '30%': { transform: 'perspective(400px) rotateY(180deg) scale(1.2)' },
          '70%': { transform: 'perspective(400px) rotateY(-40deg) scale(0.9)' },
          '100%': { transform: 'perspective(400px) rotateY(0deg)' },
        },
        glitchSlideUp: {
          '0%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-15px)' },
          '60%': { transform: 'translateY(-5px)' },
          '100%': { transform: 'translateY(0)' },
        },
        glitchSlideDown: {
          '0%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(15px)' },
          '60%': { transform: 'translateY(5px)' },
          '100%': { transform: 'translateY(0)' },
        },
        glitchJitter: {
          '0%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5px, 3px)' },
          '20%': { transform: 'translate(5px, -3px)' },
          '30%': { transform: 'translate(3px, 5px)' },
          '40%': { transform: 'translate(-3px, -5px)' },
          '50%': { transform: 'translate(5px, 2px)' },
          '60%': { transform: 'translate(-2px, -4px)' },
          '70%': { transform: 'translate(4px, 5px)' },
          '80%': { transform: 'translate(-5px, -2px)' },
          '90%': { transform: 'translate(3px, 4px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        subtleFlicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.92' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'radial-pink':
          'radial-gradient(ellipse at center, rgba(255,0,153,0.05) 0%, rgba(255,0,153,0) 70%)',
        'radial-fade':
          'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
        'fight-club-texture':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        'fight-club-scratches':
          "url(\"data:image/svg+xml,%3Csvg width='500' height='500' viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50,250 L450,250' stroke='rgba(255,255,255,0.1)' stroke-width='0.5'/%3E%3Cpath d='M250,50 L250,450' stroke='rgba(255,255,255,0.1)' stroke-width='0.5'/%3E%3Cpath d='M100,100 L400,400' stroke='rgba(255,255,255,0.05)' stroke-width='0.5'/%3E%3Cpath d='M400,100 L100,400' stroke='rgba(255,255,255,0.05)' stroke-width='0.5'/%3E%3C/svg%3E\")",
        'fight-club-gradient':
          'linear-gradient(135deg, rgba(9,32,20,0.4) 0%, rgba(20,20,20,0.2) 100%)',
        'fight-club-vignette':
          'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.8) 100%)',
      },
      boxShadow: {
        'pink-glow':
          '0 0 5px rgba(255, 0, 153, 0.7), 0 0 10px rgba(255, 0, 153, 0.5), 0 0 15px rgba(255, 0, 153, 0.3)',
      },
      transitionProperty: {
        'transform-filter': 'transform, filter',
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
      },
      // New extensions for advanced centering
      height: {
        'adaptive-container': 'clamp(200px, 30vh, 300px)',
        'title-container': 'clamp(180px, 25vh, 250px)',
      },
      spacing: {
        'dynamic-y': 'clamp(1rem, 5vh, 3rem)',
        'responsive-gap': 'clamp(0.5rem, 2vw, 2rem)',
      },
      fontSize: {
        'fluid-title': 'clamp(3rem, 10vw, 9rem)',
        'adaptive-heading': 'clamp(2.5rem, 8vw, 7rem)',
      },
      lineHeight: {
        'title-centered': '0.9',
      },
    },
    // CSS variables for fine-tuning positioning
    variables: {
      '--baseline-offset': {
        default: '-0.05em',
        heading: '-0.1em',
      },
      '--rotation-compensation': {
        sm: '1px',
        md: '2px',
        lg: '3px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    // Add a plugin for advanced vertical centering
    function ({ addUtilities }) {
      const newUtilities = {
        '.perfect-center': {
          display: 'grid',
          'place-items': 'center',
        },
        '.vertical-center-with-baseline': {
          position: 'relative',
          top: 'calc(50% + var(--baseline-offset, -0.05em))',
          transform: 'translateY(-50%)',
        },
        '.text-center-with-rotation': {
          transform:
            'translateY(calc(var(--rotation-compensation, 2px))) rotate(-1deg)',
        },
        '.content-box-with-overflow': {
          'box-sizing': 'content-box',
          overflow: 'visible',
        },
        '.center-title-container': {
          position: 'relative',
          display: 'flex',
          'justify-content': 'center',
          'align-items': 'center',
          'min-height': 'clamp(200px, 30vh, 300px)',
          width: '100%',
        },
        // Advanced perfect vertical centering for text
        '.perfect-text-center': {
          display: 'flex',
          'flex-direction': 'column',
          'justify-content': 'center',
          position: 'relative',
          top: 'calc(var(--baseline-compensation, 0px))',
          transform: 'translateY(calc(var(--baseline-offset, 0em) * 1em))',
          'line-height': 'calc(0.9 * var(--line-height-compensation, 1))',
        },
      };
      addUtilities(newUtilities);
    },
    function ({ addComponents, theme }) {
      addComponents({
        '.fight-club-bg': {
          position: 'relative',
          '&::before, &::after': {
            content: '""',
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          },
          '&::before': {
            background: theme('backgroundImage.fight-club-gradient'),
            zIndex: '-10',
          },
          '&::after': {
            backgroundImage: theme('backgroundImage.fight-club-vignette'),
            zIndex: '-6',
          },
        },
        '.fight-club-noise': {
          '&::before': {
            content: '""',
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundImage: theme('backgroundImage.fight-club-texture'),
            opacity: '0.35',
            mixBlendMode: 'multiply',
            zIndex: '-8',
            pointerEvents: 'none',
          },
        },
        '.fight-club-scratches': {
          '&::before': {
            content: '""',
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundImage: theme('backgroundImage.fight-club-scratches'),
            backgroundSize: 'cover',
            opacity: '0.15',
            zIndex: '-7',
            pointerEvents: 'none',
          },
        },
      });
    },
  ],
};
