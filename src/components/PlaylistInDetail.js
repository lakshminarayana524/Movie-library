import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './styles/playlistindetail.css'; // Import the same CSS file used for MovieAPI component
import Loader from './loader';
import { ToastContainer, toast } from 'react-toastify';

const PlaylistInDetail = () => {
  const { playlistname } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    setLoad(true);
    // axios.get(`http://localhost:5000/publiclistgetall/${playlistname}`)
     axios.post(`https://movie-library-backend-kxe0.onrender.com/publiclistgetall/${playlistname}`)
      .then((res) => {
        if (res.data.success) {
          setPlaylist(res.data.playlist);
          console.log("Playlist data fetched");
        }
        setLoad(false);
      })
      .catch((error) => {
        console.error('Error fetching playlist details:', error);
        setLoad(false);
      });
  }, [playlistname]);

  const handleBack = () => {
    window.history.back();
  };

  const handleCopy = () => {
    const playlistLink = `https://movie-library-gln.vercel.app/public_playlist/${playlistname}`;
    navigator.clipboard.writeText(playlistLink)
      .then(() => {
        console.log('Playlist link copied to clipboard');
        toast.success("link copied!")
        // Optionally display a success message to the user
      })
      .catch((err) => {
        console.error('Failed to copy playlist link:', err);
      });
  };

  if (load) {
    return <Loader />;
  }

  return (
    <div className="playlists-container">
      <h2 className="playlists-title">
        {playlistname}
        <button className="copy-button" onClick={handleCopy}>
          <span className="copy-icon"></span> Copy Link
        </button>
      </h2>
      <button className="back-button" onClick={handleBack}>
        <span className="back-arrow">&#8249;</span> Back
      </button>
      <div className="movies-grid">
                {playlist ? (
                    playlist.Movie.map((movie, index) => ( /* Map through movies in the playlist */
                        <div key={index} className="movie-card" >       
                            <div className="movie-cover">
                                <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
                            </div>
                            <div className="movie-book">
                                <h3 className='movie-title'>{movie.Title}</h3>
                                <p className='movie-year'><strong>Year:</strong> {movie.Year}</p>
                                <p className='movie-type'><strong>Type:</strong> {movie.Type}</p>
                                <p className='movie-a' onClick={() => navigate(`/movie/${movie.Title}`)}><span className='a'>View in detail</span></p>

                                {localStorage.getItem('userId') === playlist.uid && <p className='created-by-you'>Created by You</p>}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>please add movies
                    </p> 
                )}
            </div>
            <ToastContainer/>
        </div>
    );
};

export default PlaylistInDetail;
