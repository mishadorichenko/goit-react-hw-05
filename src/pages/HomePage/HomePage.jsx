import css from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../tmdb-api';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await getTrendingMovies();
        setMovies(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTrendingMovies();
  }, []);

  return (
    <div className={css.moviesList}>
      <h2>Trending today</h2>
      <Loader isLoading={isLoading} />
      {isError && <ErrorMessage />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

export default HomePage;
