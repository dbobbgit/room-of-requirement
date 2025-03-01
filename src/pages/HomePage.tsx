import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn, getCategoryColorClasses } from '../utils/tailwindUtils';
import MainLayout from '../components/layout/MainLayout';
import GlitchTitle from '../components/effects/GlitchTitle';

import { MovieIcon, SportsEsportsIcon, MenuBookIcon, MusicNoteIcon, AddIcon } from '../components/icons/index';

const HomePage = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: 'Movies',
      icon: <MovieIcon className="text-4xl" />,
      description: 'Life\'s too short to watch bad movies—unless we\'re roasting them together.',
      color: 'accent-primary',
      path: '/movies',
      addPath: '/add/movie',
      count: 24
    },
    {
      title: 'Games',
      icon: <SportsEsportsIcon className="text-4xl" />,
      description: 'A family that plays together, stays together—unless someone rage quits',
      color: 'accent-secondary',
      path: '/games',
      addPath: '/add/game',
      count: 16
    },
    {
      title: 'Books',
      icon: <MenuBookIcon className="text-4xl" />,
      description: 'A good book should be read twice—once by you, once by me.',
      color: 'accent-tertiary',
      path: '/books',
      addPath: '/add/book',
      count: 10
    },
    {
      title: 'Music',
      icon: <MusicNoteIcon className="text-4xl" />,
      description: 'No skips, no complaints—family DJ rules (enforced poorly).',
      color: 'accent-quaternary',
      path: '/music',
      addPath: '/add/music',
      count: 12
    }
  ];

  const handleCategoryClick = (path: string, disabled?: boolean) => {
    if (!disabled) {
      navigate(path);
    }
  };

  const handleAddClick = (path: string, disabled?: boolean, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (!disabled) {
      navigate(path);
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto mt-4 mb-8 px-4">
        {/* Use the new GlitchTitle component */}
        <GlitchTitle 
          title="Room of Requirement"
          // Optional customization - default values will be used if not provided
          // glitchColors={{ primary: '#ff0099', secondary: '#00ffff', accent: '#ffff00' }}
          // spatterCount={56}
          // debugMode={false}
          // verticalOffset={40}
        />
        
        <p className="font-playfair mb-4 mt-12 text-text-secondary max-w-[800px] mx-auto leading-normal px-2">
          The first rule of the Room of Requirement: The Room picks the movie or game. The second rule of the Room of Requirement: YOU SUBMIT TO THE ROOM.
        </p>

        <div className="mb-6">
          <h2 className="font-playfair border-b border-ui-divider pb-1 mb-3 text-2xl">
            Your Collection
          </h2>
          
          <div className="flex flex-wrap -mx-2">
            {categories.map((category) => {
              const colors = getCategoryColorClasses(category.color);
              
              return (
                <div 
                  key={category.title}
                  className="w-full sm:w-1/2 md:w-1/4 p-2"
                >
                  <div 
                    onClick={() => handleCategoryClick(category.path)}
                    className={cn(
                      "p-3 h-full flex flex-col bg-gradient-to-br from-background-paper to-background-accent rounded shadow-md transition-all duration-300 cursor-pointer hover:translate-y-[-4px] hover:shadow-lg",
                      colors.border
                    )}
                  >
                    <div className={cn("flex items-center justify-center mb-2 p-1.5 rounded-full w-16 h-16 mx-auto mb-4", colors.bgLight, colors.text)}>
                      {category.icon}
                    </div>
                    
                    <h3 className={cn("font-cinzel font-semibold text-center text-xl mb-2", colors.text)}>
                      {category.title}
                    </h3>
                    
                    <p className="text-text-secondary text-center text-sm mb-2">
                      {category.description}
                    </p>
                    
                    <p className="mt-auto mb-1 font-medium text-text-primary text-center">
                      {category.count} items
                    </p>
                    
                    <button
                      onClick={(e) => handleAddClick(category.addPath, false, e)}
                      className={cn("mt-auto px-4 py-2 rounded font-cinzel flex items-center justify-center text-text-primary transition-colors", colors.bg, colors.bgHover)}
                    >
                      <AddIcon className="mr-1" /> Add New {category.title.slice(0, -1)}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage; 