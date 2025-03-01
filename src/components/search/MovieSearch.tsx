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
import MovieIcon from '@mui/icons-material/Movie';
import AddIcon from '@mui/icons-material/Add';
import { searchMovies, getImageUrl, getMovieDetails, mapMovieDataToAppFormat, TMDBMovie } from '../../services/tmdbApi';
import { colors } from '../../utils/theme';

interface MovieSearchProps {
  onSelectMovie: (movieData: any) => void;
}

const MovieSearch: React.FC<MovieSearchProps> = ({ onSelectMovie }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<TMDBMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<TMDBMovie | null>(null);

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
        const results = await searchMovies(searchQuery);
        setSearchResults(results);
      } catch (err) {
        setError('Error searching for movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms delay for debounce

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleMovieSelect = async (movie: TMDBMovie) => {
    setSelectedMovie(movie);
    setSearchQuery(''); // Clear search field
    setSearchResults([]); // Clear results
    
    try {
      // Get more detailed information about the movie
      const detailedMovie = await getMovieDetails(movie.id);
      const formattedMovieData = mapMovieDataToAppFormat(detailedMovie);
      
      // Pass the formatted data to the parent component
      onSelectMovie(formattedMovieData);
    } catch (err) {
      console.error('Error fetching movie details:', err);
      setError('Error fetching movie details');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for a movie..."
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
            {searchResults.map((movie) => (
              <ListItem
                key={movie.id}
                onClick={() => handleMovieSelect(movie)}
                sx={{
                  '&:hover': {
                    backgroundColor: `${colors.background.accent}50`,
                  },
                  borderBottom: `1px solid ${colors.ui.divider}`,
                  cursor: 'pointer'
                }}
              >
                <ListItemAvatar>
                  {movie.poster_path ? (
                    <Avatar 
                      src={getImageUrl(movie.poster_path, 'w92') || undefined} 
                      alt={movie.title}
                      variant="rounded"
                      sx={{ width: 50, height: 75 }}
                    />
                  ) : (
                    <Avatar variant="rounded" sx={{ bgcolor: colors.accent.primary }}>
                      <MovieIcon />
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
                      {movie.title}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      {movie.release_date && (
                        <Typography variant="body2" component="span">
                          {new Date(movie.release_date).getFullYear()}
                        </Typography>
                      )}
                      {movie.vote_average > 0 && (
                        <Chip 
                          label={`${(movie.vote_average / 2).toFixed(1)}/5`} 
                          size="small" 
                          sx={{ 
                            ml: 1, 
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
                    color: colors.accent.primary,
                    '&:hover': {
                      backgroundColor: `${colors.accent.primary}20`,
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
          No movies found. Try a different search term.
        </Typography>
      )}
    </Box>
  );
};

export default MovieSearch; 