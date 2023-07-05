import useFetchEvents from 'hooks/useFetchEvents';
import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import {
  getMovieById,
  getMovieByName,
  getMovieDetails,
} from 'services/movieApi';
import NoImage from '../image/NoImage.svg.png';
const MoviDetailsPages = () => {
  const [movies, setMovies] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    getMovieById(id).then(setMovies);
  }, [id]);
  const { title, poster_path, name, overview, vote_average, genres } = movies;
  return (
    <>
      <button>Go back</button>
      {title && <h2>{title}</h2>}{' '}
      {vote_average && <p>User Score: {vote_average}</p>}
      {overview && (
        <>
          <h3>Overview</h3>
          <p>{overview}</p>
        </>
      )}
      {genres && (
        <>
          <h3>Genres</h3>
          {genres?.map(({ id, name }) => {
            return <p key={id}>{name}</p>;
          })}
        </>
      )}
      {name && <h3>{name}</h3>}
      {poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          width={`200`}
          alt="preview"
        />
      ) : (
        <img src={NoImage} alt="No Image Available" />
      )}
      <div>
        <hr />
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to={'cast'}>Cast</Link>
          </li>
          <li>
            <Link to={'reviews'}>Reviews</Link>
          </li>
        </ul>
        <hr />
      </div>
      <Outlet />
    </>
  );
};

export default MoviDetailsPages;
