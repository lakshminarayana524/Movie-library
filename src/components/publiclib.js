import React, { useState, useEffect, useContext } from 'react';
import './styles/list.css';
import { FaPlusCircle } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from './AuthContext';

const PublicPlaylist = ({ playlist }) => (
  <div className='playlist-card'>
    <strong>{playlist.Name}</strong>
  </div>
);

const List = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const { username } = useContext(AuthContext);
  const userId = localStorage.getItem("userId");
  axios.defaults.withCredentials = true;

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleCreatePlaylist = () => {
    setLoading(true);
    if (!playlistName.trim()) {
      toast.error("Playlist name cannot be empty");
      setLoading(false);
      return;
    }

    // axios.post('http://localhost:5000/publiclib', { uid:userId, username, playlistname: playlistName })
    axios.post('https://movie-library-backend-kxe0.onrender.com/publiclib', { uid:userId, username, playlistname: playlistName })
      .then((res) => {
        if (res.data.msg === 'Successfully Playlist Created') {
          toast.success("Successfully Created Playlist");
          console.log('Successfully Created Playlist');
          setPlaylists([...playlists, res.data.playlist]);
          setNewPlaylistName(res.data.playlist.Name);
        } else {
          toast.error(res.data.msg);
          console.log(res.data.msg);
        }
        setLoading(false);
      })
      .catch(e => {
        console.log('Error Occurred', e);
        toast.error("Error occurred while creating playlist");
        setLoading(false);
      });

    setShowPopup(false);
    setPlaylistName('');
  };

  return (
    <div className='pub-body'>
      <div className='pub-content'>
        <div className='pub-container'>
          <div className='pub-title'>
            <strong>Public Playlist</strong>
          </div>
          <div className='create-icon' onClick={togglePopup}>
            <FaPlusCircle />
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : playlists.length > 0 ? (
          <div className='playlist-container'>
            {playlists.map((playlist, index) => (
              <PublicPlaylist key={index} playlist={playlist} />
            ))}
          </div>
        ) : (
          <p>Please create a playlist.</p>
        )}
      </div>
      {newPlaylistName && (
        <div className='pub-container'>
          <div className='pub-title'>
            <strong>New Playlist: {newPlaylistName}</strong>
          </div>
        </div>
      )}
      {showPopup && (
        <div className='popup-overlay'>
          <div className='popup-content'>
            <div className='popup-header'>
              <h2>Create New Playlist</h2>
            </div>
            {userId ? (
              <>
                <div>
                  <input
                    type='text'
                    className='input-playlist'
                    placeholder='Playlist Name'
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                  />
                </div>
                <div className='buttons'>
                  <button className="create-button" onClick={handleCreatePlaylist}>Create</button>
                  <button className='close-button' onClick={togglePopup}>Close</button>
                </div>
              </>
            ) : (
              <div>
                Please Login to create playlist
                <button className='close-button' onClick={togglePopup}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default List;
