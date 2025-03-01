import React from 'react';

// Create simplified icon components that mimic Material UI icons but use SVG directly
// This way we don't need the Material UI dependency

interface IconProps {
  className?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

export const MovieIcon: React.FC<IconProps> = ({ className = '', onClick }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
    onClick={onClick}
  >
    <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
  </svg>
);

export const SportsEsportsIcon: React.FC<IconProps> = ({ className = '', onClick }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
    onClick={onClick}
  >
    <path d="M21.58 16.09l-1.09-7.66C20.21 6.46 18.52 5 16.53 5H7.47C5.48 5 3.79 6.46 3.51 8.43l-1.09 7.66C2.2 17.63 3.39 19 4.94 19c.68 0 1.32-.27 1.8-.75L9 16h6l2.25 2.25c.48.48 1.13.75 1.8.75 1.56 0 2.75-1.37 2.53-2.91zM11 11H9v2H8v-2H6v-1h2V8h1v2h2v1zm4-1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
  </svg>
);

export const MenuBookIcon: React.FC<IconProps> = ({ className = '', onClick }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
    onClick={onClick}
  >
    <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
  </svg>
);

export const MusicNoteIcon: React.FC<IconProps> = ({ className = '', onClick }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
    onClick={onClick}
  >
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
  </svg>
);

export const AddIcon: React.FC<IconProps> = ({ className = '', onClick }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
    onClick={onClick}
  >
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

export const HomeIcon: React.FC<IconProps> = ({ className = '', onClick }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
    onClick={onClick}
  >
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

export const AccountCircleIcon: React.FC<IconProps> = ({ className = '', onClick }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
    onClick={onClick}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22c.03-1.99 4-3.08 6-3.08c1.99 0 5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z" />
  </svg>
);

export const LogoutIcon: React.FC<IconProps> = ({ className = '', onClick }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
    onClick={onClick}
  >
    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
  </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ className = '', onClick }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
    onClick={onClick}
  >
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

export const ReqRoomIcon: React.FC<IconProps> = ({ className = '', onClick }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
    onClick={onClick}
  >
    <path d="M12,3L2,12h3v8h14v-8h3L12,3z M12,16c-1.1,0-2-0.9-2-2c0-0.78,0.58-1.42,1.33-1.52c-0.38-1.64,0.39-1.97,0.67-2.18 c0.16-0.12,0-0.29-0.19-0.21c-0.18,0.08-0.82,0.49-0.83,1.79c-0.37,0.01-0.99,0.21-0.99,1.12c0,0.33,0.21,0.62,0.52,0.71 c0.15,0.05,0.2,0.25-0.03,0.28C9.83,14.07,9,13.47,9,12.57c0-0.93,0.64-1.39,1.09-1.53C10.72,10.19,11.5,9,13,9l0.01,0 c1.5,0,2.77,1.37,2.77,2.99C15.77,13.69,14.32,16,12,16z" />
    <path d="M13,12.5c0,0.83-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5S10.67,11,11.5,11S13,11.67,13,12.5z M13.5,9.29 c-0.5-0.77-1.47-1.27-2.49-1.27c-0.17,0-0.33,0.02-0.5,0.04c-0.21,0.03-0.28,0.27-0.13,0.41c0.35,0.31,0.81,0.85,0.94,1.59 c0.04,0.22,0.33,0.24,0.4,0.04c0.11-0.31,0.25-0.58,0.43-0.78C12.25,9.2,12.35,9.19,13.5,9.29z" />
  </svg>
); 