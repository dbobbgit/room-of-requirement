import React from 'react';
import { MainLayout } from '../components/layout';
import GlitchTitle from '../components/effects/GlitchTitle';
import { motion } from 'framer-motion';

const ReqRoomPage: React.FC = () => {
  return (
    <MainLayout>
      {/* Match the container structure from HomePage to ensure consistent styling */}
      <div className="container mx-auto mt-4 mb-8 px-4">
        {/* Use the GlitchTitle component with default styling */}
        <GlitchTitle 
          title="Room of Requirement"
          // Let the component use its default values for consistency
          // Optional customization - default values will be used if not provided
          // glitchColors={{ primary: '#ff0099', secondary: '#00ffff', accent: '#ffff00' }}
          // spatterCount={56}
          // debugMode={false}
          // verticalOffset={40}
          // glitchIntensity={1.4}
        />
        
        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <div className="bg-background-paper p-6 rounded-lg shadow-lg relative overflow-hidden">
            <h2 className="text-2xl font-playfair mb-4">
              Welcome to the Room of Requirement
            </h2>
            
            <p className="text-text-secondary mb-4">
              The first rule of the Room of Requirement: The Room picks the movie or game. The second rule of the Room of Requirement: YOU SUBMIT TO THE ROOM.
            </p>
            
            <p className="text-text-secondary">
              Coming soon: Random media selection functionality!
            </p>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default ReqRoomPage; 