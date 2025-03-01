import React, { ReactNode, useMemo } from 'react';

interface FightClubCardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  ruleNumber?: number; // Optional rule number
  isHighlighted?: boolean; // If this card should have extra highlighting
  offset?: number; // Horizontal offset for staggered layout
}

/**
 * A component that creates a Fight Club styled rule card
 * Matches the exact style from the Fight Club rules poster
 */
const FightClubCard: React.FC<FightClubCardProps> = ({ 
  children, 
  title,
  className = '',
  ruleNumber,
  isHighlighted = false,
  offset = 0
}) => {
  // Random value for slight rotation to make it look more natural
  const slightRotation = (Math.random() * 2 - 1) * 0.3; // -0.3 to 0.3 degrees
  
  // Create unique and random polygons for each card to simulate hand-drawn marker strokes
  // This creates the "torn tape" look from the Fight Club poster
  const getRandomClipPath = () => {
    // More extreme variations to match the Fight Club poster
    const topLeftX = Math.random() * 2;  // 0-2%
    const topLeftY = Math.random() * 5 + 2;  // 2-7%
    
    const topRightX = 98 + Math.random() * 2;  // 98-100%
    const topRightY = Math.random() * 4;  // 0-4%
    
    // Add a "torn" look to one side of the bar
    const rightMidX = 100;
    const rightMidY = 30 + Math.random() * 20;  // 30-50%
    
    const rightTornX1 = 102 + Math.random() * 3; // Extended beyond edge
    const rightTornY1 = 50 + Math.random() * 15;  // 50-65%
    
    const rightTornX2 = 100;
    const rightTornY2 = 65 + Math.random() * 15;  // 65-80%
    
    const bottomRightX = 97 + Math.random() * 3;  // 97-100%
    const bottomRightY = 100;
    
    const bottomLeftX = Math.random() * 3;  // 0-3%
    const bottomLeftY = 95 + Math.random() * 5;  // 95-100%
    
    // Bottom left torn corner to match poster
    const leftTornX1 = -2 - Math.random() * 3; // Extended beyond edge
    const leftTornY1 = 80 + Math.random() * 10;  // 80-90%
    
    const leftTornX2 = 0;
    const leftTornY2 = 70 + Math.random() * 10;  // 70-80%

    // Build the polygon points
    return `polygon(
      ${topLeftX}% ${topLeftY}%, 
      ${topRightX}% ${topRightY}%, 
      ${rightMidX}% ${rightMidY}%,
      ${rightTornX1}% ${rightTornY1}%,
      ${rightTornX2}% ${rightTornY2}%,
      ${bottomRightX}% ${bottomRightY}%, 
      ${bottomLeftX}% ${bottomLeftY}%, 
      ${leftTornX1}% ${leftTornY1}%,
      ${leftTornX2}% ${leftTornY2}%
    )`;
  };

  // Generate a unique clip path for this specific card
  const clipPath = useMemo(() => getRandomClipPath(), []);

  // Calculate horizontal offset for staggered layout
  const horizontalOffset = offset || (Math.random() * 40); // 0-40px random if not specified
  
  // Number rotation for that handmade feel - reduced to minimize visual impact
  const numberRotation = useMemo(() => (Math.random() * 2 - 1) * 0.5, []); // -0.5 to 0.5 degrees
  
  // Use absolute pixel height instead of rem to guarantee exact matching
  const uniformHeight = 60; // in pixels
  
  return (
    <div 
      className={`p-0 relative my-6 flex items-center ${className}`}
      style={{
        transform: `rotate(${slightRotation}deg)`,
        maxWidth: '100%',
        marginLeft: `${horizontalOffset}px`
      }}
    >
      {/* Rule number aligned to bottom of pink bar */}
      {ruleNumber && (
        <div 
          className="flex mr-3"
          style={{ 
            width: '45px',
            height: `${uniformHeight}px`,
            display: 'flex',
            alignItems: 'flex-end', // Align to bottom
            justifyContent: 'center',
            paddingBottom: '0',
          }}
        >
          {/* Number with identical height to pink bar */}
          <div
            style={{
              fontFamily: 'Special Elite, cursive',
              fontSize: `${uniformHeight}px`, // Full 100% height
              fontWeight: 900, // Maximum boldness
              color: '#ff0099', // Same pink as the bar
              textShadow: '0px 0px 2px rgba(255,0,153,0.5)',
              transform: `rotate(${numberRotation}deg)`,
              lineHeight: '0.8', // Even lower line height to compensate for full size
              marginBottom: '-10px', // More negative margin to pull down the larger font
              display: 'block',
              padding: '0'
            }}
          >
            {ruleNumber}
          </div>
        </div>
      )}
      
      {/* Main pink background bar with rough marker-style edges */}
      <div 
        className="relative text-black font-specialelite font-bold"
        style={{
          backgroundColor: '#ff0099', // Bright pink like in the reference
          boxShadow: '0 3px 6px rgba(0,0,0,0.5)',
          clipPath: clipPath,
          background: 'linear-gradient(to right, #ff0099 80%, #e60087 100%)',
          filter: 'saturate(110%) brightness(105%)',
          whiteSpace: 'nowrap',  // Prevent text from wrapping
          height: `${uniformHeight}px`,
          display: 'inline-flex',
          alignItems: 'center'
        }}
      >
        {/* Main content - the rule text in uppercase with exact 5px padding */}
        <div 
          className="text-lg uppercase"
          style={{ 
            fontFamily: 'Special Elite, cursive',
            letterSpacing: '0.07em',
            lineHeight: '1.2',
            fontWeight: 'bold',
            overflow: 'hidden',
            color: '#000000',
            paddingLeft: '5px',
            paddingRight: '5px'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default FightClubCard; 