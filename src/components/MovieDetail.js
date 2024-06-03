import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './loader'; // Corrected import path
import './styles/moviedetails.css'; // Import the CSS file
import AddPlaylist from './addplaylist';

const url = 'https://www.omdbapi.com/?apikey=f5b16502&t=';

const MovieDetail = () => {
    const { title } = useParams();
    const [moviedetails, setmoviedetails] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showAddPlaylistModal, setShowAddPlaylistModal] = useState(false);
    const [load,setload]=useState(false);

    useEffect(() => {
        const fetchmoviedetails = async () => {
            setload(true);
            try {
                const res = await fetch(`${url}${title}`);
                const data = await res.json();
                if (data.Response === 'True') {
                    setmoviedetails(data);
                    setload(false)
                } else {
                    console.log("Movie details not found");
                    toast.error("Movie details not found");
                    setload(false);
                }
            } catch (e) {
                console.log("Error while fetching");
                toast.error("Something went wrong unable to fetch");
                setload(false);
            }
        };
        fetchmoviedetails();
    }, [title]);

    const handleMovieSelection = (movie) => {
        setSelectedMovie(movie);
        setShowAddPlaylistModal(true); // Show the AddPlaylist modal after selecting a movie
    };

    const closeAddPlaylistModal = () => {
        setShowAddPlaylistModal(false);
        setSelectedMovie(null);
    };

    const handleBack = () => {
        window.history.back();
    };

    if (!moviedetails) {
        return <Loader />; 
    }

    if(load){
        return <Loader />
    }

    return (
        <div className='movie-cont'>
            <button className='back-button' onClick={handleBack}>
                <span className="back-arrow">&#8249;</span> Back
            </button>
            <div className='movie-details'>
                <div className='movie-content'>
                    <div className='movie-container'>
                        <div className='movie-top'>
                            <div className='movie-yy'>
                                <div><strong>Year</strong> </div>
                                <p className='movie-year'>{moviedetails.Year}</p>
                            </div>
                            <div className='movie-rating'>
                                <div><strong>IMDb Rating</strong> </div>
                                <p className='movie-rate'>{moviedetails.imdbRating}/10</p>
                                <p className='movie-votes'>{moviedetails.imdbVotes} votes</p>
                                <div ></div>
                            </div>
                        </div>
                        <div className='movie-details-body'>
                            <div className='movie-image'>
                                <img src={moviedetails.Poster} alt={moviedetails.Title} />
                            </div>
                            <div className='movie-details-text'>
                                <div className='movie-title'>
                                    {moviedetails.Title}
                                </div>
                                <div className='movie-actress'>
                                    <strong>Actors:</strong> {moviedetails.Actors}
                                </div>
                                <div className='movie-plot'>
                                    <strong>Plot:</strong> {moviedetails.Plot}
                                </div>
                                <div className='movie-add'>
                                    <button className='movie-add-btn'  onClick={() => handleMovieSelection(moviedetails)}>Add to list</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
            {showAddPlaylistModal && (
        <div className="playlist-modal">
          <div className="playlist-modal-content">
            <AddPlaylist selectedMovie={selectedMovie} onClose={closeAddPlaylistModal} />
          </div>
        </div>
      )}
        </div>
    );
};

export default MovieDetail;
