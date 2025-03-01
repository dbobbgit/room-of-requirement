/**
 * Utility functions and constants for working with Tailwind CSS
 */

import { twMerge } from 'tailwind-merge';
import clsx, { ClassValue } from 'clsx';

/**
 * Combines multiple class names and resolves Tailwind CSS conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Animation constants used for the title animation
export const ANIMATION_CONSTANTS = {
  staggerDelay: 0.1, // Time between each letter appearing (slightly faster)
  initialDelay: 0.2, // Faster start for more responsiveness
  glitchTiming: 0.4, // When during the letter reveal to trigger the glitch (40% through)
  glitchDuration: 0.15, // Shorter glitch duration for snappier effect
  glitchIntensity: 1.4, // Moderate intensity to avoid container disruption
};

// Define mapping for category colors to tailwind classes
export const categoryColors = {
  'accent-primary': {
    bg: 'bg-accent-primary',
    bgHover: 'hover:bg-accent-primary/80',
    bgLight: 'bg-accent-primary/15',
    text: 'text-accent-primary',
    border: 'border-l-4 border-accent-primary',
  },
  'accent-secondary': {
    bg: 'bg-accent-secondary',
    bgHover: 'hover:bg-accent-secondary/80',
    bgLight: 'bg-accent-secondary/15',
    text: 'text-accent-secondary',
    border: 'border-l-4 border-accent-secondary',
  },
  'accent-tertiary': {
    bg: 'bg-accent-tertiary',
    bgHover: 'hover:bg-accent-tertiary/80',
    bgLight: 'bg-accent-tertiary/15',
    text: 'text-accent-tertiary',
    border: 'border-l-4 border-accent-tertiary',
  },
  'accent-quaternary': {
    bg: 'bg-accent-quaternary',
    bgHover: 'hover:bg-accent-quaternary/80',
    bgLight: 'bg-accent-quaternary/15',
    text: 'text-accent-quaternary',
    border: 'border-l-4 border-accent-quaternary',
  },
};

// Function to get tailwind classes for a category color
export function getCategoryColorClasses(colorKey: string) {
  return (
    categoryColors[colorKey as keyof typeof categoryColors] ||
    categoryColors['accent-primary']
  );
}

// Reusable tailwind classes for common UI patterns
export const TAILWIND_CLASSES = {
  // Layout
  mainContainer:
    'min-h-screen flex flex-col bg-background-main text-text-primary',
  contentContainer: 'container mx-auto px-4 md:px-6 py-8',

  // Typography
  headingPrimary:
    'font-cinzel text-text-primary text-4xl md:text-5xl font-bold',
  headingSecondary: 'font-playfair text-text-primary text-2xl md:text-3xl',
  bodyText: 'font-ibmplex text-text-secondary',

  // Components
  card: 'bg-background-paper border border-ui-border rounded-lg shadow-lg p-6 transition-transform hover:translate-y-[-4px]',
  button: {
    base: 'px-4 py-2 rounded font-cinzel transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50',
    primary:
      'bg-accent-primary hover:bg-accent-primary/90 text-text-primary focus:ring-accent-primary',
    secondary:
      'bg-accent-secondary hover:bg-accent-secondary/90 text-text-primary focus:ring-accent-secondary',
    tertiary:
      'bg-accent-tertiary hover:bg-accent-tertiary/90 text-text-primary focus:ring-accent-tertiary',
    quaternary:
      'bg-accent-quaternary hover:bg-accent-quaternary/90 text-text-primary focus:ring-accent-quaternary',
  },

  // Navigation
  navLink:
    'font-cinzel text-text-secondary hover:text-text-primary transition-colors duration-200',
  activeNavLink: 'font-cinzel text-accent-primary font-medium',

  // Utilities
  flexCenter: 'flex items-center justify-center',
  flexBetween: 'flex items-center justify-between',

  // Animations
  spatterAnimation: 'animate-spatter-in',
  dripAnimation: 'animate-drip-in',
  flickerAnimation: 'animate-flicker',
  shiftAnimation: 'animate-horizontal-shift',
};

// Fight Club styled components
export const FIGHT_CLUB_STYLES = {
  titleContainer:
    'relative content-box-with-overflow mx-auto max-w-[90%] md:max-w-[85%] transform -rotate-1',
  spatterContainer:
    'absolute -top-20 -left-20 -right-20 -bottom-20 z-10 pointer-events-none overflow-visible',
  heading:
    'font-bebasneue tracking-[0px] font-bold m-0 relative uppercase text-[#ff0099] text-6xl sm:text-7xl md:text-8xl lg:text-9xl filter contrast-[1.2] brightness-[1.05] block w-full z-[2] px-5 leading-[0.9] text-center',
  subheading:
    'font-playfair mb-4 mt-12 text-text-secondary max-w-[800px] mx-auto leading-normal px-2',
  // Helper function to calculate vertical position with CSS custom property
  getVerticalPosition: (baselineOffset = '-0.1em') => {
    return {
      transform: `translateY(calc(${baselineOffset} + var(--baseline-compensation, 0px)))`,
    };
  },
};

// Button styles for reuse
export const BUTTON_STYLES = {
  primary:
    'px-4 py-2 bg-accent-primary hover:bg-accent-primary/90 text-white rounded shadow-sm transition-colors duration-200',
  secondary:
    'px-4 py-2 bg-background-paper hover:bg-background-accent text-text-primary border border-ui-divider rounded shadow-sm transition-colors duration-200',
  outline:
    'px-4 py-2 bg-transparent hover:bg-background-accent/20 text-text-primary border border-ui-divider rounded shadow-sm transition-colors duration-200',
};

// Form element styles
export const FORM_STYLES = {
  input:
    'w-full px-3 py-2 bg-background-paper border border-ui-divider rounded focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary outline-none transition-all duration-200',
  label: 'block text-sm font-medium text-text-secondary mb-1',
  formGroup: 'mb-4',
};

// Card styles for consistent card design
export const CARD_STYLES = {
  container:
    'bg-gradient-to-br from-background-paper to-background-accent rounded-lg shadow-md overflow-hidden',
  header: 'px-4 py-3 border-b border-ui-divider bg-background-accent/50',
  body: 'p-4',
  footer: 'px-4 py-3 border-t border-ui-divider bg-background-accent/50',
};

export default TAILWIND_CLASSES;
