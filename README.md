# Room of Requirement - Media Collection App

A stylish, personal media collection app with a magical theme, inspired by cyberpunk, dark academia, and Hogwarts aesthetics.

## Features

- Catalog your Movies, Games, Books, and Music in one place
- Search external APIs to automatically fill in details
- Beautiful UI with responsive design
- Share items with family members

## API Integration

This app integrates with several free APIs to fetch media data:

### Currently Implemented:

- **The Movie Database (TMDB)** - For movie data including posters, directors, and descriptions
- **RAWG Video Games Database** - For game data including cover art, platforms, and ratings

### Coming Soon:

- **Google Books API** - For book data
- **Last.fm API** - For music data

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory using the `.env.example` as a template
4. Sign up for API keys:
   - TMDB API: https://www.themoviedb.org/signup
   - RAWG API: https://rawg.io/apidocs
   - Last.fm API: https://www.last.fm/api/account/create
5. Add your API keys to the `.env` file:
   ```
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
   REACT_APP_RAWG_API_KEY=your_rawg_api_key_here
   ```
6. Start the development server:
   ```
   npm start
   ```

## Using the App

### Adding Movies

1. Navigate to Movies and click "Add New Movie"
2. Use the TMDB search to find your movie
3. Review and edit the auto-filled details
4. Click "Add to Collection"

### Adding Games

1. Navigate to Games and click "Add New Game"
2. Use the RAWG search to find your game
3. Review and edit the auto-filled details
4. Click "Add to Collection"

### Adding Other Media

1. Navigate to the desired category (Books, Music)
2. Click "Add New"
3. Fill in the details manually or use the appropriate API search (coming soon)
4. Click "Add to Collection"

## Notes for Developers

### Environment Variables

- The app uses environment variables like `REACT_APP_TMDB_API_KEY` and `REACT_APP_RAWG_API_KEY` to access APIs
- Never commit your `.env` file with actual API keys to version control
- In production, set these variables in your hosting environment

### API Services

- API service files are in `src/services/`
- Each API has its own TypeScript file with interfaces and helper functions
- API responses are mapped to a common format for the app

### Git Branch Naming

This project uses `main` as the default branch name instead of `master` to align with GitHub's current standards and to use more inclusive language.

## License

MIT
