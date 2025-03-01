import React, { createContext, ReactNode, useContext, useState } from 'react';

type ThemeType = 'default' | 'fightClub';
type ThemeVariant = 'default' | 'dark' | 'green';

interface ThemeContextType {
  theme: ThemeType;
  variant: ThemeVariant;
  intensity: number;
  setTheme: (theme: ThemeType) => void;
  setVariant: (variant: ThemeVariant) => void;
  setIntensity: (intensity: number) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'default',
  variant: 'default',
  intensity: 1,
  setTheme: () => {},
  setVariant: () => {},
  setIntensity: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeType;
  initialVariant?: ThemeVariant;
  initialIntensity?: number;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = 'default',
  initialVariant = 'default',
  initialIntensity = 1,
}) => {
  const [theme, setTheme] = useState<ThemeType>(initialTheme);
  const [variant, setVariant] = useState<ThemeVariant>(initialVariant);
  const [intensity, setIntensity] = useState<number>(initialIntensity);

  const value = {
    theme,
    variant,
    intensity,
    setTheme,
    setVariant,
    setIntensity,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 