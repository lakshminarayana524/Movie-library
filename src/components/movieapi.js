import React, { useEffect, useState } from 'react';
import './styles/moviesapi.css';
import { useNavigate } from 'react-router-dom';
import Loader from './loader';
import List from './publiclib';
import PLib from './privatelib';
import { FaPlus } from 'react-icons/fa'; // Importing the plus icon from react-icons
import axios from 'axios'; // Importing axios for HTTP requests
import AddPlaylist from './addplaylist'; // Import the AddPlaylist component
import { ToastContainer } from 'react-toastify';

const url = "https://www.omdbapi.com/?apikey=f5b16502&s=";

const MovieAPI = ({ search }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // State to store the selected movie
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [showAddPlaylistModal, setShowAddPlaylistModal] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoad(true);
        const res = await fetch(`${url}${search}`);
        const data = await res.json();
        if (data.Search) {
          setMovies(data.Search);
          setLoad(false);
        } else {
          setMovies([]);
          setLoad(false);
        }
      } catch (e) {
        console.log('error fetching movies:', e);
        setMovies([]);
        setLoad(false);
      }
    };
    fetchMovies();
  }, [search]);

  // Function to handle the selection of a movie
  const handleMovieSelection = (movie) => {
    setSelectedMovie(movie);
    setShowAddPlaylistModal(true); // Show the AddPlaylist modal after selecting a movie
  };

  const closeAddPlaylistModal = () => {
    setShowAddPlaylistModal(false);
    setSelectedMovie(null);
  };

  if (load) {
    return (
      <div className="loaddd">
        <Loader />
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies && movies.length > 0 ? (
        movies.map((movie, index) => (
          <div key={index} className="movie-card" >
            <div className="movie-cover">
              <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
            </div>
            <div className="movie-book">
              <h3 className='movie-title'>{movie.Title}</h3>
              <p className='movie-year'><strong>Year:</strong> {movie.Year}</p>
              <p className='movie-type'><strong>Type:</strong> {movie.Type}</p>
              <p className='movie-a' onClick={() => navigate(`/movie/${movie.Title}`)}><span className='a'>View in detail</span></p>
              <div className="add-to-playlist-container">
                <button className="add-to-playlist-button" onClick={() => handleMovieSelection(movie)}>
                  <FaPlus /> {/* Plus icon */}
                  Add to Playlist
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='movie-alt'>
        {search ? <p>No Movies Found</p> : ''}
        <div className='play-public'>
        <List/>
        </div>
        <div className='play-private'> 
        <PLib/>
        </div>
        </div>

      )}
      {/* Add Playlist Modal */}
      {showAddPlaylistModal && (
        <div className="playlist-modal">
          <div className="playlist-modal-content">
            <AddPlaylist selectedMovie={selectedMovie} onClose={closeAddPlaylistModal} />
          </div>
        </div>
      )}
      {/* <ToastContainer/> */}
    </div>
  );
};

export default MovieAPI;
