// TMDB API Service
// Documentation: https://developers.themoviedb.org/3

// Replace with your actual API key or use environment variable
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Image sizes for posters
export const posterSizes = {
  small: 'w185',
  medium: 'w342',
  large: 'w500',
  original: 'original',
};

/**
 * Search for movies by title
 * @param {string} query - The movie title to search for
 * @returns {Promise} - The search results
 */
export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}&include_adult=false`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

/**
 * Get detailed information for a specific movie
 * @param {number} movieId - The TMDB movie ID
 * @returns {Promise} - The movie details
 */
export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos,images`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

/**
 * Get the full image URL
 * @param {string} path - The image path from the API
 * @param {string} size - The image size to fetch
 * @returns {string} - The complete image URL
 */
export const getImageUrl = (path, size = posterSizes.medium) => {
  if (!path) {
    return null;
  }
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

/**
 * Map TMDB movie data to our application format
 * @param {Object} movieData - The movie data from TMDB
 * @returns {Object} - Movie data in our application format
 */
export const mapMovieDataToAppFormat = (movieData) => {
  return {
    title: movieData.title,
    year: new Date(movieData.release_date).getFullYear(),
    imageUrl: getImageUrl(movieData.poster_path),
    genre: movieData.genres?.[0]?.name || 'Unknown',
    director: getDirectorFromCredits(movieData.credits),
    notes: movieData.overview,
    rating: Math.round(movieData.vote_average),
    tmdbId: movieData.id,
    mediaType: 'movie',
  };
};

/**
 * Extract director name from credits
 * @param {Object} credits - The credits object from movie details
 * @returns {string} - The director's name
 */
function getDirectorFromCredits(credits) {
  if (!credits || !credits.crew) {
    return 'Unknown';
  }

  const director = credits.crew.find(
    (crewMember) => crewMember.job.toLowerCase() === 'director'
  );

  return director ? director.name : 'Unknown';
}
