import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn, ANIMATION_CONSTANTS, FIGHT_CLUB_STYLES } from '../../utils/tailwindUtils';

interface GlitchTitleProps {
  /**
   * The text to display as the glitched title
   */
  title: string;
  
  /**
   * Optional CSS class name to apply to the component
   */
  className?: string;
  
  /**
   * Custom colors for the glitch effects
   */
  glitchColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  
  /**
   * Number of spatter effects to generate
   */
  spatterCount?: number;
  
  /**
   * Enable debug mode to show borders for layout debugging
   */
  debugMode?: boolean;
  
  /**
   * Adjust vertical offset (in pixels) to fine-tune positioning
   */
  verticalOffset?: number;
  
  /**
   * Adjust the intensity of the glitch effects (1 = normal)
   */
  glitchIntensity?: number;
}

const GlitchTitle: React.FC<GlitchTitleProps> = ({
  title,
  className,
  glitchColors = {
    primary: '#ff0099',    // Pink (default primary)
    secondary: '#00ffff',  // Cyan (secondary accent)
    accent: '#ffff00'      // Yellow (rare accent)
  },
  spatterCount = 56,
  debugMode = false,
  verticalOffset = 40,
  glitchIntensity = 1.4
}) => {
  // Add possible characters for text glitching
  const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
  
  const letters = title.split('');

  // Animation timing constants
  const staggerDelay = ANIMATION_CONSTANTS.staggerDelay; // Time between each letter appearing
  const initialDelay = ANIMATION_CONSTANTS.initialDelay;  // Delay before first letter appears
  
  // Define CSS variables for title positioning
  const titleStyles = {
    '--title-padding-top': '0px',
    '--title-container-height': '220px',
    '--title-vertical-offset': '10px',  // Adjust this value to fine-tune vertical position
    // Debug borders when needed
    '--debug-borders': debugMode ? '1px solid rgba(255, 0, 153, 0.3)' : 'none',
  } as React.CSSProperties;

  // Helper function to apply debug borders when needed
  const getDebugStyle = () => ({
    // Use CSS variable for consistent debugging
    border: 'var(--debug-borders, none)'
  });

  // Calculate spatter positions based on letter rendering
  const createSynchronizedSpatters = () => {
    const letterCount = title.length;
    const baseSpatterCount = spatterCount; // Base number of spatters
    const spatters = [];
    
    // Create spatters synchronized with letter appearance
    for (let i = 0; i < baseSpatterCount; i++) {
      // Calculate which letter this spatter corresponds to (for timing)
      const letterIndex = Math.floor((i / baseSpatterCount) * letterCount);
      
      // Calculate delay based on letter appearance time
      const letterDelay = initialDelay + (letterIndex * staggerDelay);
      // Add slight random variance
      const randomVariance = (Math.random() * 0.25); // Increased variance for more organic appearance
      const spatterDelay = letterDelay + randomVariance;
      
      // Create varying sizes with more extreme variants
      let sizeMultiplier;
      const sizeRoll = Math.random();
      if (sizeRoll > 0.92) {
        // Super large spatters (8% chance)
        sizeMultiplier = 3.5 + Math.random() * 3.0; 
      } else if (sizeRoll > 0.75) {
        // Large spatters (17% chance)
        sizeMultiplier = 2.2 + Math.random() * 2.5;
      } else if (sizeRoll < 0.1) {
        // Tiny spatters (10% chance)
        sizeMultiplier = 0.3 + Math.random() * 0.4;
      } else {
        // Regular small-medium spatters (65% chance)
        sizeMultiplier = 0.5 + Math.random() * 1.8;
      }
      
      // Distribute spatters with wider coverage and clustering
      let horizontalPosition;
      if (Math.random() > 0.85) {
        // Some spatters can appear at extreme edges (15% chance)
        horizontalPosition = Math.random() > 0.5 ? Math.random() * 8 : 92 + Math.random() * 8;
      } else {
        // Normal distribution with improved spread
        horizontalPosition = 5 + ((letterIndex / letterCount) * 90) + (Math.random() * 25 - 12.5);
      }
      
      // Allow more spatters to appear outside the normal vertical range
      const verticalRoll = Math.random();
      let verticalPosition;
      if (verticalRoll > 0.9) {
        // Far outside bounds (10% chance)
        verticalPosition = Math.random() > 0.5 ? -20 + Math.random() * 20 : 100 + Math.random() * 40;
      } else if (verticalRoll > 0.8) {
        // Slightly outside bounds (10% chance)
        verticalPosition = Math.random() > 0.5 ? -5 + Math.random() * 10 : 95 + Math.random() * 20;
      } else {
        // Normal vertical position (80% chance)
        verticalPosition = 5 + Math.random() * 90;
      }
      
      spatters.push({
        top: `${verticalPosition}%`,
        left: `${horizontalPosition}%`,
        size: sizeMultiplier,
        delay: spatterDelay,
        // Add occasional color variations for visual interest
        color: Math.random() > 0.92 ? glitchColors.secondary : Math.random() > 0.95 ? glitchColors.accent : glitchColors.primary
      });
    }
    
    return spatters;
  };
  
  // Generate synchronized spatter positions
  const spatterPositions = createSynchronizedSpatters();

  // Framer Motion variants for the container
  const titleContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
        when: "beforeChildren",
      },
    }
  };

  // Get a random character for text glitching
  const getRandomChar = () => {
    return possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  };

  // Create a custom component for the glitching letters
  const GlitchLetter = ({ letter, index }: { letter: string; index: number }) => {
    const isSpace = letter === ' ';
    
    // For character replacement glitching
    const [displayedChar, setDisplayedChar] = useState(letter);
    const [isGlitched, setIsGlitched] = useState(false);
    const [glitchType, setGlitchType] = useState<string>('none');
    const [hasGlitched, setHasGlitched] = useState(false);
    
    // Store the original letter to ensure we can always restore it
    const originalLetter = useRef(letter);
    
    // Track animation completion to ensure final state is correct
    const animationComplete = useRef(false);
    
    // Setup random offsets for each letter
    const xOffset = useRef((Math.random() - 0.5) * 6); // Increased range
    const yOffset = useRef((Math.random() - 0.5) * 4); // Increased range
    const scaleOffset = useRef(0.9 + Math.random() * 0.2); // More extreme scale possibilities
    const rotateOffset = useRef((Math.random() - 0.5) * 10); // More rotation
    
    // Choose if this letter will have various effects
    const hasColorShift = useRef(Math.random() > 0.3);
    const hasCharReplacement = useRef(Math.random() > 0.2);
    
    // Custom animation variants for this specific letter
    const letterVariants = {
      hidden: { 
        opacity: 0,
        scale: 1.2, // Smaller scale to prevent over-expansion
        y: Math.random() > 0.5 ? 8 : -8, // Slightly reduced motion
        rotate: (Math.random() - 0.5) * 7, // Slightly reduced rotation
      },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        rotate: 0,
        transition: {
          duration: staggerDelay * 1.8, // Slightly faster to prevent lingering animations
          ease: [0.2, 0.1, 0.25, 1.0], // Smoother easing
          onComplete: () => {
            // Mark animation as complete to trigger restoration
            animationComplete.current = true;
            // Force restore correct letter once animation completes
            setDisplayedChar(originalLetter.current);
            setIsGlitched(false);
            setGlitchType('none');
          }
        },
      }
    };
    
    // Randomly select a glitch effect type - prioritize effects that don't affect the container
    const getRandomGlitchType = () => {
      const glitchTypes = [
        'char-replace', 
        'color-shift',
        'scale-shift',
        'opacity-flash',
        'position-shift', 
        'color-invert',
        'blur-shift'
      ];
      // Increase chance of color-shift and color-invert for more color effects
      if (Math.random() > 0.6) {
        return Math.random() > 0.5 ? 'color-shift' : 'color-invert';
      }
      return glitchTypes[Math.floor(Math.random() * glitchTypes.length)];
    };
    
    // Effect to handle initial glitch during entrance animation
    useEffect(() => {
      if (isSpace) return; // Skip if space
      
      // Calculate when this letter will start appearing based on stagger timing
      const letterRevealStart = initialDelay + (index * staggerDelay) * 1000; // in ms
      
      // Add a slight random variance to make glitching feel more organic
      const randomVariance = (Math.random() * 0.1) * 1000; // Up to 100ms random variance
      const glitchDelay = letterRevealStart + (staggerDelay * ANIMATION_CONSTANTS.glitchTiming * 1000) + randomVariance;
      
      // We'll do multiple glitches during the entrance animation for more drama
      const numGlitches = 1 + Math.floor(Math.random() * 2); // 1-2 random glitches
      
      // Setup the glitch to happen at precisely the right moment during this letter's reveal
      const glitchTimer = setTimeout(() => {
        let currentGlitch = 0;
        
        const performGlitch = () => {
          // Apply glitch during reveal animation
          setIsGlitched(true);
          
          // Select a random glitch type for this specific glitch moment
          const randomType = getRandomGlitchType();
          setGlitchType(randomType);
          
          // Apply character replacement if that's the selected effect or if we have char replacement
          if (randomType === 'char-replace' || hasCharReplacement.current) {
            setDisplayedChar(getRandomChar());
          }
          
          // Turn off glitch after a short time (but still during the letter's reveal)
          const turnOffGlitch = setTimeout(() => {
            setIsGlitched(false);
            setGlitchType('none');
            setDisplayedChar(originalLetter.current); // Always restore original letter
            setHasGlitched(true); // Mark as glitched so we know animation is complete
            
            currentGlitch++;
            
            // If we have more glitches to perform, schedule the next one
            if (currentGlitch < numGlitches) {
              setTimeout(performGlitch, 100 + Math.random() * 150);
            }
          }, 80 + Math.random() * 120); // Short glitch duration (80-200ms)
          
          return () => clearTimeout(turnOffGlitch);
        };
        
        // Perform the first glitch
        performGlitch();
      }, glitchDelay);
      
      // Add a final restore to ensure letter is displayed properly
      const finalRestoreTimer = setTimeout(() => {
        setDisplayedChar(originalLetter.current);
        setIsGlitched(false);
        setGlitchType('none');
      }, letterRevealStart + 1000); // Add a final restore 1 second after letter begins appearing
      
      // Safety restore - absolutely ensure the letter is visible no matter what
      const safetyRestoreTimer = setTimeout(() => {
        if (!animationComplete.current) {
          setDisplayedChar(originalLetter.current);
          setIsGlitched(false);
          setGlitchType('none');
        }
      }, letterRevealStart + 3000); // Failsafe 3 seconds after letter begins appearing
      
      return () => {
        clearTimeout(glitchTimer);
        clearTimeout(finalRestoreTimer);
        clearTimeout(safetyRestoreTimer);
      };
    }, [letter, index, isSpace]);
    
    // Extra safety effect - ensure original letter persists in final state
    useEffect(() => {
      // When component unmounts or anytime animation completes, force proper letter
      return () => {
        // Final cleanup to ensure proper letter
        setDisplayedChar(originalLetter.current);
        setIsGlitched(false);
      };
    }, []);
    
    // Calculate glitch styles based on current state and glitch type
    const getGlitchStyles = () => {
      if (!isGlitched) return { color: glitchColors.primary }; // Keep primary color when not glitching
      
      // Get intensity for this specific glitch moment
      const intensity = glitchIntensity * (0.8 + Math.random() * 0.4);
      
      // Base style properties
      let x = 0;
      let y = 0;
      let scale = 1;
      let rotate = 0;
      let skewX = 0;
      let skewY = 0;
      let opacity = 1;
      let filter = '';
      let textShadow = '';
      let color = glitchColors.primary; // Default primary color
      
      // Apply different transformations based on glitch type, avoiding animations that affect the container
      switch (glitchType) {
        case 'char-replace':
          // Just character replacement, no visual style changes needed
          textShadow = `0 0 ${5 + intensity * 2}px rgba(255,0,153,${0.6 + intensity * 0.2})`;
          break;
          
        case 'color-shift':
          // Shift color to a different hue
          if (Math.random() > 0.5) {
            color = glitchColors.secondary; // Secondary color
          } else {
            color = glitchColors.accent; // Accent color
          }
          filter = `hue-rotate(${(Math.random() * 360)}deg) saturate(${1.5 + Math.random()})`;
          break;
          
        case 'scale-shift':
          scale = 0.8 + Math.random() * 0.5; // 0.8-1.3x scale
          break;
          
        case 'opacity-flash':
          opacity = 0.3 + Math.random() * 0.4; // 0.3-0.7 opacity
          break;
          
        case 'position-shift':
          x = (Math.random() - 0.5) * 8;
          y = (Math.random() - 0.5) * 8;
          break;
          
        case 'color-invert':
          filter = `invert(${0.7 + Math.random() * 0.3})`;
          color = Math.random() > 0.5 ? glitchColors.secondary : glitchColors.accent; // Add color change with invert
          break;
          
        case 'blur-shift':
          filter = `blur(${1 + Math.random() * 2}px)`;
          break;
          
        default:
          // Default behavior - small position jitter only on the letter
          x = xOffset.current * intensity;
          y = yOffset.current * intensity;
      }
      
      // Common effects that can be applied to any glitch type
      if (hasColorShift.current && !filter) {
        filter = `brightness(${1.2 + intensity * 0.15}) contrast(${1.1 + intensity * 0.1}) hue-rotate(${5 + intensity * 3}deg)`;
      }
      
      if (!textShadow) {
        textShadow = `0 0 ${4 + intensity * 2}px rgba(255,0,153,${0.5 + intensity * 0.2}), 
                   ${1 + intensity * 0.3}px 0 ${1 + intensity * 0.3}px rgba(0,255,255,${0.2 + intensity * 0.1}), 
                   -${1 + intensity * 0.3}px 0 ${1 + intensity * 0.3}px rgba(255,255,0,${0.2 + intensity * 0.1})`;
      }
      
      const styles: React.CSSProperties = {
        transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg) skew(${skewX}deg, ${skewY}deg)`,
        opacity,
        filter,
        textShadow,
        color,
        zIndex: Math.random() > 0.5 ? 3 : 1,
        transition: 'transform 20ms ease-out, opacity 20ms ease-out, filter 20ms ease-out', // Very quick transitions
      };
      
      return styles;
    };
    
    return (
      <motion.span
        key={`letter-${index}`}
        variants={letterVariants}
        className="inline-block relative m-0 p-0"
        style={{
          ...getGlitchStyles()
        }}
      >
        {isSpace ? '\u00A0' : displayedChar}
      </motion.span>
    );
  };

  // Cleanup function for any lingering timeouts
  useEffect(() => {
    return () => {
      // Global cleanup
    };
  }, []);

  return (
    <div className={cn("my-16 relative flex flex-col items-center", className)} style={titleStyles}>
      {/* Fixed-height container with flexbox centering */}
      <div 
        className="relative flex justify-center items-center w-full overflow-visible h-[320px]"
        style={getDebugStyle()}
      >
        <div 
          className={FIGHT_CLUB_STYLES.titleContainer}
          style={{
            ...getDebugStyle(),
            marginTop: `${verticalOffset}px`, // Optical alignment adjustment for font
          }}
        >
          {/* Spray spatters container */}
          <div className={FIGHT_CLUB_STYLES.spatterContainer}>
            {/* Spray spatters */}
            {spatterPositions.map((spatter, i) => (
              <div 
                key={`spatter-${i}`}
                className="absolute rounded-full opacity-0"
                style={{
                  width: `${spatter.size * 3}px`, // Increase base size by 3x
                  height: `${spatter.size * 3}px`,
                  top: spatter.top,
                  left: spatter.left,
                  filter: spatter.size > 1.5 ? `blur(${spatter.size * 0.3}px)` : 'none', // More blur for larger splatters
                  animation: `spatterIn 0.2s ease-out forwards ${spatter.delay}s`,
                  transform: `rotate(${Math.random() * 360}deg) scale(${0.7 + Math.random() * 0.6})`, // Add rotation and scale variation
                  boxShadow: spatter.size > 2 ? 
                    `0 0 ${spatter.size}px ${spatter.color === glitchColors.primary ? `rgba(255,0,153,0.7)` : 
                      spatter.color === glitchColors.secondary ? `rgba(0,255,255,0.7)` : 
                      `rgba(255,255,0,0.7)`}`
                    : 'none',
                  backgroundColor: spatter.color
                }}
              />
            ))}
            
            {/* Enhanced mist effect with layered glow */}
            <div 
              className="absolute inset-0 bg-radial-pink blur-[15px] opacity-0" 
              style={{
                animation: `spatterIn 2s ease-out forwards 2s`,
                mixBlendMode: 'screen'
              }}
            />
            
            {/* Secondary color mist for added dimension */}
            <div 
              className="absolute inset-0 bg-radial-cyan blur-[20px] opacity-0" 
              style={{
                animation: `spatterIn 2.5s ease-out forwards 2.2s`,
                mixBlendMode: 'color-dodge',
                transform: 'scale(0.85) translateX(5%)',
                opacity: 0
              }}
            />
          </div>
          
          {/* The letters container - now using Framer Motion */}
          <h1 
            className={cn(FIGHT_CLUB_STYLES.heading, "shadow-pink-glow")}
            style={getDebugStyle()}
          >
            <div 
              className="flex items-center justify-center w-full h-full"
              style={getDebugStyle()}
            >
              <motion.div
                variants={titleContainerVariants}
                initial="hidden"
                animate="visible"
                className="inline-block relative z-[5] will-change-transform transform-gpu"
                style={{ transform: 'translateY(5px)' }}
              >
                {letters.map((letter, index) => (
                  <GlitchLetter 
                    key={`letter-${index}`} 
                    letter={letter} 
                    index={index}
                  />
                ))}
              </motion.div>
            </div>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default GlitchTitle; 