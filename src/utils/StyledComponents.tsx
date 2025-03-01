import styled from 'styled-components';
import { Card, Button, TextField, Box, Paper } from '@mui/material';
import { colors } from './theme';

// Custom styled container with the aesthetic blend
export const MagicContainer = styled.div`
  background-color: ${colors.background.main};
  background-image: 
    radial-gradient(circle at 30% 20%, ${colors.accent.primary}15, transparent 20%),
    radial-gradient(circle at 80% 80%, ${colors.accent.secondary}15, transparent 20%);
  min-height: 100vh;
  color: ${colors.text.primary};
  font-family: 'IBM Plex Sans', sans-serif;
`;

// Parchment-like card that combines Hogwarts and Dark Academia aesthetic
export const ParchmentCard = styled(Card)`
  background-color: ${colors.background.paper} !important;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='${colors.accent.gold.replace('#', '%23')}10' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E"),
    linear-gradient(135deg, ${colors.background.accent}80 0%, ${colors.background.paper} 100%);
  border: 1px solid ${colors.ui.border};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5),
              0 0 15px ${colors.accent.primary}30,
              inset 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 24px;
  color: ${colors.text.primary};
`;

// Futuristic cyberpunk-inspired button
export const NeonButton = styled(Button)`
  background: linear-gradient(45deg, ${colors.accent.primary} 10%, ${colors.accent.secondary} 90%) !important;
  color: ${colors.text.primary} !important;
  text-shadow: 0 0 5px ${colors.accent.primary}80;
  box-shadow: 0 3px 10px ${colors.accent.primary}50 !important;
  border: 1px solid ${colors.accent.primary}80 !important;
  transition: all 0.3s ease-in-out !important;
  font-family: 'Cinzel', serif !important;
  letter-spacing: 1px;
  
  &:hover {
    box-shadow: 0 6px 14px ${colors.accent.primary}80 !important;
    transform: translateY(-2px);
  }
`;

// House-themed buttons
export const GryffindorButton = styled(Button)`
  background: linear-gradient(45deg, #740001 30%, ${colors.accent.quaternary} 90%) !important;
  color: ${colors.text.primary} !important;
  border: 1px solid #D3A625 !important;
`;

export const SlytherinButton = styled(Button)`
  background: linear-gradient(45deg, #1A472A 30%, ${colors.accent.tertiary} 90%) !important;
  color: ${colors.text.primary} !important;
  border: 1px solid #C0C0C0 !important;
`;

export const RavenclawButton = styled(Button)`
  background: linear-gradient(45deg, #0E1A40 30%, ${colors.accent.secondary} 90%) !important;
  color: ${colors.text.primary} !important;
  border: 1px solid ${colors.accent.bronze} !important;
`;

export const HufflepuffButton = styled(Button)`
  background: linear-gradient(45deg, #ecb939 30%, #f0c75e 90%) !important;
  color: #372E29 !important;
  border: 1px solid #372E29 !important;
`;

// Navigation panel with neo-gothic design
export const GothicNavPanel = styled(Paper)`
  background-color: ${colors.background.paper} !important;
  border-right: 1px solid ${colors.ui.border};
  min-height: 100vh;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, 
      transparent, 
      ${colors.accent.primary}50,
      transparent
    );
  }
`;

// Input field with ancient spellbook feel
export const SpellbookTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border: 1px solid ${colors.ui.border};
    background: ${colors.background.main}90;
    font-family: 'IBM Plex Sans', sans-serif;
    
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${colors.accent.gold};
    }
    
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${colors.accent.primary};
      border-width: 2px;
      box-shadow: 0 0 8px ${colors.accent.primary}50;
    }
  }
  
  & .MuiInputLabel-root {
    color: ${colors.text.secondary};
    font-family: 'Playfair Display', serif;
    
    &.Mui-focused {
      color: ${colors.accent.primary};
    }
  }
  
  & .MuiInputBase-input {
    color: ${colors.text.primary};
  }
`;

// Header with ornate design
export const OrnateHeader = styled.header`
  background-color: ${colors.background.paper};
  border-bottom: 1px solid ${colors.ui.border};
  padding: 12px 24px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent, 
      ${colors.accent.gold}50,
      transparent
    );
  }
`;

// Parchment-like container for content
export const ParchmentContainer = styled(Box)`
  background-color: ${colors.background.paper};
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='${colors.accent.gold.replace('#', '%23')}10' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
  padding: 24px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(45deg, transparent 40%, ${colors.accent.gold}10 45%, transparent 50%);
    filter: blur(8px);
    opacity: 0.4;
    z-index: -1;
  }
`;

export const GlowingText = styled.span<{ color?: string }>`
  color: ${props => props.color || colors.accent.primary};
  text-shadow: 0 0 5px ${props => props.color || colors.accent.primary}80;
`;

export const GothicHeading = styled.h1`
  font-family: 'Cinzel', serif;
  color: ${colors.text.primary};
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent, 
      ${colors.accent.gold}, 
      transparent
    );
  }
`;

export const ArcaneRule = styled.hr`
  border: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    ${colors.accent.gold}80,
    transparent
  );
  margin: 2rem 0;
`;

export const ScrollContainer = styled.div<{ maxHeight?: string }>`
  max-height: ${props => props.maxHeight || '70vh'};
  overflow-y: auto;
  padding-right: 10px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${colors.background.accent}50;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${colors.ui.border};
    border-radius: 4px;
    
    &:hover {
      background: ${colors.accent.primary}80;
    }
  }
`;

export const CategoryBadge = styled.span<{ color?: string }>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => props.color || colors.accent.primary}30;
  color: ${props => props.color || colors.accent.primary};
  border: 1px solid ${props => props.color || colors.accent.primary}50;
  margin-right: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`; 