import css from './MovieCast.module.css';
import { getMovieCast } from '../../tmdb-api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function MovieCast() {
  const [actors, setActors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();

  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  useEffect(() => {
    if (!id) return;
    async function fetchMovieCast() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await getMovieCast(id);
        setActors(data.cast);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieCast();
  }, [id]);

  return (
    <div className={css.container}>
      <Loader isLoading={isLoading} />
      {isError && <ErrorMessage />}

      {actors.length > 0 && !isLoading && (
        <ul className={css.actorsList}>
          {actors.map(({ id, profile_path, name, character }) => {
            return (
              <li key={id} className={css.actorItem}>
                <img
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                      : defaultImg
                  }
                  width={170}
                  alt={name}
                />
                <h3>{name}</h3>
                <p>Character: {character}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default MovieCast;
