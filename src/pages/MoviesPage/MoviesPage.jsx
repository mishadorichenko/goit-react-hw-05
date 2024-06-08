import css from './MoviesPage.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';
import toast, { Toaster } from 'react-hot-toast';

import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { searchMovie } from '../../tmdb-api';

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchedMovie = searchParams.get('query') ?? '';

  useEffect(() => {
    if (searchedMovie === '') {
      setMovies([]);
      return;
    }
    async function fetchMovie() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await searchMovie(searchedMovie);
        setMovies(data.results);
        if (data.results.length === 0) {
          //   searchParams.delete('query');
          toast('No movies found. Try change name of movie.', {
            duration: 10000,
            style: {
              border: '2px solid #646cff',
              width: '300px',
            },
          });
        }
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovie();
  }, [searchedMovie]);

  const changeQueryValue = newQuery => {
    if (newQuery) {
      searchParams.set('query', newQuery);
    } else {
      searchParams.delete('query');
    }
    setSearchParams(searchParams);
  };

  return (
    <>
      <Toaster position="top-left" />
      <SearchBar onSearch={changeQueryValue} />
      <div className={css.moviesList}>
        <Loader isLoading={isLoading} />
        {isError && <ErrorMessage />}
        {movies.length > 0 && <MovieList movies={movies} />}
      </div>
    </>
  );
}

export default MoviesPage;
