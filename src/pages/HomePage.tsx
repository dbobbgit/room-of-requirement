import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Paper, Button, Stack } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AddIcon from '@mui/icons-material/Add';
import MainLayout from '../components/layout/MainLayout';
import { colors } from '../utils/theme';

const HomePage = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: 'Movies',
      icon: <MovieIcon sx={{ fontSize: 40 }} />,
      description: 'Browse your favorite films and discover classics',
      color: colors.accent.primary,
      path: '/movies',
      addPath: '/add/movie',
      count: 24
    },
    {
      title: 'Games',
      icon: <SportsEsportsIcon sx={{ fontSize: 40 }} />,
      description: 'Explore your gaming collection from all platforms',
      color: colors.accent.secondary,
      path: '/games',
      addPath: '/add/game',
      count: 16
    },
    {
      title: 'Books',
      icon: <MenuBookIcon sx={{ fontSize: 40 }} />,
      description: 'Your digital library at your fingertips',
      color: colors.accent.tertiary,
      path: '/books',
      addPath: '/add/book',
      count: 10
    },
    {
      title: 'Music',
      icon: <MusicNoteIcon sx={{ fontSize: 40 }} />,
      description: 'Listen to your favorite albums and tracks',
      color: colors.accent.quaternary,
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
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontFamily: '"Cinzel", serif',
              fontWeight: 700,
              mb: 2,
              background: `linear-gradient(45deg, ${colors.accent.primary}, ${colors.accent.gold})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Room of Requirement
          </Typography>
          <Typography 
            variant="h5"
            sx={{ 
              fontFamily: '"Playfair Display", serif',
              mb: 4,
              color: colors.text.secondary
            }}
          >
            Your family's digital collection
          </Typography>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontFamily: '"Playfair Display", serif',
              borderBottom: `1px solid ${colors.ui.divider}`,
              pb: 1,
              mb: 3
            }}
          >
            Your Collection
          </Typography>
          
          <Stack 
            direction="row" 
            flexWrap="wrap" 
            spacing={3} 
            useFlexGap
          >
            {categories.map((category) => (
              <Box 
                key={category.title}
                sx={{
                  width: {
                    xs: '100%',
                    sm: 'calc(50% - 12px)',
                    md: 'calc(25% - 18px)'
                  }
                }}
              >
                <Paper 
                  elevation={3}
                  onClick={() => handleCategoryClick(category.path)}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: `linear-gradient(135deg, ${colors.background.paper} 0%, ${colors.background.accent} 100%)`,
                    borderLeft: `4px solid ${category.color}`,
                    transition: 'all 0.3s ease-in-out',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      p: 1.5,
                      borderRadius: '50%',
                      width: 64,
                      height: 64,
                      backgroundColor: `${category.color}15`,
                      color: category.color,
                      margin: '0 auto 16px'
                    }}
                  >
                    {category.icon}
                  </Box>
                  
                  <Typography 
                    variant="h5" 
                    component="h3"
                    align="center"
                    gutterBottom
                    sx={{ 
                      fontFamily: '"Cinzel", serif',
                      fontWeight: 600,
                      color: category.color
                    }}
                  >
                    {category.title}
                  </Typography>
                  
                  <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 2 }}>
                    {category.description}
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    align="center" 
                    sx={{ 
                      mt: 'auto',
                      mb: 1,
                      fontWeight: 500,
                      color: colors.text.primary
                    }}
                  >
                    {category.count} items
                  </Typography>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={(e) => handleAddClick(category.addPath, false, e)}
                    sx={{
                      mt: 'auto',
                      backgroundColor: category.color,
                      '&:hover': {
                        backgroundColor: `${category.color}dd`,
                      }
                    }}
                  >
                    Add New {category.title.slice(0, -1)}
                  </Button>
                </Paper>
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default HomePage; 