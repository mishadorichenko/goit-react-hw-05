import css from './MovieReviews.module.css';
import { getMovieReviews } from '../../tmdb-api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function MovieReviews() {
  const [reviews, setReiews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    async function fetchMovieReviews() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await getMovieReviews(id);
        setReiews(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieReviews();
  }, [id]);

  return (
    <div className={css.container}>
      <Loader isLoading={isLoading} />
      {isError && <ErrorMessage />}

      {reviews.length > 0 ? (
        !isLoading && (
          <ul className={css.rewiewList}>
            {reviews.map(({ id, author, content }) => {
              return (
                <li key={id} className={css.reviewsItem}>
                  <h4 className={css.reviewsAuthor}>Author: {author}</h4>
                  <p>{content}</p>
                </li>
              );
            })}
          </ul>
        )
      ) : (
        <p>We don&#39;t have any reviews for this movie.</p>
      )}
    </div>
  );
}

export default MovieReviews;
