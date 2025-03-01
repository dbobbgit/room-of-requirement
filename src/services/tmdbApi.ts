// TMDB API Service
// Documentation: https://developers.themoviedb.org/3

// Authentication options
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_TOKEN = process.env.REACT_APP_TMDB_API_TOKEN;

// API configuration
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Determine which auth method to use
const useTokenAuth = !!API_TOKEN;

// Create appropriate headers or params based on auth method
const getAuthParams = () => {
  if (useTokenAuth) {
    return {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    };
  }
  return {};
};

const getAuthQueryParams = () => {
  if (!useTokenAuth && API_KEY) {
    return `api_key=${API_KEY}`;
  }
  return '';
};

// Types for TMDB responses
export interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  overview: string;
  vote_average: number;
  genres?: { id: number; name: string }[];
  genre_ids?: number[];
  credits?: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }[];
    crew: {
      id: number;
      name: string;
      job: string;
      department: string;
    }[];
  };
}

export interface TMDBSearchResponse {
  page: number;
  results: TMDBMovie[];
  total_results: number;
  total_pages: number;
}

export interface TMDBMovieDetails extends TMDBMovie {
  runtime: number;
  tagline: string;
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
  }[];
  videos: {
    results: {
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }[];
  };
  images: {
    backdrops: { file_path: string }[];
    posters: { file_path: string }[];
  };
}

// Image sizes for posters
export const posterSizes = {
  small: 'w185',
  medium: 'w342',
  large: 'w500',
  original: 'original',
};

/**
 * Search for movies by title
 * @param query - The movie title to search for
 * @returns The search results
 */
export const searchMovies = async (query: string): Promise<TMDBMovie[]> => {
  try {
    const authQuery = getAuthQueryParams();
    const authParams = getAuthParams();

    const url = `${BASE_URL}/search/movie?${authQuery}&query=${encodeURIComponent(
      query
    )}&include_adult=false`;

    const response = await fetch(url, authParams);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = (await response.json()) as TMDBSearchResponse;
    return data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

/**
 * Get detailed information for a specific movie
 * @param movieId - The TMDB movie ID
 * @returns The movie details
 */
export const getMovieDetails = async (
  movieId: number
): Promise<TMDBMovieDetails> => {
  try {
    const authQuery = getAuthQueryParams();
    const authParams = getAuthParams();

    const url = `${BASE_URL}/movie/${movieId}?${authQuery}&append_to_response=credits,videos,images`;

    const response = await fetch(url, authParams);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return (await response.json()) as TMDBMovieDetails;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

/**
 * Get the full image URL
 * @param path - The image path from the API
 * @param size - The image size to fetch
 * @returns The complete image URL
 */
export const getImageUrl = (
  path: string | null,
  size = posterSizes.medium
): string | null => {
  if (!path) {
    return null;
  }
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

/**
 * Map TMDB movie data to our application format
 * @param movieData - The movie data from TMDB
 * @returns Movie data in our application format
 */
export const mapMovieDataToAppFormat = (movieData: TMDBMovieDetails) => {
  return {
    title: movieData.title,
    year: movieData.release_date
      ? new Date(movieData.release_date).getFullYear()
      : 0,
    imageUrl: getImageUrl(movieData.poster_path),
    genre:
      movieData.genres && movieData.genres.length > 0
        ? movieData.genres[0].name
        : 'Unknown',
    director: getDirectorFromCredits(movieData.credits),
    notes: movieData.overview,
    rating: Math.round(movieData.vote_average), // TMDB uses 0-10 scale, UI displays as 0-5 stars
    tmdbId: movieData.id,
    mediaType: 'movie' as const,
  };
};

/**
 * Extract director name from credits
 * @param credits - The credits object from movie details
 * @returns The director's name
 */
function getDirectorFromCredits(credits?: TMDBMovieDetails['credits']): string {
  if (!credits || !credits.crew) {
    return 'Unknown';
  }

  const director = credits.crew.find(
    (crewMember) => crewMember.job.toLowerCase() === 'director'
  );

  return director ? director.name : 'Unknown';
}
