import css from './MovieDetailsPage.module.css';
import { getMovieDetails } from '../../tmdb-api';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import BackLink from '../../components/BackLink/BackLink';

function MovieDetailsPage() {
  const [movieDetails, setMoviesDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const { id } = useParams();

  const backLinkHref = useRef(location.state ?? '/movies');
  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  useEffect(() => {
    if (!id) return;
    async function fetchMovieDetails() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await getMovieDetails(id);
        setMoviesDetails(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieDetails();
  }, [id]);

  return (
    <div className={css.container}>
      <Loader isLoading={isLoading} />
      {isError && <ErrorMessage />}

      {movieDetails && !isLoading && (
        <>
          <BackLink to={backLinkHref.current}>Go back</BackLink>
          <div className={css.mainInf}>
            <img
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                  : defaultImg
              }
              width={250}
              alt={movieDetails.title}
            />
            <ul>
              <li>
                <h2>
                  {movieDetails.original_title} (
                  {movieDetails.release_date.substring(0, 4)})
                </h2>
              </li>
              <li>User Score: {Math.round(movieDetails.vote_average * 10)}%</li>
              <li className={css.caption}>Overview</li>
              <li>{movieDetails.overview}</li>
              <li className={css.caption}>Genres</li>
              <li>{movieDetails.genres.map(genre => genre.name + ' ')}</li>
            </ul>
          </div>
          <div className={css.additionalInf}>
            <p>Additional Information</p>
            <ul>
              <li>
                <Link to={'cast'}>Cast</Link>
              </li>
              <li>
                <Link to={'reviews'}>Reviews</Link>
              </li>
            </ul>
          </div>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </>
      )}
    </div>
  );
}

export default MovieDetailsPage;
