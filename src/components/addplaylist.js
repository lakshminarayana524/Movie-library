import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/addPlaylist.css'; // Ensure to create and style this CSS file
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Loader from './loader';

const AddPlaylist = ({ selectedMovie, onClose }) => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [playlistType, setPlaylistType] = useState(''); 
  const [load,setload] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchPlaylists = async () => {
      setload(true);
      try {
        let response;
        if (playlistType === 'public') {
          // response = await axios.get("http://localhost:5000/publiclibget");
        response = await axios.get("https://movie-library-backend-kxe0.onrender.com/publiclibget");

        } else if (playlistType === 'private') {
          // response = await axios.get("http://localhost:5000/privatelibgets");
          response = await axios.get("https://movie-library-backend-kxe0.onrender.com/privatelibgets");

        }

        if (response.data.msg === 'Successfully fetched') {
          const userId = localStorage.getItem('userId');
          const filteredPlaylists = response.data.playlists.filter(playlist => playlist.uid === userId);
          setPlaylists(filteredPlaylists);
          console.log(`${playlistType.charAt(0).toUpperCase() + playlistType.slice(1)} Playlists fetched:`, filteredPlaylists);
          setload(false);
        }
      } catch (error) {
        console.error(`Error fetching ${playlistType} playlists:`, error);
        setload(false);
      }
    };

    if (playlistType) {
      fetchPlaylists();
    }
  }, [playlistType]);

  const handlePlaylistTypeSelect = (type) => {
    setPlaylistType(type);
  };

  const handlePlaylistSelect = (event) => {
    setSelectedPlaylist(event.target.value);
  };

  if(load){
    return <Loader />
  }

  const handleAddToPlaylist = async () => {
    setload(true)
    try {
      // Check if user is logged in
      const userId = localStorage.getItem('userId');
      if (!userId) {
        // If not logged in, redirect to login page
        navigate('/login');
        setload(false);
        return;
      }

      // If logged in, continue with adding to playlist logic
      const payload = {
        movie: selectedMovie,
        playlistname: selectedPlaylist,
        uid: userId
      };

      let addToPlaylistRes;
      if (playlistType === 'private') {
        addToPlaylistRes = await axios.post("https://movie-library-backend-kxe0.onrender.com/add-private", payload);
      } else {
        addToPlaylistRes = await axios.post("https://movie-library-backend-kxe0.onrender.com/add-playlist", payload);
      }

      if (addToPlaylistRes.data.success) {
        console.log(`Added ${selectedMovie.Title} to ${playlistType} playlist successfully`);
        toast.success("Movie added to playlist successfully");
        setload(false);
        onClose();
      } else {
        setload(false)
        console.log('Failed to add movie to playlist:', addToPlaylistRes.data.msg);
        toast.error("Failed to add movie to playlist");
      }
    } catch (error) {
      setload(false);
      console.error('Error adding movie to playlist:', error);
      toast.error("Server Error: Failed to add movie to playlist");
    }
  };

  return (
    <div className="add-playlist-container">
      <h2>{playlistType ? `Add Movie to ${playlistType === 'public' ? '' : 'Private '}Playlist` : 'Add Movie to Playlist'}</h2>
      <div className="add-movie-details">
        <img src={selectedMovie.Poster} alt={selectedMovie.Title} className="add-movie-poster" />
        <div className="add-movie-info">
          <h3>{selectedMovie.Title}</h3>
          <p><strong>Year:</strong> {selectedMovie.Year}</p>
          <p><strong>Type:</strong> {selectedMovie.Type}</p>
        </div>
      </div>
      {!playlistType ? (
        <div>
          <h3>Select Playlist Type:</h3>
          <button onClick={() => handlePlaylistTypeSelect('public')} className="select-button">Public</button>
          <button onClick={() => handlePlaylistTypeSelect('private')} className="select-button">Private</button>
          <button onClick={onClose} className="cancel-button-before">Cancel</button>
        </div>
      ) : (
        <div>
          {playlistType === 'public' ? (
            <>
              <h3>Select Public Playlist:</h3>
              <select
                value={selectedPlaylist}
                onChange={handlePlaylistSelect}
                className="playlist-select"
              >
                <option value="">Select a playlist</option>
                {playlists.map((playlist, index) => (
                  <option key={index} value={playlist.playlistname}>
                    {playlist.playlistname}
                  </option>
                ))}
              </select>
              <div className="button-group">
                <button
                  onClick={handleAddToPlaylist}
                  className="add-button"
                  disabled={!selectedPlaylist}
                >
                  Add to Playlist
                </button>
                <button onClick={onClose} className="cancel-button">Cancel</button>
              </div>
            </>
          ) : (
            <>
              <h3>Select Private Playlist:</h3>
              <select
                value={selectedPlaylist}
                onChange={handlePlaylistSelect}
                className="playlist-select"
              >
                <option value="">Select a playlist</option>
                {playlists.map((playlist, index) => (
                  <option key={index} value={playlist.playlistname}>
                    {playlist.playlistname}
                  </option>
                ))}
              </select>
              <div className="button-group">
                <button
                  onClick={handleAddToPlaylist}
                  className="add-button"
                  disabled={!selectedPlaylist}
                >
                  Add to Playlist
                </button>
                <button onClick={onClose} className="cancel-button">Cancel</button>
              </div>
            </>
          )}
        </div>
      )}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default AddPlaylist;
