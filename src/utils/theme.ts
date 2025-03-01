import { createTheme } from '@mui/material/styles';

// Color palette that blends cyberpunk, dark academia, and Hogwarts aesthetics
export const colors = {
  // Base colors
  background: {
    main: '#121212', // Dark base for cyberpunk
    paper: '#1E1E1E', // Dark paper background
    accent: '#2A2A3A', // Slightly purplish dark tint
  },
  // Text colors
  text: {
    primary: '#E9E9E9', // Light text for dark backgrounds
    secondary: '#A7A7A7', // Secondary text
    accent: '#D4AF37', // Gold accent (Hogwarts-inspired)
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
    divider: '#2C2C3A',
    highlight: '#7928CA50', // Semi-transparent purple
  },
};

// Create MUI theme
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.accent.primary,
    },
    secondary: {
      main: colors.accent.secondary,
    },
    background: {
      default: colors.background.main,
      paper: colors.background.paper,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
  },
  typography: {
    fontFamily: '"Cinzel", "Playfair Display", "Georgia", serif',
    h1: {
      fontFamily: '"Cinzel", serif',
    },
    h2: {
      fontFamily: '"Cinzel", serif',
    },
    h3: {
      fontFamily: '"Cinzel", serif',
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
    },
    h6: {
      fontFamily: '"Playfair Display", serif',
    },
    body1: {
      fontFamily: '"IBM Plex Sans", "Roboto", sans-serif',
    },
    body2: {
      fontFamily: '"IBM Plex Sans", "Roboto", sans-serif',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.paper,
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))',
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontFamily: '"Cinzel", serif',
          fontWeight: 500,
        },
        contained: {
          boxShadow: '0 4px 14px 0 rgba(121, 40, 202, 0.39)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${colors.ui.border}`,
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
        },
      },
    },
  },
});

export default theme;
