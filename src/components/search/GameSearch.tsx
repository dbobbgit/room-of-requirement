import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  InputAdornment, 
  CircularProgress, 
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Paper,
  Chip,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AddIcon from '@mui/icons-material/Add';
import { searchGames, getGameDetails, mapGameDataToAppFormat, RAWGGame } from '../../services/rawgApi';
import { colors } from '../../utils/theme';

interface GameSearchProps {
  onSelectGame: (gameData: any) => void;
}

const GameSearch: React.FC<GameSearchProps> = ({ onSelectGame }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<RAWGGame[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<RAWGGame | null>(null);

  // Debounce search query
  useEffect(() => {
    if (!searchQuery || searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      setError(null);
      
      try {
        const results = await searchGames(searchQuery);
        setSearchResults(results);
      } catch (err) {
        setError('Error searching for games');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms delay for debounce

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleGameSelect = async (game: RAWGGame) => {
    setSelectedGame(game);
    setSearchQuery(''); // Clear search field
    setSearchResults([]); // Clear results
    
    try {
      // Get more detailed information about the game if needed
      // In RAWG, search results have most of what we need, but you can get more details if required
      const detailedGame = await getGameDetails(game.id);
      const formattedGameData = mapGameDataToAppFormat(detailedGame);
      
      // Pass the formatted data to the parent component
      onSelectGame(formattedGameData);
    } catch (err) {
      console.error('Error fetching game details:', err);
      setError('Error fetching game details');
    }
  };

  const getPlatformText = (game: RAWGGame): string => {
    if (!game.platforms || game.platforms.length === 0) {
      return 'Unknown platform';
    }
    
    // Get first 2 platforms to display
    return game.platforms
      .slice(0, 2)
      .map(p => p.platform.name)
      .join(', ');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for a game..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {loading ? <CircularProgress size={20} /> : <SearchIcon />}
            </InputAdornment>
          ),
          sx: {
            border: `1px solid ${colors.ui.border}`,
            background: `${colors.background.main}90`,
            borderRadius: 1,
          }
        }}
        sx={{ mb: 2 }}
      />
      
      {error && (
        <Typography 
          color="error" 
          variant="body2" 
          sx={{ mb: 2 }}
        >
          {error}
        </Typography>
      )}
      
      {searchResults.length > 0 && (
        <Paper 
          elevation={4}
          sx={{ 
            maxHeight: 350, 
            overflow: 'auto',
            mb: 3,
            background: `${colors.background.paper}F0`,
            backdropFilter: 'blur(8px)',
            borderRadius: 1,
            border: `1px solid ${colors.ui.border}`
          }}
        >
          <List dense>
            {searchResults.map((game) => (
              <ListItem
                key={game.id}
                onClick={() => handleGameSelect(game)}
                sx={{
                  '&:hover': {
                    backgroundColor: `${colors.background.accent}50`,
                  },
                  borderBottom: `1px solid ${colors.ui.divider}`,
                  cursor: 'pointer'
                }}
              >
                <ListItemAvatar>
                  {game.background_image ? (
                    <Avatar 
                      src={game.background_image} 
                      alt={game.name}
                      variant="rounded"
                      sx={{ width: 50, height: 75 }}
                    />
                  ) : (
                    <Avatar variant="rounded" sx={{ bgcolor: colors.accent.secondary }}>
                      <SportsEsportsIcon />
                    </Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography 
                      variant="subtitle1" 
                      component="div"
                      sx={{ fontWeight: 'medium' }}
                    >
                      {game.name}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      {game.released && (
                        <Typography variant="body2" component="span">
                          {new Date(game.released).getFullYear()}
                        </Typography>
                      )}
                      <Box sx={{ mt: 0.5 }}>
                        <Typography variant="body2" color="textSecondary">
                          {getPlatformText(game)}
                        </Typography>
                      </Box>
                      {game.metacritic && (
                        <Chip 
                          label={`${(game.metacritic / 20).toFixed(1)}/5`} 
                          size="small" 
                          sx={{ 
                            mt: 0.5, 
                            backgroundColor: colors.accent.gold,
                            color: '#000000',
                            height: 20,
                            fontSize: '0.7rem',
                          }} 
                        />
                      )}
                    </Box>
                  }
                  sx={{ ml: 1 }}
                />
                <Button
                  size="small"
                  startIcon={<AddIcon />}
                  sx={{
                    ml: 1,
                    color: colors.accent.secondary,
                    '&:hover': {
                      backgroundColor: `${colors.accent.secondary}20`,
                    }
                  }}
                >
                  Select
                </Button>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      
      {searchQuery && searchResults.length === 0 && !loading && (
        <Typography 
          variant="body2" 
          color="textSecondary" 
          sx={{ textAlign: 'center', py: 2 }}
        >
          No games found. Try a different search term.
        </Typography>
      )}
    </Box>
  );
};

export default GameSearch; 