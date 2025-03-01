import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Select, 
  SelectChangeEvent, 
  Rating,
  Avatar,
  Chip,
  Stack
} from '@mui/material';
import { 
  ParchmentCard, 
  SpellbookTextField, 
  NeonButton, 
  GothicHeading, 
  CategoryBadge 
} from '../../utils/StyledComponents';
import { colors } from '../../utils/theme';
import { User } from '../cards/MediaCard';

export type MediaType = 'movie' | 'game' | 'book' | 'music';

interface MediaFormProps {
  mediaType: MediaType;
  currentUser: User;
  availableUsers: User[];
  onSubmit: (mediaData: any) => void;
  initialData?: any; // Optional data for pre-filling the form
}

const MediaEntryForm: React.FC<MediaFormProps> = ({ 
  mediaType, 
  currentUser, 
  availableUsers, 
  onSubmit, 
  initialData 
}) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState<number | null>(0);
  const [notes, setNotes] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [sharedUsers, setSharedUsers] = useState<string[]>([]);
  
  // Media specific fields
  const [director, setDirector] = useState(''); // For movies
  const [platform, setPlatform] = useState(''); // For games
  const [author, setAuthor] = useState(''); // For books
  const [pages, setPages] = useState(''); // For books
  const [artist, setArtist] = useState(''); // For music
  const [tracks, setTracks] = useState(''); // For music
  
  // Use effect to prefill form when initialData changes
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setYear(initialData.year ? initialData.year.toString() : '');
      setGenre(initialData.genre || '');
      setRating(initialData.rating || 0);
      setNotes(initialData.notes || '');
      setImageUrl(initialData.imageUrl || '');
      
      // Set media-specific fields if they exist in the initialData
      if (mediaType === 'movie' && initialData.director) {
        setDirector(initialData.director);
      } else if (mediaType === 'game' && initialData.platform) {
        setPlatform(initialData.platform);
      } else if (mediaType === 'book') {
        setAuthor(initialData.author || '');
        setPages(initialData.pages ? initialData.pages.toString() : '');
      } else if (mediaType === 'music') {
        setArtist(initialData.artist || '');
        setTracks(initialData.tracks ? initialData.tracks.toString() : '');
      }
    }
  }, [initialData, mediaType]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get full user objects for shared users
    const sharedWithUsers = availableUsers.filter(user => 
      sharedUsers.includes(user.id) && user.id !== currentUser.id
    );
    
    const mediaData = {
      title,
      year: parseInt(year),
      genre,
      rating,
      notes,
      imageUrl,
      // Conditional fields based on media type
      ...(mediaType === 'movie' && { director }),
      ...(mediaType === 'game' && { platform }),
      ...(mediaType === 'book' && { author, pages: parseInt(pages) }),
      ...(mediaType === 'music' && { artist, tracks: parseInt(tracks) }),
      mediaType,
      dateAdded: new Date().toISOString(),
      addedBy: currentUser,
      sharedWith: sharedWithUsers.length > 0 ? sharedWithUsers : undefined,
    };
    
    onSubmit(mediaData);
  };

  const handleSharedUserChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSharedUsers(typeof value === 'string' ? value.split(',') : value);
  };

  const getMediaTypeTitle = () => {
    switch(mediaType) {
      case 'movie': return 'Movie';
      case 'game': return 'Game';
      case 'book': return 'Book';
      case 'music': return 'Music';
      default: return 'Media';
    }
  };
  
  const getGenreOptions = () => {
    switch(mediaType) {
      case 'movie': 
        return [
          'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 
          'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 
          'Thriller', 'Western', 'Other'
        ];
      case 'game': 
        return [
          'Action', 'Adventure', 'RPG', 'Strategy', 'Simulation', 'Sports', 
          'Puzzle', 'Racing', 'Fighting', 'Shooter', 'Platformer', 'MMO', 
          'Survival', 'Horror', 'Other'
        ];
      case 'book':
        return [
          'Fiction', 'Non-Fiction', 'Mystery', 'Thriller', 'Romance', 'Sci-Fi',
          'Fantasy', 'Horror', 'Biography', 'History', 'Self-Help', 'Children',
          'Young Adult', 'Poetry', 'Other'
        ];
      case 'music':
        return [
          'Rock', 'Pop', 'Hip Hop', 'R&B', 'Country', 'Jazz', 'Blues', 'Classical',
          'Electronic', 'Folk', 'Metal', 'Punk', 'Reggae', 'World', 'Other'
        ];
      default:
        return ['Other'];
    }
  };
  
  const getPlatformOptions = () => {
    return [
      'PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X/S', 'Xbox One', 
      'Nintendo Switch', 'Mobile', 'Other'
    ];
  };
  
  return (
    <ParchmentCard>
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <GothicHeading>Add New {getMediaTypeTitle()}</GothicHeading>
          <CategoryBadge 
            color={
              mediaType === 'movie' ? colors.accent.quaternary : 
              mediaType === 'game' ? colors.accent.secondary :
              mediaType === 'book' ? colors.accent.tertiary :
              colors.accent.primary
            }
          >
            {getMediaTypeTitle()}
          </CategoryBadge>
        </Box>
        
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            src={currentUser.avatar} 
            sx={{ 
              width: 40, 
              height: 40,
              border: `2px solid ${colors.accent.primary}80`,
            }}
          >
            {currentUser.initial}
          </Avatar>
          <Typography>
            Adding as <strong>{currentUser.name}</strong>
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <SpellbookTextField
              label="Title"
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <SpellbookTextField
                label="Year"
                fullWidth
                variant="outlined"
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
              
              <FormControl fullWidth>
                <InputLabel id="genre-label">Genre</InputLabel>
                <Select
                  labelId="genre-label"
                  value={genre}
                  label="Genre"
                  onChange={(e: SelectChangeEvent) => setGenre(e.target.value)}
                  required
                  sx={{
                    border: `1px solid ${colors.ui.border}`,
                    background: `${colors.background.main}90`,
                    borderRadius: 1,
                  }}
                >
                  {getGenreOptions().map((genre) => (
                    <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            
            {/* For movies only */}
            {mediaType === 'movie' && (
              <SpellbookTextField
                label="Director"
                fullWidth
                variant="outlined"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
              />
            )}
            
            {/* For games only */}
            {mediaType === 'game' && (
              <FormControl fullWidth>
                <InputLabel id="platform-label">Platform</InputLabel>
                <Select
                  labelId="platform-label"
                  value={platform}
                  label="Platform"
                  onChange={(e: SelectChangeEvent) => setPlatform(e.target.value)}
                  required={mediaType === 'game'}
                  sx={{
                    border: `1px solid ${colors.ui.border}`,
                    background: `${colors.background.main}90`,
                    borderRadius: 1,
                  }}
                >
                  {getPlatformOptions().map((platform) => (
                    <MenuItem key={platform} value={platform}>{platform}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            
            {/* For books only */}
            {mediaType === 'book' && (
              <>
                <SpellbookTextField
                  label="Author"
                  fullWidth
                  variant="outlined"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
                <SpellbookTextField
                  label="Number of Pages"
                  fullWidth
                  variant="outlined"
                  type="number"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                />
              </>
            )}
            
            {/* For music only */}
            {mediaType === 'music' && (
              <>
                <SpellbookTextField
                  label="Artist/Band"
                  fullWidth
                  variant="outlined"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  required
                />
                <SpellbookTextField
                  label="Number of Tracks"
                  fullWidth
                  variant="outlined"
                  type="number"
                  value={tracks}
                  onChange={(e) => setTracks(e.target.value)}
                />
              </>
            )}
            
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Rating
              </Typography>
              <Rating
                name="rating"
                value={(rating || 0) / 2}
                onChange={(event, newValue) => {
                  setRating(newValue ? newValue * 2 : 0);
                }}
                precision={0.5}
                max={5}
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: colors.accent.gold,
                  },
                  '& .MuiRating-iconHover': {
                    color: colors.accent.gold,
                  },
                }}
              />
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: colors.text.secondary }}>
                {(rating || 0) / 2}/5 stars
              </Typography>
            </Box>
            
            <FormControl fullWidth>
              <InputLabel id="shared-users-label">Share With</InputLabel>
              <Select
                labelId="shared-users-label"
                multiple
                value={sharedUsers}
                onChange={handleSharedUserChange}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((userId) => {
                      const user = availableUsers.find(u => u.id === userId);
                      return (
                        <Chip 
                          key={userId} 
                          label={user?.name} 
                          avatar={<Avatar src={user?.avatar}>{user?.initial}</Avatar>}
                          sx={{
                            backgroundColor: `${colors.accent.primary}20`,
                            borderColor: colors.accent.primary,
                          }}
                        />
                      );
                    })}
                  </Box>
                )}
                sx={{
                  border: `1px solid ${colors.ui.border}`,
                  background: `${colors.background.main}90`,
                  borderRadius: 1,
                }}
              >
                {availableUsers
                  .filter(user => user.id !== currentUser.id)
                  .map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar src={user.avatar} sx={{ width: 24, height: 24 }}>
                          {user.initial}
                        </Avatar>
                        <Typography>{user.name}</Typography>
                      </Box>
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            
            <SpellbookTextField
              label="Notes (optional)"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            
            <SpellbookTextField
              label="Image URL (optional)"
              fullWidth
              variant="outlined"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/your-image.jpg"
            />
            
            <Box sx={{ mt: 2 }}>
              <NeonButton
                type="submit"
                variant="contained"
                fullWidth
                size="large"
              >
                Add to Collection
              </NeonButton>
            </Box>
          </Stack>
        </form>
      </Box>
    </ParchmentCard>
  );
};

export default MediaEntryForm; 