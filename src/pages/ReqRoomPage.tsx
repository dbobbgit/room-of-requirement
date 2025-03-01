import React, { useEffect, useState } from 'react';
import { MainLayout } from '../components/layout';
import { GlitchTitle } from '../components/effects';
import { motion } from 'framer-motion';
import { FightClubCard } from '../components/cards';
import { FightClubTheme } from '../components/theme';

// The rules of the Room of Requirement - transformed to match the Fight Club aesthetic
const roomRules = [
  "YOU DO NOT TALK ABOUT THE ROOM OF REQUIREMENT.",
  "YOU DO NOT TALK ABOUT THE ROOM OF REQUIREMENT.",
  "IF THE ROOM PICKS FOR YOU, YOU WATCH WHAT IT CHOOSES.",
  "ONLY TWO PEOPLE TO A SELECTION.",
  "ONE SELECTION AT A TIME.",
  "NO COMPLAINING, NO SKIPPING.",
  "SESSIONS WILL GO ON AS LONG AS THEY HAVE TO.",
  "IF THIS IS YOUR FIRST TIME IN THE ROOM, YOU HAVE TO SUBMIT."
];

const ReqRoomPage: React.FC = () => {
  // State to hold the staggered layout pattern
  const [layoutPattern, setLayoutPattern] = useState<{
    offsets: number[];
    rotations: number[];
    verticalSpacing: number[];
  }>({
    offsets: [],
    rotations: [],
    verticalSpacing: []
  });
  
  // Generate the staggered layout pattern mimicking the Fight Club poster
  useEffect(() => {
    // Create varied offsets for horizontal positioning like in the poster
    const offsets = [
      20,   // Rule 1 - moderate indent
      40,   // Rule 2 - larger indent
      15,   // Rule 3 - slight indent
      65,   // Rule 4 - significant indent
      30,   // Rule 5 - moderate indent
      5,    // Rule 6 - minimal indent
      50,   // Rule 7 - larger indent
      25    // Rule 8 - moderate indent
    ];
    
    // Subtle rotations for each rule to create the hand-applied look
    const rotations = Array.from({ length: roomRules.length }, () => 
      (Math.random() * 1.2 - 0.6) // -0.6 to 0.6 degrees
    );
    
    // Variable spacing between rules to match the uneven distribution in the poster
    const baseSpacing = 18; // Base vertical space between rules
    const verticalSpacing = Array.from({ length: roomRules.length }, () => 
      baseSpacing + (Math.random() * 20 - 10) // Vary by +/- 10px
    );
    
    setLayoutPattern({ offsets, rotations, verticalSpacing });
  }, []);
  
  return (
    <>
      {/* Apply Fight Club theme using the new component */}
      <FightClubTheme intensity={1} variant="green">
        {/* Standard layout with transparent background */}
        <MainLayout transparentBg={true}>
          {/* Main container with overflow control */}
          <div className="container mx-auto mt-4 mb-8 px-4 max-w-full overflow-x-hidden">
            {/* Title with Fight Club styling */}
            <div className="mb-16 mt-8">
              <GlitchTitle 
                title="THE RULES OF"
                className="text-center mb-2"
                glitchColors={{ primary: '#ff0099', secondary: '#00ffff', accent: '#ffff00' }}
                spatterCount={20}
                verticalOffset={30}
                glitchIntensity={1.2}
              />
              <GlitchTitle 
                title="REQUIREMENT"
                className="text-center"
                glitchColors={{ primary: '#ff0099', secondary: '#00ffff', accent: '#ffff00' }}
                spatterCount={40}
                verticalOffset={30}
                glitchIntensity={1.6}
              />
            </div>
            
            {/* Rules list with Fight Club styling */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mt-12 w-full max-w-4xl mx-auto"
            >
              {/* Container for staggered rules */}
              <div className="relative py-4" style={{ minHeight: '600px' }}>
                {layoutPattern.offsets.length > 0 && roomRules.map((rule, index) => (
                  <motion.div
                    key={`rule-${index}`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.15, 
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1] // Custom ease that mimics the Fight Club aesthetic
                    }}
                    style={{ 
                      position: 'relative',
                      marginBottom: `${layoutPattern.verticalSpacing[index]}px`,
                      transform: `rotate(${layoutPattern.rotations[index]}deg)`
                    }}
                  >
                    <FightClubCard 
                      ruleNumber={index + 1}
                      offset={layoutPattern.offsets[index]}
                    >
                      {rule}
                    </FightClubCard>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: roomRules.length * 0.15 + 0.5 }}
                className="mt-8 text-center text-text-secondary font-specialelite"
              >
                <p className="text-sm opacity-60 italic">
                  Coming soon: Random media selection functionality
                </p>
              </motion.div>
            </motion.div>
          </div>
        </MainLayout>
      </FightClubTheme>
    </>
  );
};

export default ReqRoomPage; 