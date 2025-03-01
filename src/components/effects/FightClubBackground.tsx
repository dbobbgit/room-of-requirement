import React, { ReactNode } from 'react';

interface FightClubBackgroundProps {
  children: ReactNode;
  intensity?: number; // Controls the intensity of effects (0-1)
  tintColor?: 'green' | 'blue' | 'red'; // Different color tint options
}

const FightClubBackground: React.FC<FightClubBackgroundProps> = ({ 
  children, 
  intensity = 1,
  tintColor = 'green'
}) => {
  // Calculate opacity based on intensity
  const baseOpacity = {
    texture: 0.35 * intensity,
    tint: 0.6 * intensity,
    scratches: 0.15 * intensity,
    vignette: 0.8 * intensity
  };

  // Different tint gradients based on the tintColor prop
  const tintGradients = {
    green: 'linear-gradient(135deg, rgba(9,32,20,0.4) 0%, rgba(20,20,20,0.2) 100%)',
    blue: 'linear-gradient(135deg, rgba(9,20,32,0.4) 0%, rgba(20,20,20,0.2) 100%)',
    red: 'linear-gradient(135deg, rgba(32,9,20,0.4) 0%, rgba(20,20,20,0.2) 100%)'
  };

  // CSS for background elements
  const styles = {
    container: {
      position: 'relative' as const,
      zIndex: 0
    },
    backgroundContainer: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#101010',
      zIndex: -10,
      overflow: 'hidden',
    },
    textureOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: baseOpacity.texture,
      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%\' height=\'100%\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
      zIndex: -8,
      mixBlendMode: 'multiply' as const,
    },
    greenTintOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: tintGradients[tintColor],
      zIndex: -9,
      opacity: baseOpacity.tint,
    },
    scratchesOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'500\' height=\'500\' viewBox=\'0 0 500 500\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M50,250 L450,250\' stroke=\'rgba(255,255,255,0.1)\' stroke-width=\'0.5\'/%3E%3Cpath d=\'M250,50 L250,450\' stroke=\'rgba(255,255,255,0.1)\' stroke-width=\'0.5\'/%3E%3Cpath d=\'M100,100 L400,400\' stroke=\'rgba(255,255,255,0.05)\' stroke-width=\'0.5\'/%3E%3Cpath d=\'M400,100 L100,400\' stroke=\'rgba(255,255,255,0.05)\' stroke-width=\'0.5\'/%3E%3C/svg%3E")',
      backgroundSize: 'cover',
      zIndex: -7,
      opacity: baseOpacity.scratches,
    },
    vignetteEffect: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.8) 100%)',
      zIndex: -6,
      pointerEvents: 'none' as const,
    },
    // Random damage spots for added texture
    damageSpots: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -5,
      pointerEvents: 'none' as const,
      opacity: baseOpacity.texture * 0.7,
    }
  };

  // Damages to be rendered as JSX for more complex styling
  const renderDamageSpots = () => {
    // Only show if intensity is high enough
    if (intensity < 0.4) return null;
    
    const spots = [];
    const spotCount = Math.floor(5 * intensity);
    
    for (let i = 0; i < spotCount; i++) {
      const size = Math.random() * 100 + 50;
      spots.push(
        <div 
          key={`damage-${i}`}
          style={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, transparent 70%)',
            transform: `rotate(${Math.random() * 360}deg)`,
            opacity: Math.random() * 0.3 + 0.2,
            filter: 'blur(8px)',
          }}
        />
      );
    }
    
    return spots;
  };

  return (
    <div style={styles.container}>
      {/* Background Effects - positioned behind all content */}
      <div style={styles.backgroundContainer}></div>
      <div style={styles.greenTintOverlay}></div>
      <div style={styles.textureOverlay}></div>
      <div style={styles.scratchesOverlay}></div>
      <div style={styles.vignetteEffect}></div>
      <div style={styles.damageSpots}>
        {renderDamageSpots()}
      </div>
      
      {/* Actual content */}
      {children}
    </div>
  );
};

export default FightClubBackground; 