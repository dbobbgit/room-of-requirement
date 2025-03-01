import React, { ReactNode } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '../../utils/theme';

// Create a styled container for navigation links
const NavLinkContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ isActive, theme }) => ({
  padding: '8px 16px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  cursor: isActive ? 'default' : 'pointer',
  color: isActive ? colors.accent.primary : colors.text.primary,
  backgroundColor: isActive ? `${colors.accent.primary}15` : 'transparent',
  borderLeft: isActive ? `3px solid ${colors.accent.primary}` : '3px solid transparent',
  borderRadius: 1,
  transition: 'all 0.2s ease-in-out',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: `${colors.accent.primary}15`,
    color: colors.accent.primary,
    textDecoration: 'none',
  },
}));

// Create a styled div for disabled links
const DisabledLink = styled(Box)(({ theme }) => ({
  padding: '8px 16px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  opacity: 0.5,
  pointerEvents: 'none',
  cursor: 'not-allowed',
  color: colors.text.primary,
  borderRadius: 1,
}));

interface NavLinkProps {
  to: string;
  children: ReactNode;
  exact?: boolean;
  disabled?: boolean;
  sx?: any;
  onClick?: () => void;
}

/**
 * NavLink component that provides active state highlighting
 */
const NavLink: React.FC<NavLinkProps> = ({
  to,
  children,
  exact = false,
  disabled = false,
  sx = {},
  onClick,
}) => {
  const location = useLocation();
  const isActive = exact 
    ? location.pathname === to 
    : location.pathname.startsWith(to) && to !== '/' || location.pathname === to;

  if (disabled) {
    return (
      <DisabledLink sx={sx}>
        {children}
      </DisabledLink>
    );
  }

  return (
    <RouterLink 
      to={to} 
      onClick={onClick}
      style={{ textDecoration: 'none', display: 'block', width: '100%' }}
    >
      <NavLinkContainer isActive={isActive} sx={sx}>
        {children}
      </NavLinkContainer>
    </RouterLink>
  );
};

export default NavLink; 