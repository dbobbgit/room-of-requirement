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
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'radial-pink':
          'radial-gradient(ellipse at center, rgba(255,0,153,0.05) 0%, rgba(255,0,153,0) 70%)',
        'radial-fade':
          'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
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
  ],
};
