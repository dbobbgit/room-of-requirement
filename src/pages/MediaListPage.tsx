import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Chip,
  Stack
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import AddIcon from '@mui/icons-material/Add';
import { 
  ParchmentContainer, 
  GothicHeading, 
  NeonButton, 
  ScrollContainer,
  ArcaneRule
} from '../utils/StyledComponents';
import { colors } from '../utils/theme';
import MainLayout from '../components/layout/MainLayout';
import MediaCard, { User } from '../components/cards/MediaCard';
import { MediaType } from '../components/forms/MediaEntryForm';

interface MediaListPageProps {
  mediaType: MediaType;
  title: string;
}

// Define interfaces for our media items
interface BaseMediaItem {
  id: string;
  title: string;
  year: number;
  genre: string;
  rating: number;
  imageUrl: string;
  mediaType: MediaType;
  notes: string;
  dateAdded: string;
  addedBy: User;
  sharedWith?: User[];
}

interface MovieItem extends BaseMediaItem {
  mediaType: 'movie';
  director: string;
}

interface GameItem extends BaseMediaItem {
  mediaType: 'game';
  platform: string;
}

interface BookItem extends BaseMediaItem {
  mediaType: 'book';
  author: string;
  pages: number;
}

interface MusicItem extends BaseMediaItem {
  mediaType: 'music';
  artist: string;
  tracks: number;
}

type MediaItem = MovieItem | GameItem | BookItem | MusicItem;

// Mock users
const mockUsers: User[] = [
  { id: 'u1', name: 'Alice', initial: 'A', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 'u2', name: 'Bob', initial: 'B', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 'u3', name: 'Charlie', initial: 'C', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 'u4', name: 'Diana', initial: 'D', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 'u5', name: 'Ethan', initial: 'E', avatar: 'https://i.pravatar.cc/150?img=5' },
];

// Mock data for demonstration purposes
const mockMovieData: MovieItem[] = [
  {
    id: 'm1',
    title: 'The Dark Knight',
    year: 2008,
    genre: 'Action',
    rating: 9,
    imageUrl: 'https://via.placeholder.com/300x450?text=Dark+Knight',
    mediaType: 'movie',
    notes: 'Christopher Nolan\'s masterpiece with an unforgettable performance by Heath Ledger.',
    director: 'Christopher Nolan',
    dateAdded: '2023-05-15T12:00:00.000Z',
    addedBy: mockUsers[0],
    sharedWith: [mockUsers[1], mockUsers[3]],
  },
  {
    id: 'm2',
    title: 'Inception',
    year: 2010,
    genre: 'Sci-Fi',
    rating: 8,
    imageUrl: 'https://via.placeholder.com/300x450?text=Inception',
    mediaType: 'movie',
    notes: 'A mind-bending thriller that keeps you guessing until the end.',
    director: 'Christopher Nolan',
    dateAdded: '2023-06-20T12:00:00.000Z',
    addedBy: mockUsers[1],
    sharedWith: [mockUsers[2]],
  },
  {
    id: 'm3',
    title: 'The Shawshank Redemption',
    year: 1994,
    genre: 'Drama',
    rating: 10,
    imageUrl: 'https://via.placeholder.com/300x450?text=Shawshank',
    mediaType: 'movie',
    notes: 'A tale of hope and redemption. One of the greatest films ever made.',
    director: 'Frank Darabont',
    dateAdded: '2023-04-10T12:00:00.000Z',
    addedBy: mockUsers[3],
    sharedWith: [mockUsers[0], mockUsers[2], mockUsers[4]],
  },
];

const mockGameData: GameItem[] = [
  {
    id: 'g1',
    title: 'The Legend of Zelda: Breath of the Wild',
    year: 2017,
    genre: 'Adventure',
    rating: 10,
    imageUrl: 'https://via.placeholder.com/300x450?text=Zelda+BOTW',
    mediaType: 'game',
    notes: 'An open world masterpiece that redefined the Zelda franchise.',
    platform: 'Nintendo Switch',
    dateAdded: '2023-03-15T12:00:00.000Z',
    addedBy: mockUsers[2],
    sharedWith: [mockUsers[4]],
  },
  {
    id: 'g2',
    title: 'Elden Ring',
    year: 2022,
    genre: 'RPG',
    rating: 9,
    imageUrl: 'https://via.placeholder.com/300x450?text=Elden+Ring',
    mediaType: 'game',
    notes: 'A challenging open-world game with incredible world design.',
    platform: 'PlayStation 5',
    dateAdded: '2023-07-05T12:00:00.000Z',
    addedBy: mockUsers[1],
  },
  {
    id: 'g3',
    title: 'Red Dead Redemption 2',
    year: 2018,
    genre: 'Action',
    rating: 10,
    imageUrl: 'https://via.placeholder.com/300x450?text=RDR2',
    mediaType: 'game',
    notes: 'A beautiful and immersive wild west experience with a moving story.',
    platform: 'PC',
    dateAdded: '2023-02-18T12:00:00.000Z',
    addedBy: mockUsers[4],
    sharedWith: [mockUsers[0], mockUsers[3]],
  },
];

// Mock data for books
const mockBookData: BookItem[] = [
  {
    id: 'b1',
    title: 'The Name of the Wind',
    year: 2007,
    genre: 'Fantasy',
    rating: 9,
    imageUrl: 'https://via.placeholder.com/300x450?text=Name+of+Wind',
    mediaType: 'book',
    notes: 'A beautiful fantasy novel with a fascinating magic system.',
    author: 'Patrick Rothfuss',
    pages: 662,
    dateAdded: '2023-04-15T12:00:00.000Z',
    addedBy: mockUsers[2],
    sharedWith: [mockUsers[0]],
  },
  {
    id: 'b2',
    title: 'Dune',
    year: 1965,
    genre: 'Sci-Fi',
    rating: 10,
    imageUrl: 'https://via.placeholder.com/300x450?text=Dune',
    mediaType: 'book',
    notes: 'A masterpiece of science fiction that explores politics, religion, and ecology.',
    author: 'Frank Herbert',
    pages: 412,
    dateAdded: '2023-05-22T12:00:00.000Z',
    addedBy: mockUsers[3],
    sharedWith: [mockUsers[1], mockUsers[4]],
  },
  {
    id: 'b3',
    title: 'Pride and Prejudice',
    year: 1813,
    genre: 'Classic',
    rating: 8,
    imageUrl: 'https://via.placeholder.com/300x450?text=Pride+and+Prejudice',
    mediaType: 'book',
    notes: 'A timeless classic about societal expectations and personal growth.',
    author: 'Jane Austen',
    pages: 279,
    dateAdded: '2023-03-10T12:00:00.000Z',
    addedBy: mockUsers[1],
  },
];

// Mock data for music
const mockMusicData: MusicItem[] = [
  {
    id: 'm1',
    title: 'Dark Side of the Moon',
    year: 1973,
    genre: 'Rock',
    rating: 10,
    imageUrl: 'https://via.placeholder.com/300x450?text=Dark+Side+Moon',
    mediaType: 'music',
    notes: 'One of the greatest albums of all time. Immersive and profound.',
    artist: 'Pink Floyd',
    tracks: 10,
    dateAdded: '2023-02-05T12:00:00.000Z',
    addedBy: mockUsers[4],
    sharedWith: [mockUsers[0], mockUsers[2]],
  },
  {
    id: 'm2',
    title: 'To Pimp a Butterfly',
    year: 2015,
    genre: 'Hip Hop',
    rating: 9,
    imageUrl: 'https://via.placeholder.com/300x450?text=TPAB',
    mediaType: 'music',
    notes: 'A masterpiece exploring race, identity, and society through incredible production and lyricism.',
    artist: 'Kendrick Lamar',
    tracks: 16,
    dateAdded: '2023-06-12T12:00:00.000Z',
    addedBy: mockUsers[1],
    sharedWith: [mockUsers[3]],
  },
  {
    id: 'm3',
    title: 'Kind of Blue',
    year: 1959,
    genre: 'Jazz',
    rating: 10,
    imageUrl: 'https://via.placeholder.com/300x450?text=Kind+of+Blue',
    mediaType: 'music',
    notes: 'The definitive jazz album, featuring an all-star lineup of musicians.',
    artist: 'Miles Davis',
    tracks: 5,
    dateAdded: '2023-04-28T12:00:00.000Z',
    addedBy: mockUsers[0],
  },
];

const MediaListPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  
  // Fix the type detection to properly identify the current page
  // 1. Get the current path from location
  const currentPath = window.location.pathname;
  // 2. Determine the media type based on the path
  const isBooksPage = currentPath.includes('books');
  const isGamesPage = currentPath.includes('games');
  const isMusicPage = currentPath.includes('music');
  const isMoviesPage = !isBooksPage && !isGamesPage && !isMusicPage;
  
  // 3. Set the correct media type and titles
  let mediaType: MediaType = 'movie';
  let title = 'Movies';
  let singularTitle = 'Movie';
  
  if (isGamesPage) {
    mediaType = 'game';
    title = 'Games';
    singularTitle = 'Game';
  } else if (isBooksPage) {
    mediaType = 'book';
    title = 'Books';
    singularTitle = 'Book';
  } else if (isMusicPage) {
    mediaType = 'music';
    title = 'Music';
    singularTitle = 'Album';
  }
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('dateAdded');
  const [filterGenre, setFilterGenre] = useState('all');
  
  // Select the appropriate mock data based on the page
  let mockData: MediaItem[] = mockMovieData;
  if (isGamesPage) {
    mockData = mockGameData;
  } else if (isBooksPage) {
    mockData = mockBookData;
  } else if (isMusicPage) {
    mockData = mockMusicData;
  }
  
  // Get all unique genres from the data
  const genres = ['all', ...Array.from(new Set(mockData.map((item: MediaItem) => item.genre)))];
  
  // Filter and sort the data based on user selections
  const filteredData = mockData
    .filter((item: MediaItem) => 
      (filterGenre === 'all' || item.genre === filterGenre) &&
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a: MediaItem, b: MediaItem) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'year') {
        return b.year - a.year;
      } else if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      } else {
        // Default: dateAdded (newest first)
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
    });
  
  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };
  
  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilterGenre(event.target.value);
  };
  
  const handleAddNew = () => {
    navigate(`/add/${mediaType}`);
  };
  
  const handleEdit = (id: string) => {
    console.log(`Edit item with id: ${id}`);
  };
  
  const handleDelete = (id: string) => {
    console.log(`Delete item with id: ${id}`);
  };
  
  const handleFavorite = (id: string) => {
    console.log(`Toggle favorite for item with id: ${id}`);
  };
  
  return (
    <MainLayout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontFamily: '"Cinzel", serif' }}>
            {title} Collection
          </Typography>
          
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={handleAddNew}
            sx={{ 
              background: `linear-gradient(45deg, ${colors.accent.primary}, ${colors.accent.secondary})`,
              textTransform: 'none',
              borderRadius: 2,
              px: 3,
              '&:hover': {
                background: `linear-gradient(45deg, ${colors.accent.secondary}, ${colors.accent.primary})`,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)'
              }
            }}
          >
            Add New {singularTitle}
          </Button>
        </Box>
        
        <ParchmentContainer>
          <Box sx={{ mb: 4 }}>
            <Stack 
              direction={{ xs: 'column', md: 'row' }} 
              spacing={2} 
              alignItems={{ xs: 'stretch', md: 'center' }}
            >
              <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder={`Search ${title}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    sx: {
                      border: `1px solid ${colors.ui.border}`,
                      background: `${colors.background.main}90`,
                      borderRadius: 1,
                    }
                  }}
                />
              </Box>
              
              <Stack 
                direction="row" 
                spacing={2} 
                sx={{ 
                  width: { xs: '100%', md: '50%' },
                  justifyContent: { xs: 'flex-start', md: 'flex-end' } 
                }}
              >
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel id="filter-label">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <FilterListIcon fontSize="small" />
                      Filter
                    </Box>
                  </InputLabel>
                  <Select
                    labelId="filter-label"
                    value={filterGenre}
                    label="Filter"
                    onChange={handleFilterChange}
                    sx={{
                      border: `1px solid ${colors.ui.border}`,
                      background: `${colors.background.main}90`,
                      minWidth: 120,
                    }}
                  >
                    {genres.map((genre) => (
                      <MenuItem key={genre} value={genre}>
                        {genre === 'all' ? 'All Genres' : genre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel id="sort-label">Sort By</InputLabel>
                  <Select
                    labelId="sort-label"
                    value={sortBy}
                    label="Sort By"
                    onChange={handleSortChange}
                    sx={{
                      border: `1px solid ${colors.ui.border}`,
                      background: `${colors.background.main}90`,
                      minWidth: 120,
                    }}
                  >
                    <MenuItem value="dateAdded">Newest First</MenuItem>
                    <MenuItem value="title">Title</MenuItem>
                    <MenuItem value="year">Year</MenuItem>
                    <MenuItem value="rating">Rating</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </Box>
          
          <ArcaneRule />
          
          <Box sx={{ pt: 2 }}>
            {filteredData.length > 0 ? (
              <Stack 
                direction="row" 
                flexWrap="wrap" 
                spacing={3}
                useFlexGap
              >
                {filteredData.map((item: MediaItem) => (
                  <Box 
                    key={item.id} 
                    sx={{
                      width: {
                        xs: '100%',
                        sm: 'calc(50% - 12px)',
                        md: 'calc(33.333% - 16px)',
                        lg: 'calc(25% - 18px)'
                      }
                    }}
                  >
                    <MediaCard
                      {...item}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onFavorite={handleFavorite}
                    />
                  </Box>
                ))}
              </Stack>
            ) : (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                p: 5,
                textAlign: 'center',
                color: colors.text.secondary,
              }}>
                <Typography variant="h6" sx={{ mb: 2, fontFamily: '"Cinzel", serif' }}>
                  No {title} Found
                </Typography>
                <Typography variant="body2">
                  Try adjusting your search or filters, or add a new entry to your collection.
                </Typography>
              </Box>
            )}
          </Box>
        </ParchmentContainer>
      </Container>
    </MainLayout>
  );
};

export default MediaListPage; 