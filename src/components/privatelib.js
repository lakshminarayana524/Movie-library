import React, { useState, useEffect, useContext } from 'react';
import './styles/private.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from './AuthContext';
import { FaPlusCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Loader from './loader';

const PrivatePlaylist = ({ playlist }) => (
  <div className='playlist-card'>
    <strong>{playlist.playlistname}</strong>
  </div>
);

const Privatelib = () => {
  const [playlists, setPlaylists] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [newPlaylist, setNewPlaylist] = useState(null);
  const { username } = useContext(AuthContext);
  const [load,setload] = useState(false);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchData = async () => {
      setload(true)
      try {
        // const response = await axios.get(`http://localhost:5000/privatelibget/${userId}`);
        const response = await axios.get(`https://movie-library-backend-kxe0.onrender.com/privatelibget/${userId}`);

        setPlaylists(response.data.playlists);
        setload(false)
        console.log(response.data.playlists);
      } catch (error) {
        setload(false)
        console.error('Error fetching playlists:', error);
        // toast.error('Error fetching playlists');
      }
    };

    fetchData();
  }, [userId]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  if(load){
    return <Loader />
  }

  const handleCreatePlaylist = async () => {
    setload(true)
    try {
      // const response = await axios.post('http://localhost:5000/privatelib', {
      const response = await axios.post('https://movie-library-backend-kxe0.onrender.com/privatelib', {

        uid: userId,
        username,
        playlistname: playlistName,
      });

      if (response.data.msg === 'Successfully Playlist Created') {
        toast.success('Successfully Created Playlist',{ autoClose: 3000 });
        console.log('Successfully Created Playlist');
        const newPlaylist = response.data.playlist;
        setPlaylists([...playlists, newPlaylist]);
        setNewPlaylist(newPlaylist);
        setload(false);
      } else {
        toast.error(response.data.msg,{ autoClose: 3000 });
        console.log(response.data.msg);
        setload(false);
      }
    } catch (error) {
      console.error('Error Occurred', error);
      toast.error('Error creating playlist',{ autoClose: 3000 });
      setload(false);
    }

    setShowPopup(false);
    setPlaylistName('');
  };

  const handleRedirect = (playlistName) => {
    navigate(`/private_playlist/${playlistName}`);
  };

  return (
    <div className='play-body'>
      {playlists.length > 0 ? (
        playlists.map((playlist, index) => (
          <div key={index} className='play-o' onClick={() => handleRedirect(playlist.playlistname)}>
            <div className='play-main'>
              <div className="play-lod">
                <div>
                  <p>{playlist.playlistname}</p>
                  <p>Private Playlist</p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='play-content'>
          <div className='play-container'>
            <div className='play-title'>
              <strong>Private Playlist</strong>
            </div>
            <div className='create-icon' onClick={togglePopup}>
              <FaPlusCircle />
            </div>
          </div>
          <div className='playlist-cont'>
            <p>No private playlists found.</p>
          </div>
          {newPlaylist && (
            <div className='play-container'>
              <div className='play-title'>
                <strong>New Playlist: {newPlaylist.playlistname}</strong>
              </div>
            </div>
          )}
        </div>
      )}
      {showPopup && (
        <div className='popup-overlay'>
          <div className='popup-content'>
            <div className='popup-header'>
              <h2>Create New Playlist</h2>
            </div>
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
              <button className='create-button' onClick={handleCreatePlaylist}>Create</button>
              <button className='close-button' onClick={togglePopup}>Close</button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Privatelib;
