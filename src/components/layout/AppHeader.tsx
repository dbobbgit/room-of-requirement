import React from 'react';
import { Typography, Avatar, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { OrnateHeader, GlowingText } from '../../utils/StyledComponents';
import { colors } from '../../utils/theme';

// Import the Special Elite font if not already imported elsewhere
// You might need to add this font to your project if it's not already included
// Add this to public/index.html or equivalent:
// <link href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap" rel="stylesheet">

const AppHeader: React.FC = () => {
  return (
    <OrnateHeader>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2, display: { md: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      
      <Typography
        variant="h5"
        component="div"
        sx={{
          flexGrow: 1,
          fontFamily: '"Cinzel", serif',
          letterSpacing: '1px',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <GlowingText color={colors.accent.gold}>Room</GlowingText> of <GlowingText>Requirement</GlowingText>
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
        
        <Avatar 
          sx={{ 
            border: `2px solid ${colors.accent.primary}90`,
            boxShadow: `0 0 10px ${colors.accent.primary}50`
          }}
        >
          U
        </Avatar>
      </Box>
    </OrnateHeader>
  );
};

export default AppHeader; 