import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Loader from './loader';

const Privateindetails = () => {
    const { playlistname } = useParams(); // Get the playlist name from the route parameters
    const [playlist, setPlaylist] = useState(null);
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();
    
    axios.defaults.withCredentials = true;

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/login'); // Redirect to login if user is not logged in
        }
    }, [navigate]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setLoad(true);
            // axios.get(`http://localhost:5000/privategetall/${playlistname}`, { params: { uid: userId } })
            axios.get(`https://movie-library-backend-kxe0.onrender.com/privategetall/${playlistname}`, { params: { uid: userId } })

                .then((res) => {
                    if (res.data.success) {
                        setPlaylist(res.data.playlist);
                        console.log("Playlist data fetched");
                    } else {
                        console.error('Error fetching playlist details:', res.data.message);
                    }
                    setLoad(false);
                })
                .catch((error) => {
                    console.error('Error fetching playlist details:', error);
                    setLoad(false);
                });
        }
    }, [playlistname]);

    const handleBack = () => {
        window.history.back();
    };

    if (load) {
        return <Loader />;
    }

    return (
        <div className="playlists-container">
            <h2 className="playlists-title">Private Playlist</h2>
            <button className='back-button' onClick={handleBack}>
                <span className="back-arrow">&#8249;</span> Back
            </button>
            <div className="movies-grid">
                {playlist && playlist.Movie.length > 0 ? (
                    playlist.Movie.map((movie, index) => (
                        <div key={index} className="movie-card">
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
                    <p>No movies found in this playlist. Please add movies.</p>
                )}
            </div>
        </div>
    );
}

export default Privateindetails;
