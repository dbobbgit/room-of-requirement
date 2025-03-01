import React, { ReactNode, useMemo } from 'react';

interface FightClubThemeProps {
  children?: ReactNode;
  intensity?: number; // 0-1 scale for effect intensity
  variant?: 'default' | 'dark' | 'green';
}

/**
 * A component that applies the Fight Club theme to its children
 * Based on the iconic dark green basement aesthetic from the movie
 */
const FightClubTheme: React.FC<FightClubThemeProps> = ({
  children,
  intensity = 1,
  variant = 'default',
}) => {
  // Calculate number of damage spots based on intensity
  const damageSpotCount = useMemo(() => Math.floor(8 * intensity), [intensity]);
  
  // Generate random damage spots - darker blotches on the background
  const damageSpots = useMemo(() => {
    if (intensity < 0.2) return null;
    
    return Array.from({ length: damageSpotCount }).map((_, i) => {
      const size = Math.random() * 200 + 150; // Larger spots
      return (
        <div 
          key={`damage-${i}`}
          className="absolute pointer-events-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,0,0,0.5) 0%, transparent 70%)',
            transform: `rotate(${Math.random() * 360}deg)`,
            opacity: Math.random() * 0.5 + 0.3, // More visible
            filter: 'blur(25px)', // More blurred for that soft basement look
            zIndex: 1,
          }}
          aria-hidden="true"
        />
      );
    });
  }, [damageSpotCount, intensity]);
  
  // Add brighter green spots that mimic the Fight Club poster reference
  const greenSpots = useMemo(() => {
    if (intensity < 0.4) return null;
    
    return Array.from({ length: 5 }).map((_, i) => {
      const size = Math.random() * 300 + 200;
      const opacity = Math.random() * 0.3 + 0.2;
      
      return (
        <div
          key={`green-spot-${i}`}
          className="absolute pointer-events-none"
          style={{
            top: `${Math.random() * 60 + 20}%`,
            left: `${Math.random() * 60 + 20}%`,
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(20,70,40,0.35) 0%, transparent 75%)',
            opacity,
            filter: 'blur(30px)',
            mixBlendMode: 'overlay',
            zIndex: 1,
            transform: `rotate(${Math.random() * 360}deg) scale(${0.8 + Math.random() * 0.4})`,
          }}
          aria-hidden="true"
        />
      );
    });
  }, [intensity]);

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden">
      {/* Base background for Fight Club aesthetic - deep green-black like the basement wall */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ 
          backgroundColor: '#050a07', // Very dark green-black to match the Fight Club poster
          zIndex: -1 
        }}
        aria-hidden="true"
      />
      
      {/* Fight Club styling layers */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true">
        {/* Dark green gradient overlay - creates that basement wall color from Fight Club */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'radial-gradient(circle at center, #081510 0%, #050a07 80%)',
            opacity: 0.9,
            zIndex: 0 
          }}
        ></div>
        
        {/* Texture layer for concrete/wall texture */}
        <div 
          className="absolute inset-0 bg-fight-club-texture" 
          style={{ 
            opacity: 0.15, 
            mixBlendMode: 'overlay',
            zIndex: 1 
          }}
        ></div>
        
        {/* Green gradient spots that appear in the Fight Club poster reference */}
        {greenSpots}
        
        {/* Random damage/darker spots */}
        {damageSpots}
        
        {/* Strong vignette effect like in the Fight Club poster */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.9) 100%)',
            zIndex: 2
          }}
        ></div>
        
        {/* Film grain effect for that movie poster look */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            opacity: 0.08,
            mixBlendMode: 'overlay',
            zIndex: 3
          }}
        ></div>
        
        {/* Subtle scratches effect for the film damage look */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.05) 50%), linear-gradient(0deg, transparent 95%, rgba(255,255,255,0.03) 95%)',
            backgroundSize: '300px 100%, 100% 80px',
            opacity: 0.1,
            zIndex: 3
          }}
        ></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

export default FightClubTheme; 