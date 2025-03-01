import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { ReqRoomIcon } from '../icons';
import { colors } from '../../utils/theme';
import NavLink from '../navigation/NavLink';

const SideNavigation = () => {
  const menuItems = [
    {
      text: 'The Req Room',
      icon: <ReqRoomIcon />,
      route: '/req-room',
      disabled: false
    },
    {
      text: 'Movies',
      icon: <MovieIcon />,
      route: '/movies',
      disabled: false
    },
    {
      text: 'Games',
      icon: <SportsEsportsIcon />,
      route: '/games',
      disabled: false
    },
    {
      text: 'Books',
      icon: <MenuBookIcon />,
      route: '/books',
      disabled: true
    },
    {
      text: 'Music',
      icon: <MusicNoteIcon />,
      route: '/music',
      disabled: true
    }
  ];

  const renderMenuItem = (item: any) => {
    return (
      <NavLink
        key={item.text}
        to={item.route}
        disabled={item.disabled}
        sx={{
          mb: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box sx={{ 
          minWidth: '40px',
          mr: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {item.icon}
        </Box>
        {item.text}
      </NavLink>
    );
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        borderRight: `1px solid ${colors.ui.divider}`,
      }}
    >
      <NavLink 
        to="/"
        exact
        sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center',
          mb: 2
        }}
      >
        <HomeIcon sx={{ mr: 1, color: colors.accent.primary }} />
        <Typography variant="h6" color={colors.text.primary} fontFamily="Cinzel">
          Home
        </Typography>
      </NavLink>
      
      <List sx={{ width: '100%', mt: 2 }}>
        {menuItems.map(renderMenuItem)}
      </List>
    </Box>
  );
};

export default SideNavigation; 