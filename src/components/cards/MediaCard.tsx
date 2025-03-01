import React from 'react';
import { 
  Box, 
  Typography, 
  Rating, 
  Chip,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Avatar,
  Tooltip,
  AvatarGroup
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CategoryBadge, GlowingText } from '../../utils/StyledComponents';
import { colors } from '../../utils/theme';
import { MediaType } from '../forms/MediaEntryForm';

// Interface for user data
export interface User {
  id: string;
  name: string;
  avatar?: string;
  initial: string; // Fallback for avatar
}

interface MediaCardProps {
  id: string;
  title: string;
  year: number;
  genre: string;
  rating: number | null;
  imageUrl?: string;
  mediaType: MediaType;
  notes?: string;
  director?: string; // For movies
  platform?: string; // For games
  author?: string; // For books
  pages?: number; // For books
  artist?: string; // For music
  tracks?: number; // For music
  dateAdded: string;
  addedBy: User; // Primary user who added the item
  sharedWith?: User[]; // Other users who have this item in their collection
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onFavorite?: (id: string) => void;
}

const MediaCard: React.FC<MediaCardProps> = ({
  id,
  title,
  year,
  genre,
  rating,
  imageUrl,
  mediaType,
  notes,
  director,
  platform,
  author,
  pages,
  artist,
  tracks,
  dateAdded,
  addedBy,
  sharedWith = [],
  onEdit,
  onDelete,
  onFavorite
}) => {
  const fallbackImage = {
    movie: 'https://via.placeholder.com/300x450?text=Movie',
    game: 'https://via.placeholder.com/300x450?text=Game',
    book: 'https://via.placeholder.com/300x450?text=Book',
    music: 'https://via.placeholder.com/300x450?text=Music',
  };

  const getMediaTypeColor = () => {
    switch(mediaType) {
      case 'movie': return colors.accent.quaternary;
      case 'game': return colors.accent.secondary;
      case 'book': return colors.accent.tertiary;
      case 'music': return colors.accent.primary;
      default: return colors.accent.primary;
    }
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Combine primary user with shared users for avatar display
  const allUsers = [addedBy, ...sharedWith];

  const renderMediaSpecificDetails = () => {
    switch(mediaType) {
      case 'movie':
        return director ? (
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Director: <span style={{ color: colors.text.primary }}>{director}</span>
          </Typography>
        ) : null;
      case 'game':
        return platform ? (
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Platform: <span style={{ color: colors.text.primary }}>{platform}</span>
          </Typography>
        ) : null;
      case 'book':
        return (
          <>
            {author && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Author: <span style={{ color: colors.text.primary }}>{author}</span>
              </Typography>
            )}
            {pages && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                Pages: <span style={{ color: colors.text.primary }}>{pages}</span>
              </Typography>
            )}
          </>
        );
      case 'music':
        return (
          <>
            {artist && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Artist: <span style={{ color: colors.text.primary }}>{artist}</span>
              </Typography>
            )}
            {tracks && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                Tracks: <span style={{ color: colors.text.primary }}>{tracks}</span>
              </Typography>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card sx={{
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: colors.background.paper,
      backgroundImage: `linear-gradient(135deg, ${colors.background.accent}80 0%, ${colors.background.paper} 100%)`,
      border: `1px solid ${colors.ui.border}`,
      borderRadius: 2,
      overflow: 'hidden',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: `0 10px 20px rgba(0, 0, 0, 0.5), 0 0 15px ${getMediaTypeColor()}30`,
      },
    }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={imageUrl || fallbackImage[mediaType]}
          alt={title}
          sx={{
            objectFit: 'cover',
            borderBottom: `1px solid ${colors.ui.border}`
          }}
        />
        
        <Box sx={{ 
          position: 'absolute', 
          top: 10, 
          left: 10
        }}>
          <CategoryBadge color={getMediaTypeColor()}>
            {getMediaTypeTitle()}
          </CategoryBadge>
        </Box>
        
        <Box sx={{ 
          position: 'absolute', 
          top: 10, 
          right: 10, 
          display: 'flex', 
          gap: 1
        }}>
          {onFavorite && (
            <IconButton 
              onClick={() => onFavorite(id)}
              sx={{
                backgroundColor: `${colors.background.paper}90`,
                backdropFilter: 'blur(2px)',
                color: colors.text.primary,
                '&:hover': {
                  backgroundColor: `${colors.background.accent}90`,
                  color: colors.accent.quaternary,
                }
              }}
            >
              <FavoriteIcon />
            </IconButton>
          )}
        </Box>
        
        <Box sx={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0,
          right: 0,
          padding: 1,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
          backdropFilter: 'blur(2px)',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: colors.text.primary }}>
              {year}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Rating
              value={(rating || 0) / 2}
              readOnly
              max={5}
              size="small"
              sx={{
                '& .MuiRating-icon': {
                  color: colors.text.secondary,
                },
                '& .MuiRating-iconFilled': {
                  color: colors.accent.gold,
                },
              }}
            />
          </Box>
        </Box>
      </Box>
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography 
          variant="h6" 
          component="div"
          sx={{ 
            fontFamily: '"Cinzel", serif',
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: 1.2,
          }}
        >
          <GlowingText color={getMediaTypeColor()}>{title}</GlowingText>
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Chip 
            label={genre} 
            size="small" 
            sx={{ 
              backgroundColor: `${getMediaTypeColor()}20`, 
              color: getMediaTypeColor(),
              borderRadius: '4px',
              fontSize: '0.7rem',
              height: 22,
            }} 
          />
        </Box>

        {renderMediaSpecificDetails()}
        
        {notes && (
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 2, 
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: '0.8rem',
              fontStyle: 'italic',
            }}
          >
            "{notes}"
          </Typography>
        )}
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mt: 'auto', 
          pt: 2,
          borderTop: `1px solid ${colors.ui.divider}`
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ fontSize: '0.7rem', mr: 1 }}
            >
              Added: {formatDate(dateAdded)}
            </Typography>
            
            {/* User avatars */}
            <AvatarGroup 
              max={3}
              sx={{
                '& .MuiAvatar-root': { 
                  width: 24, 
                  height: 24, 
                  fontSize: '0.75rem',
                  border: `1px solid ${colors.ui.border}`,
                  backgroundColor: colors.background.accent,
                },
              }}
            >
              {allUsers.map((user) => (
                <Tooltip key={user.id} title={user.name} arrow>
                  <Avatar 
                    src={user.avatar} 
                    alt={user.name}
                    sx={{ 
                      bgcolor: `${getMediaTypeColor()}90`,
                    }}
                  >
                    {user.initial}
                  </Avatar>
                </Tooltip>
              ))}
            </AvatarGroup>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            {onEdit && (
              <IconButton 
                size="small" 
                onClick={() => onEdit(id)}
                sx={{ color: colors.text.secondary }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
            
            {onDelete && (
              <IconButton 
                size="small" 
                onClick={() => onDelete(id)}
                sx={{ color: colors.text.secondary }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MediaCard; 