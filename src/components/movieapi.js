import React, { useEffect, useState } from 'react';
import './styles/moviesapi.css';
import { useNavigate } from 'react-router-dom';
import Loader from './loader';

const url = "https://www.omdbapi.com/?apikey=f5b16502&s=";

const MovieAPI = ({ search }) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [load,setload]=useState(false)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setload(true)
        const res = await fetch(`${url}${search}`);
        const data = await res.json();
        if (data.Search) {
          setMovies(data.Search);
          setload(false);
        } else {
          setMovies([]);
          setload(false);
        }
      } catch (e) {
        console.log('error fecthing movies:', e);
        setMovies([]);
        setload(false);

      }
    };
    fetchMovies();
  }, [search]);

  const handleClick = (title)=>{
        navigate(`/movie/${title}`)
  }

  if(load){
    return (
    <div className="loaddd">
        <Loader />
    </div>)
  }

  return (
    <div className="movie-grid">
      {movies && movies.length > 0 ? (
        movies.map((movie, index) => (
          <div key={index} className="movie-card" onClick={()=>handleClick(movie.Title)}>
            <div className="movie-cover">
              <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
            </div>
            <div className="movie-book">
              <h3 className='movie-title'>{movie.Title}</h3>
              <p className='movie-year'><strong>Year:</strong> {movie.Year}</p>
              <p className='movie-type'><strong>Type:</strong> {movie.Type}</p>
              <p className='movie-a'><a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noopener noreferrer">View on IMDB</a></p>
            </div>
          </div>
        ))
      ) : (
       <p>No Movie Found</p>
      )}
    </div>
  );
};

export default MovieAPI;
