import React, { useState } from 'react';
import { Container, Box, Typography, Paper, Tabs, Tab, Stack, Divider } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import MediaEntryForm, { MediaType } from '../components/forms/MediaEntryForm';
import MovieSearch from '../components/search/MovieSearch';
import GameSearch from '../components/search/GameSearch';
import { GothicHeading, NeonButton } from '../utils/StyledComponents';
import { User } from '../components/cards/MediaCard';
import { colors } from '../utils/theme';

// Mock users (in a real app, this would come from auth/user context)
const mockUsers: User[] = [
  { id: 'u1', name: 'Alice', initial: 'A', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 'u2', name: 'Bob', initial: 'B', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 'u3', name: 'Charlie', initial: 'C', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 'u4', name: 'Diana', initial: 'D', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 'u5', name: 'Ethan', initial: 'E', avatar: 'https://i.pravatar.cc/150?img=5' },
];

const AddMediaPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  
  const mediaType = (type as MediaType) || 'movie';
  const [tabValue, setTabValue] = useState(0);
  const [autofilledData, setAutofilledData] = useState<any>(null);
  
  // In a real app, this would be the current authenticated user
  const currentUser = mockUsers[0]; // Using Alice as the current user for demo
  
  const getMediaTypeTitle = () => {
    switch(mediaType) {
      case 'movie': return 'Movie';
      case 'game': return 'Game';
      case 'book': return 'Book';
      case 'music': return 'Music';
      default: return 'Media';
    }
  };
  
  const handleSubmit = (mediaData: any) => {
    console.log('Submitted media data:', mediaData);
    // Here you would typically save to your database
    
    // After saving, navigate back to the media list
    navigate(`/${mediaType}s`);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMovieSelect = (movieData: any) => {
    setAutofilledData(movieData);
    setTabValue(1); // Switch to manual entry tab with pre-filled data
  };

  const handleGameSelect = (gameData: any) => {
    setAutofilledData(gameData);
    setTabValue(1); // Switch to manual entry tab with pre-filled data
  };
  
  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <GothicHeading>Add New {getMediaTypeTitle()}</GothicHeading>
          <Typography variant="subtitle1" sx={{ mb: 3, opacity: 0.7 }}>
            Fill out the form below to add a new {getMediaTypeTitle().toLowerCase()} to your collection.
          </Typography>
        </Box>
        
        {mediaType === 'movie' && (
          <Paper 
            elevation={3} 
            sx={{ 
              mb: 4, 
              overflow: 'hidden',
              background: `linear-gradient(135deg, ${colors.background.paper} 0%, ${colors.background.accent} 100%)`,
              border: `1px solid ${colors.ui.border}`,
            }}
          >
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              sx={{
                borderBottom: `1px solid ${colors.ui.divider}`,
                '& .MuiTabs-indicator': {
                  backgroundColor: colors.accent.quaternary,
                },
                '& .MuiTab-root': {
                  color: colors.text.secondary,
                  '&.Mui-selected': {
                    color: colors.accent.quaternary,
                  },
                },
              }}
            >
              <Tab label="Search TMDB" />
              <Tab label="Manual Entry" />
            </Tabs>
            
            <Box sx={{ p: 3 }}>
              {tabValue === 0 ? (
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, fontFamily: '"Cinzel", serif' }}>
                    Search for a Movie
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, color: colors.text.secondary }}>
                    Search for a movie to automatically fill in details from The Movie Database (TMDB).
                  </Typography>
                  
                  <MovieSearch onSelectMovie={handleMovieSelect} />
                  
                  <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
                    <NeonButton
                      variant="text"
                      onClick={() => setTabValue(1)}
                    >
                      Skip to Manual Entry
                    </NeonButton>
                  </Stack>
                </Box>
              ) : null}
            </Box>
          </Paper>
        )}

        {mediaType === 'game' && (
          <Paper 
            elevation={3} 
            sx={{ 
              mb: 4, 
              overflow: 'hidden',
              background: `linear-gradient(135deg, ${colors.background.paper} 0%, ${colors.background.accent} 100%)`,
              border: `1px solid ${colors.ui.border}`,
            }}
          >
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              sx={{
                borderBottom: `1px solid ${colors.ui.divider}`,
                '& .MuiTabs-indicator': {
                  backgroundColor: colors.accent.quaternary,
                },
                '& .MuiTab-root': {
                  color: colors.text.secondary,
                  '&.Mui-selected': {
                    color: colors.accent.quaternary,
                  },
                },
              }}
            >
              <Tab label="Search RAWG" />
              <Tab label="Manual Entry" />
            </Tabs>
            
            <Box sx={{ p: 3 }}>
              {tabValue === 0 ? (
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, fontFamily: '"Cinzel", serif' }}>
                    Search for a Game
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, color: colors.text.secondary }}>
                    Search for a game to automatically fill in details from the RAWG Video Games Database.
                  </Typography>
                  
                  <GameSearch onSelectGame={handleGameSelect} />
                  
                  <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
                    <NeonButton
                      variant="text"
                      onClick={() => setTabValue(1)}
                    >
                      Skip to Manual Entry
                    </NeonButton>
                  </Stack>
                </Box>
              ) : null}
            </Box>
          </Paper>
        )}
        
        {(tabValue === 1 || (mediaType !== 'movie' && mediaType !== 'game')) && (
          <MediaEntryForm 
            mediaType={mediaType}
            currentUser={currentUser}
            availableUsers={mockUsers}
            onSubmit={handleSubmit}
            initialData={autofilledData}
          />
        )}
      </Container>
    </MainLayout>
  );
};

export default AddMediaPage; 