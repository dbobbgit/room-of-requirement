// RAWG Video Games Database API Service
// Documentation: https://api.rawg.io/docs/

// API authentication
const API_KEY = process.env.REACT_APP_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

// Types for RAWG API responses
export interface RAWGGame {
  id: number;
  name: string;
  slug: string;
  background_image: string | null;
  released: string | null;
  description?: string;
  description_raw?: string;
  metacritic: number | null;
  rating: number;
  genres: { id: number; name: string; slug: string }[];
  platforms: {
    platform: {
      id: number;
      name: string;
      slug: string;
    };
  }[];
  developers?: {
    id: number;
    name: string;
    slug: string;
  }[];
  publishers?: {
    id: number;
    name: string;
    slug: string;
  }[];
  esrb_rating?: {
    id: number;
    name: string;
    slug: string;
  } | null;
}

export interface RAWGSearchResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RAWGGame[];
}

/**
 * Search for games by title
 * @param query - The game title to search for
 * @returns The search results
 */
export const searchGames = async (query: string): Promise<RAWGGame[]> => {
  try {
    if (!API_KEY) {
      throw new Error('RAWG API key is not configured');
    }

    const response = await fetch(
      `${BASE_URL}/games?key=${API_KEY}&search=${encodeURIComponent(
        query
      )}&page_size=10`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = (await response.json()) as RAWGSearchResponse;
    return data.results;
  } catch (error) {
    console.error('Error searching games:', error);
    throw error;
  }
};

/**
 * Get detailed information for a specific game
 * @param gameId - The RAWG game ID
 * @returns The game details
 */
export const getGameDetails = async (gameId: number): Promise<RAWGGame> => {
  try {
    if (!API_KEY) {
      throw new Error('RAWG API key is not configured');
    }

    const response = await fetch(`${BASE_URL}/games/${gameId}?key=${API_KEY}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return (await response.json()) as RAWGGame;
  } catch (error) {
    console.error('Error fetching game details:', error);
    throw error;
  }
};

/**
 * Map RAWG game data to our application format
 * @param gameData - The game data from RAWG
 * @returns Game data in our application format
 */
export const mapGameDataToAppFormat = (gameData: RAWGGame) => {
  // Get the primary platform
  const platform =
    gameData.platforms && gameData.platforms.length > 0
      ? gameData.platforms[0].platform.name
      : 'Unknown';

  // Get the primary genre
  const genre =
    gameData.genres && gameData.genres.length > 0
      ? gameData.genres[0].name
      : 'Unknown';

  return {
    title: gameData.name,
    year: gameData.released ? new Date(gameData.released).getFullYear() : 0,
    imageUrl: gameData.background_image,
    genre: genre,
    platform: platform,
    notes: gameData.description_raw || '',
    rating: gameData.metacritic || Math.round(gameData.rating * 2), // Store as 0-10 scale, UI displays as 0-5 stars
    rawgId: gameData.id,
    mediaType: 'game' as const,
  };
};
