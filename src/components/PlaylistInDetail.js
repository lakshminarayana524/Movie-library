import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams to get route parameters
import './styles/playlistindetail.css'; // Import the same CSS file used for MovieAPI component
import Loader from './loader';

const PlaylistInDetail = () => {
   const { playlistname } = useParams(); // Get the playlist name from the route parameters
    const [playlist, setPlaylist] = useState(null);
    const [load,setload]=useState(false);
    axios.defaults.withCredentials = true;

    useEffect(() => {
        setload(true);
        // axios.get(`http://localhost:5000/publiclistgetall/${playlistname}`) // Fetch the playlist details using the name
        axios.get(`https://movie-library-backend-kxe0.onrender.com/publiclistgetall/${playlistname}`) // Fetch the playlist details using the name

            .then((res) => {
                if (res.data.success) {
                    setPlaylist(res.data.playlist);
                    console.log("Playlist data fetched");
                    setload(false);
                }
            })
            .catch((error) => {
                console.error('Error fetching playlist details:', error);
                setload(false);
            });
    }, [playlistname]);

    const handleBack = () => {
        window.history.back();
    }; 

    if(load){
        return <Loader/>
    }

    return (
        <div className="playlists-container">
            
            <h2 className="playlists-title">{playlistname}</h2>
            <button className='back-button' onClick={handleBack}>
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
};

export default PlaylistInDetail;
