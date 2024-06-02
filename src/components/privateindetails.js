// Privateindetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const Privateindetails = () => {
    const { playlistname } = useParams(); // Get the playlist name from the route parameters
    const [playlist, setPlaylist] = useState(null);
    const uid=localStorage.getItem('userid')
    useEffect(() => {
        axios.get(`https://movie-library-backend-kxe0.onrender.com/privategetall/${playlistname}`,{uid}) // Fetch the playlist details using the name
            .then((res) => {
                if (res.data.success) {
                    setPlaylist(res.data.playlist);
                    console.log("Playlist data fetched");
                }
            })
            .catch((error) => {
                console.error('Error fetching playlist details:', error);
            });
    }, [playlistname]);

    const handleBack = () => {
        window.history.back();
    }; 

    return (
        <div className="playlists-container">
            <h2 className="playlists-title">Private Playlist</h2>
            <button className='back-button' onClick={handleBack}>
                <span className="back-arrow">&#8249;</span> Back
            </button>
            <div className="movies-grid">
                {playlist ? (
                    playlist.Movie.map((movie, index) => (
                        <div key={index} className="movie-card" >       
                            <div className="movie-cover">
                                <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
                            </div>
                            <div className="movie-book">
                                <h3 className='movie-title'>{movie.Title}</h3>
                                <p className='movie-year'><strong>Year:</strong> {movie.Year}</p>
                                <p className='movie-type'><strong>Type:</strong> {movie.Type}</p>
                                {localStorage.getItem('userId') === playlist.uid && <p className='created-by-you'>Created by You</p>}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p> 
                )}
            </div>
        </div>
    );
}

export default Privateindetails;
