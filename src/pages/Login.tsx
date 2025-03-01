import React, { useState } from 'react';
import { Container, Typography, Box, Stack } from '@mui/material';
import { 
  ParchmentCard, 
  SpellbookTextField, 
  NeonButton, 
  GothicHeading, 
  MagicContainer,
  GlowingText
} from '../utils/StyledComponents';
import { colors } from '../utils/theme';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', { email, password });
  };

  return (
    <MagicContainer>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            textAlign: 'center',
          }}
        >
          <Typography 
            variant="h2" 
            sx={{ 
              fontFamily: '"Cinzel", serif',
              letterSpacing: '2px',
              mb: 2,
              textShadow: `0 0 10px ${colors.accent.primary}40`,
            }}
          >
            <GlowingText color={colors.accent.gold}>Room</GlowingText> of <GlowingText>Requirement</GlowingText>
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            sx={{ 
              mb: 4, 
              fontFamily: '"Playfair Display", serif',
              fontStyle: 'italic',
              color: colors.text.secondary,
            }}
          >
            A magical collection of family entertainment
          </Typography>

          <ParchmentCard>
            <Box sx={{ p: 2 }}>
              <GothicHeading>Enter the Chamber</GothicHeading>
              
              <form onSubmit={handleLogin}>
                <Stack spacing={3} width="100%">
                  <SpellbookTextField
                    label="Magical Email"
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  
                  <SpellbookTextField
                    label="Secret Password"
                    fullWidth
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  
                  <NeonButton
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                  >
                    Alohomora
                  </NeonButton>
                </Stack>
              </form>
            </Box>
          </ParchmentCard>
          
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 3, 
              color: colors.text.secondary,
              fontFamily: '"Playfair Display", serif', 
            }}
          >
            "I need a place where family memories can be stored..."
          </Typography>
        </Box>
      </Container>
    </MagicContainer>
  );
};

export default Login; 