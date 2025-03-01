import React, { ReactNode } from 'react';
import { Box, Stack, Container } from '@mui/material';
import AppHeader from '../../components/layout/AppHeader';
import SideNavigation from '../../components/layout/SideNavigation';
import { MagicContainer } from '../../utils/StyledComponents';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <MagicContainer>
      <Stack direction="column" sx={{ height: '100%' }}>
        <AppHeader />
        <Stack 
          direction="row" 
          sx={{ 
            flex: 1,
            overflow: 'hidden' 
          }}
        >
          <Box 
            sx={{ 
              width: { xs: '100%', md: '25%', lg: '16.666%' },
              display: { xs: 'none', md: 'block' }
            }}
          >
            <SideNavigation />
          </Box>
          <Box 
            component="main" 
            sx={{ 
              flex: 1,
              p: 3, 
              overflow: 'auto',
              width: { xs: '100%', md: '75%', lg: '83.333%' },
            }}
          >
            {children}
          </Box>
        </Stack>
      </Stack>
    </MagicContainer>
  );
};

export default MainLayout; 